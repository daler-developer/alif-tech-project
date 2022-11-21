import { db } from '@/firebase/services'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'

class GenresService {
  async getAllGenres(): Promise<string[]> {
    const genres: string[] = []

    const docs = await getDocs(collection(db, 'genres'))

    docs.forEach((doc) => genres.push((doc.data() as any).genre))

    return genres
  }

  async createGenres(genres: string[]) {
    genres.forEach(async (genre) => {
      await setDoc(doc(db, 'genres', genre), {
        genre,
      })
    })
  }
}

export default new GenresService()
