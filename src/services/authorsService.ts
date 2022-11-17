import { db } from "@/firebase/services";
import type { IAuthor, IQuote } from "@/models";
import { getRandomInt } from "@/utils/helpers";
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
}

export default new AuthorsService();
