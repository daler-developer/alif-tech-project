import { db } from "@/firebase/services";
import type { IQuote } from "@/models";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

interface CreateQuoteDto {
  text: string;
  author: string;
  genres: string[];
}

interface GetQuotesDto {}

class QuotesService {
  async createQuote({ author, text, genres }: CreateQuoteDto) {
    await addDoc(collection(db, "quotes"), {
      author,
      text,
      genres,
    });
  }

  async getQuotes({}: GetQuotesDto) {
    const docs = await getDocs(collection(db, "quotes"));

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
  }) {
    await updateDoc(doc(db, "quotes", quoteId), {
      text: newValues.text,
      author: newValues.author,
      genres: newValues.genres,
    });
  }
}

export default new QuotesService();
