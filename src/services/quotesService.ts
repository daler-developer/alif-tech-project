import { db } from "@/firebase/services";
import type { IQuote } from "@/models";
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
} from "firebase/firestore";
import authorsService from "./authorsService";
import type { Dayjs } from "dayjs";

interface CreateQuoteDto {
  text: string;
  author: string;
  genres: string[];
}

class QuotesService {
  async createQuote({ author, text, genres }: CreateQuoteDto): Promise<IQuote> {
    const createdDoc = await addDoc(collection(db, "quotes"), {
      author,
      text,
      genres,
      isShownInRandom: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const doc = await getDoc(createdDoc);

    return { id: doc.id, ...(doc.data() as any) };
  }

  async getQuotes({
    search,
    dateTimeRange,
    author,
    genre,
  }: {
    search: string;
    dateTimeRange: [Dayjs, Dayjs];
    author: string | undefined;
    genre: string | undefined;
  }) {
    const queries: any[] = [];

    if (search) {
      queries.push(where("text", "==", search));
    }

    if (dateTimeRange) {
      queries.push(where("createdAt", ">=", dateTimeRange[0].toDate()));
      queries.push(where("createdAt", "<=", dateTimeRange[1].toDate()));
    }

    if (author) {
      queries.push(where("author", "==", author));
    }

    if (genre) {
      queries.push(where("genres", "array-contains", genre));
    }

    const docs = await getDocs(query(collection(db, "quotes"), ...queries));

    const quotes: IQuote[] = [];

    docs.forEach((doc) => {
      quotes.push({ ...(doc.data() as any), id: doc.id });
    });

    return quotes;
  }

  async deleteQuote({ quoteId }: { quoteId: string }) {
    await deleteDoc(doc(db, "quotes", quoteId));
  }

  async editQuote({
    newValues,
    quoteId,
  }: {
    quoteId: string;
    newValues: { text: string; author: string; genres: string[] };
  }): Promise<IQuote> {
    await updateDoc(doc(db, "quotes", quoteId), {
      text: newValues.text,
      author: newValues.author,
      genres: newValues.genres,
      updatedAt: new Date(),
    });

    return (await this.getQuoteById(quoteId))!;
  }

  async getQuoteById(quoteId: string): Promise<IQuote | null> {
    const docRef = await getDoc(doc(db, "quotes", quoteId));

    if (docRef.exists()) {
      return { id: docRef.id, ...(docRef.data() as any) };
    }

    return null;
  }

  async incrementQuoteRandomCount(quoteId: string) {
    await updateDoc(doc(db, "quotes", quoteId), {
      randomCount: increment(1),
    });
  }

  async quoteNotShownInRandomExists() {
    return !(
      await getDocs(
        query(collection(db, "quotes"), where("isShownInRandom", "==", false))
      )
    ).empty;
  }

  async getRandomQuote(): Promise<IQuote | null> {
    const quotes: IQuote[] = [];

    const quoteNotShownInRandomExists =
      await this.quoteNotShownInRandomExists();

    if (quoteNotShownInRandomExists) {
      const docs = await getDocs(
        query(collection(db, "quotes"), where("isShownInRandom", "==", false))
      );

      docs.forEach((doc) =>
        quotes.push({ id: doc.id, ...(doc.data() as any) })
      );
    } else {
      const docs = await getDocs(query(collection(db, "quotes")));

      docs.forEach((doc) =>
        quotes.push({ id: doc.id, ...(doc.data() as any) })
      );
    }

    const randomQuote = quotes[getRandomInt(0, quotes.length - 1)];

    return randomQuote;
  }
}

export default new QuotesService();
