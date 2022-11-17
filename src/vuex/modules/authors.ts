import type { IAuthor } from "@/models";
import authorsService from "@/services/authorsService";
import type { Module } from "vuex";
import type { IRootState } from "../store";

export interface IState {
  feed: {
    list: IAuthor[];
    isFetching: boolean;
  };
}

const authorsModule: Module<IState, IRootState> = {
  namespaced: true,
  state: {
    feed: {
      list: [],
      isFetching: false,
    },
  },
  mutations: {
    setFeedAuthors(state, to: IAuthor[]) {
      state.feed.list = to;
    },
    setIsFetchingFeedAuthors(state, to: boolean) {
      state.feed.isFetching = to;
    },
  },
  actions: {
    async getFeedAuthors(context) {
      context.commit("setIsFetchingFeedAuthors", true);

      const authors = await authorsService.getAuthors();

      context.commit("setFeedAuthors", authors);

      context.commit("setIsFetchingFeedAuthors", false);
    },
  },
};

export default authorsModule;
