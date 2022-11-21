import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import { createStore } from 'vuex'
import type { IState as IAuthorsState } from './modules/authors'
import authorsModule from './modules/authors'
import type { IState as IGenresState } from './modules/genres'
import genresModule from './modules/genres'
import type { IState as IQuotesState } from './modules/quotes'
import quotesModule from './modules/quotes'
import type { IState as IUiState } from './modules/ui'
import uiModule from './modules/ui'

export interface IRootState {
  ui: IUiState
  quotes: IQuotesState
  authors: IAuthorsState
  genres: IGenresState
}

export const key: InjectionKey<Store<IRootState>> = Symbol()

const store = createStore<IRootState>({
  modules: {
    ui: uiModule,
    quotes: quotesModule,
    authors: authorsModule,
    genres: genresModule,
  },
})

export default store
