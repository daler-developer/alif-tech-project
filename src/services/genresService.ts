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

class GenresService {
  async getAllGenres() {
    const allAuthorsDocs = await getDocs(collection(db, "authors"));

    allAuthorsDocs.forEach((doc) => {});
  }
}

export default new GenresService();
