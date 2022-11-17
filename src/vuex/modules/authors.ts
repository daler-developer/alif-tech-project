import type { Module } from "vuex";
import type { IRootState } from "../store";

export interface IState {
  feed: {
    list: string[];
    isFetching: false;
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
  mutations: {},
  actions: {},
};

export default authorsModule;
