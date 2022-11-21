import type { IAuthor } from "@/models";
import authorsService from "@/services/authorsService";
import type { Module } from "vuex";
import type { IRootState } from "../store";

export interface IState {
  dropdown: {
    list: string[];
  };
}

const genresModule: Module<IState, IRootState> = {
  namespaced: true,
  state: {
    dropdown: {
      list: [],
    },
  },
  mutations: {},
  actions: {},
};

export default genresModule;
