import { createStore } from "vuex";
import type { Store } from "vuex";
import uiModule from "./modules/ui";
import type { IState as IUiState } from "./modules/ui";
import type { IState as IQuotesState } from "./modules/quotes";
import type { InjectionKey } from "vue";
import quotesModule from "./modules/quotes";

export interface IRootState {
  ui: IUiState;
  quotes: IQuotesState;
}

export const key: InjectionKey<Store<IRootState>> = Symbol();

const store = createStore<IRootState>({
  modules: {
    ui: uiModule,
    quotes: quotesModule,
  },
});

export default store;
