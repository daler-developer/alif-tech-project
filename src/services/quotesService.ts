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
      randomCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const doc = await getDoc(createdDoc);

    return { id: doc.id, ...(doc.data() as any) };
  }

  async getQuotes({
    search,
    dateTimeRange,
  }: {
    search: string;
    dateTimeRange: [Dayjs, Dayjs];
  }) {
    const queries: any[] = [];

    if (search) {
      queries.push(where("text", "==", search));
    }

    if (dateTimeRange) {
      queries.push(where("createdAt", ">=", dateTimeRange[0].toDate()));
      queries.push(where("createdAt", "<=", dateTimeRange[1].toDate()));
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

  async getRandomQuote() {
    const notSelectedDocs = await getDocs(
      query(collection(db, "quotes"), where("randomCount", "==", 0))
    );

    const notSelectedQuotes: IQuote[] = [];

    notSelectedDocs.forEach((doc) =>
      notSelectedQuotes.push({ ...(doc.data() as any), id: doc.id })
    );

    let randomQuote: IQuote | null =
      notSelectedQuotes[getRandomInt(0, notSelectedQuotes.length)];

    if (randomQuote) {
      await this.incrementQuoteRandomCount(randomQuote.id);
    }

    return randomQuote;
  }
}

export default new QuotesService();
