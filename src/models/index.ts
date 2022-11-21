import type { Timestamp } from 'firebase/firestore'

export interface IQuote {
  id: string
  text: string
  author: string
  genres: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
  isShownInRandom: boolean
}

export interface IAuthor {
  id: string
  name: string
  genres: string[]
}
