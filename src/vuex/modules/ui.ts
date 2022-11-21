import type { Module } from 'vuex'
import type { IRootState } from '../store'

export interface IState {
  isCreateQuoteModalVisible: boolean
  isEditQuoteModalVisible: boolean
}

export const mutations = {
  setIsCreateQuoteModalVisible(state: IState, to: boolean) {
    state.isCreateQuoteModalVisible = to
  },
  setIsEditQuoteModalVisible(state: IState, to: boolean) {
    state.isEditQuoteModalVisible = to
  },
}

const uiModule: Module<IState, IRootState> = {
  namespaced: true,
  state: {
    isCreateQuoteModalVisible: false,
    isEditQuoteModalVisible: false,
  },
  mutations,
}

export default uiModule
