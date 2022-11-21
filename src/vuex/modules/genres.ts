import type { IAuthor } from "@/models";
import authorsService from "@/services/authorsService";
import genresService from "@/services/genresService";
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
  mutations: {
    setDropdownGenres(state, to: string[]) {
      state.dropdown.list = to;
    },
  },
  actions: {
    async getDropdownGenres(context) {
      const genres = await genresService.getAllGenres();

      context.commit("setDropdownGenres", genres);
    },
  },
};

export default genresModule;
