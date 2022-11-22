import { db } from '@/firebase/services'
import type { IQuote } from '@/models'
import { getRandomInt } from '@/utils/helpers'
import type { Dayjs } from 'dayjs'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

interface CreateQuoteDto {
  text: string
  author: string
  genres: string[]
}

export interface IGetQuotesFitlerObj {
  search: string
  author: string | undefined
  genre: string | undefined
  dateTimeRange: [Dayjs, Dayjs] | null
  sort: 'created-at:desc' | 'created-at:asc' | 'updated-at:desc' | 'updated-at:asc' | undefined
}

class QuotesService {
  async createQuote({ author, text, genres }: CreateQuoteDto): Promise<IQuote> {
    const createdDoc = await addDoc(collection(db, 'quotes'), {
      author,
      text,
      genres,
      isShownInRandom: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const doc = await getDoc(createdDoc)

    return { id: doc.id, ...(doc.data() as any) }
  }

  async getQuotes({ search, author, genre, sort, dateTimeRange }: IGetQuotesFitlerObj) {
    const queries: any[] = []

    if (search) {
      queries.push(where('text', '==', search))
    }

    if (dateTimeRange) {
      queries.push(where('createdAt', '>=', dateTimeRange[0].toDate()))
      queries.push(where('createdAt', '<=', dateTimeRange[1].toDate()))
    }

    if (author) {
      queries.push(where('author', '==', author))
    }

    if (genre) {
      queries.push(where('genres', 'array-contains', genre))
    }

    if (sort) {
      switch (sort) {
        case 'created-at:asc': {
          queries.push(orderBy('createdAt', 'asc'))
          break
        }
        case 'created-at:desc': {
          queries.push(orderBy('createdAt', 'desc'))
          break
        }
        case 'updated-at:asc': {
          queries.push(orderBy('updatedAt', 'asc'))
          break
        }
        case 'updated-at:desc': {
          queries.push(orderBy('updatedAt', 'desc'))
          break
        }
      }
    }

    const docs = await getDocs(query(collection(db, 'quotes'), ...queries))

    const quotes: IQuote[] = []

    docs.forEach((doc) => {
      quotes.push({ ...(doc.data() as any), id: doc.id })
    })

    return quotes
  }

  async deleteQuote(quoteId: string) {
    await deleteDoc(doc(db, 'quotes', quoteId))
  }

  async editQuote({
    newValues,
    quoteId,
  }: {
    quoteId: string
    newValues: { text: string; author: string; genres: string[] }
  }): Promise<IQuote> {
    await updateDoc(doc(db, 'quotes', quoteId), {
      text: newValues.text,
      author: newValues.author,
      genres: newValues.genres,
      updatedAt: new Date(),
    })

    return (await this.getQuoteById(quoteId))!
  }

  async getQuoteById(quoteId: string): Promise<IQuote | null> {
    const docRef = await getDoc(doc(db, 'quotes', quoteId))

    if (docRef.exists()) {
      return { id: docRef.id, ...(docRef.data() as any) }
    }

    return null
  }

  async quoteNotShownInRandomExists() {
    return !(await getDocs(query(collection(db, 'quotes'), where('isShownInRandom', '==', false)))).empty
  }

  async getRandomQuote(): Promise<IQuote | null> {
    const quotes: IQuote[] = []

    const quoteNotShownInRandomExists = await this.quoteNotShownInRandomExists()

    if (quoteNotShownInRandomExists) {
      const docs = await getDocs(query(collection(db, 'quotes'), where('isShownInRandom', '==', false)))

      docs.forEach((doc) => quotes.push({ id: doc.id, ...(doc.data() as any) }))
    } else {
      const docs = await getDocs(query(collection(db, 'quotes')))

      docs.forEach((doc) => quotes.push({ id: doc.id, ...(doc.data() as any) }))
    }

    const randomQuote = quotes[getRandomInt(0, quotes.length - 1)]

    return randomQuote
  }

  async setQuoteIsShownInRandom(quoteId: string) {
    await updateDoc(doc(db, 'quotes', quoteId), {
      isShownInRandom: true,
    })
  }
}

export default new QuotesService()
