import { db } from "@/firebase/services";
import type { IAuthor, IQuote } from "@/models";
import { getRandomInt, removeDuplicatesFromArray } from "@/utils/helpers";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  query,
  orderBy,
  limit,
  increment,
  startAt,
  where,
  setDoc,
} from "firebase/firestore";

class AuthorsService {
  async createAuthorIfNotExists({
    name,
  }: {
    name: string;
  }): Promise<IAuthor | null> {
    const authorExists = await this.checkIfAuthorWithNameExists(name);

    if (!authorExists) {
      await setDoc(doc(db, "authors", name), {
        name,
        genres: [],
      });

      const createdDoc = await getDoc(doc(db, "authors", name));

      return { id: createdDoc.id, ...(createdDoc.data() as any) };
    }

    return null;
  }

  async getAuthors(): Promise<IAuthor[]> {
    const docs = await getDocs(collection(db, "authors"));

    const authors: IAuthor[] = [];

    docs.forEach((doc) => authors.push({ id: doc.id, ...(doc.data() as any) }));

    return authors;
  }

  async checkIfAuthorWithNameExists(name: string): Promise<boolean> {
    return (await getDoc(doc(db, "authors", name))).exists();
  }

  async getAuthorByName(name: string): Promise<IAuthor | null> {
    const docRef = await getDoc(doc(db, "authors", name));

    if (docRef.exists()) {
      return { id: docRef.id, ...(docRef.data() as any) };
    }

    return null;
  }

  async addGenresToAuthor({
    authorName,
    genres,
  }: {
    authorName: string;
    genres: string[];
  }) {
    const author = await this.getAuthorByName(authorName);

    if (author) {
      await updateDoc(doc(db, "authors", author.name), {
        genres: removeDuplicatesFromArray([...author.genres, ...genres]),
      });
    }
  }
}

export default new AuthorsService();
