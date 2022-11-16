import type { Module } from "vuex";
import type { IRootState } from "../store";

export interface IState {
  isCreateQuoteModalVisible: boolean;
  isEditQuoteModalVisible: boolean;
}

const uiModule: Module<IState, IRootState> = {
  namespaced: true,
  state: {
    isCreateQuoteModalVisible: false,
    isEditQuoteModalVisible: false,
  },
  mutations: {
    setIsCreateQuoteModalVisible(state, payload: boolean) {
      state.isCreateQuoteModalVisible = payload;
    },
    setIsEditQuoteModalVisible(state, payload: boolean) {
      state.isEditQuoteModalVisible = payload;
    },
  },
};

export default uiModule;
