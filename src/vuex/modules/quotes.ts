import type { IQuote } from "@/models";
import quotesService from "@/services/quotesService";
import type { Module } from "vuex";
import type { IRootState } from "../store";

export interface IState {
  feed: {
    list: IQuote[];
    isFetching: boolean;
  };
}

const quotesModule: Module<IState, IRootState> = {
  namespaced: true,
  state: {
    feed: {
      list: [],
      isFetching: false,
    },
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
  },
};

export default quotesModule;
