import type { IAuthor } from '@/models'
import authorsService from '@/services/authorsService'
import genresService from '@/services/genresService'
import type { Module } from 'vuex'
import type { IRootState } from '../store'

export interface IState {
  dropdown: {
    list: string[]
  }
}

export const mutations = {
  setDropdownGenres(state: IState, to: string[]) {
    state.dropdown.list = to
  },
}

const genresModule: Module<IState, IRootState> = {
  namespaced: true,
  state: {
    dropdown: {
      list: [],
    },
  },
  mutations,
  actions: {
    async getDropdownGenres(context) {
      const genres = await genresService.getAllGenres()

      context.commit('setDropdownGenres', genres)
    },
  },
}

export default genresModule
