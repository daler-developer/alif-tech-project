import { db } from '@/firebase/services'
import type { IAuthor } from '@/models'
import { removeDuplicatesFromArray } from '@/utils/helpers'
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'

class AuthorsService {
  async createAuthorIfNotExists(name: string): Promise<void> {
    const authorExists = await this.authorExists(name)

    if (!authorExists) {
      alert('create')
      await this.createAuthor(name)
    }
  }

  async createAuthor(name: string) {
    await setDoc(doc(db, 'authors', name), {
      name,
      genres: [],
    })
  }

  async authorExists(name: string) {
    const docRef = await getDoc(doc(db, 'authors', name))

    return docRef.exists()
  }

  async getAuthors(): Promise<IAuthor[]> {
    const docs = await getDocs(collection(db, 'authors'))

    const authors: IAuthor[] = []

    docs.forEach((doc) => authors.push({ id: doc.id, ...(doc.data() as any) }))

    return authors
  }

  async getAuthorByName(name: string): Promise<IAuthor | null> {
    const docRef = await getDoc(doc(db, 'authors', name))

    if (docRef.exists()) {
      return { id: docRef.id, ...(docRef.data() as any) }
    }

    return null
  }

  async addGenresToAuthor({ authorName, genres }: { authorName: string; genres: string[] }) {
    const author = await this.getAuthorByName(authorName)

    if (author) {
      await updateDoc(doc(db, 'authors', author.name), {
        genres: removeDuplicatesFromArray([...author.genres, ...genres]),
      })
    }
  }
}

export default new AuthorsService()
