import type { IQuote } from "@/models";
import quotesService from "@/services/quotesService";
import type { Module } from "vuex";
import type { IRootState } from "../store";

export interface IState {
  feed: {
    list: IQuote[];
    isFetching: boolean;
  };
  quoteEditing: IQuote | null;
}

const quotesModule: Module<IState, IRootState> = {
  namespaced: true,
  state: {
    feed: {
      list: [],
      isFetching: false,
    },
    quoteEditing: null,
  },
  mutations: {
    setIsFeedQuotesFetching(state, payload: boolean) {
      state.feed.isFetching = payload;
    },
    setFeedQuotes(state, payload: IQuote[]) {
      state.feed.list = payload;
    },
    deleteQuote(state, quoteId: string) {
      state.feed.list = state.feed.list.filter((quote) => quote.id !== quoteId);
    },
    setQuoteEditing(state, quote: IQuote) {
      state.quoteEditing = quote;
    },
    // editQuote(state, { text, author, genres, quoteId }: { quoteId: string, text: string, author: string, genres: string }) {

    // }
  },
  actions: {
    async createQuote(
      context,
      {
        author,
        text,
        genres,
      }: { text: string; author: string; genres: string[] }
    ) {
      await quotesService.createQuote({ author, text, genres });
    },
    async getQuotes(context) {
      context.commit("setIsFeedQuotesFetching", true);

      const quotes = await quotesService.getQuotes({});

      context.commit("setFeedQuotes", quotes);

      context.commit("setIsFeedQuotesFetching", false);
    },
    async deleteQuote(context, quoteId: string) {
      context.commit("deleteQuote", quoteId);
      await quotesService.deleteQuote({ quoteId });
    },
    async editQuote(
      context,
      {
        newValues,
        quoteId,
      }: {
        quoteId: string;
        newValues: { text: string; author: string; genres: string[] };
      }
    ) {
      await quotesService.editQuote({ newValues, quoteId });
    },
  },
};

export default quotesModule;
