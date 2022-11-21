import type { IAuthor } from '@/models'
import authorsService from '@/services/authorsService'
import type { Module } from 'vuex'
import type { IRootState } from '../store'

export interface IState {
  feed: {
    list: IAuthor[]
    isFetching: boolean
  }
  dropdown: {
    list: IAuthor[]
  }
}

export const mutations = {
  setFeedAuthors(state: IState, to: IAuthor[]) {
    state.feed.list = to
  },
  setIsFetchingFeedAuthors(state: IState, to: boolean) {
    state.feed.isFetching = to
  },
  setDropdownAuthors(state: IState, to: IAuthor[]) {
    state.dropdown.list = to
  },
}

const authorsModule: Module<IState, IRootState> = {
  namespaced: true,
  state: {
    feed: {
      list: [],
      isFetching: false,
    },
    dropdown: {
      list: [],
    },
  },
  mutations,
  actions: {
    async getFeedAuthors(context) {
      context.commit('setIsFetchingFeedAuthors', true)

      const authors = await authorsService.getAuthors()

      context.commit('setFeedAuthors', authors)

      context.commit('setIsFetchingFeedAuthors', false)
    },
    async getDropdownAuthors(context) {
      const authors = await authorsService.getAuthors()

      context.commit('setDropdownAuthors', authors)
    },
  },
}

export default authorsModule
