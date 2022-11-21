import type { IQuote } from '@/models'
import authorsService from '@/services/authorsService'
import quotesService from '@/services/quotesService'
import type { Module } from 'vuex'
import type { IRootState } from '../store'
import type { Dayjs } from 'dayjs'
import genresService from '@/services/genresService'

export interface IState {
  feed: {
    list: IQuote[]
    isFetching: boolean
  }
  quoteEditing: IQuote | null
  randomQuote: {
    isFetching: boolean
    data: IQuote | null
  }
}

export const mutations = {
  setIsFeedQuotesFetching(state: IState, payload: boolean) {
    state.feed.isFetching = payload
  },
  setFeedQuotes(state: IState, payload: IQuote[]) {
    state.feed.list = payload
  },
  deleteQuote(state: IState, quoteId: string) {
    state.feed.list = state.feed.list.filter((quote) => quote.id !== quoteId)
  },
  setQuoteEditing(state: IState, quote: IQuote) {
    state.quoteEditing = quote
  },
  setIsFetchingRandomQuote(state: IState, to: boolean) {
    state.randomQuote.isFetching = to
  },
  setRandomQuote(state: IState, quote: IQuote) {
    state.randomQuote.data = quote
  },
  editQuote(state: IState, { quoteId, newQuote }: { quoteId: string; newQuote: IQuote }) {
    state.feed.list = state.feed.list.map((quote) => {
      if (quote.id === quoteId) {
        return newQuote
      }
      return quote
    })
  },
}

const quotesModule: Module<IState, IRootState> = {
  namespaced: true,
  state: {
    feed: {
      list: [],
      isFetching: false,
    },
    quoteEditing: null,
    randomQuote: {
      data: null,
      isFetching: false,
    },
  },
  mutations,
  actions: {
    async createQuote(
      context,
      {
        author,
        text,
        genres,
      }: {
        text: string
        author: string
        genres: string[]
      }
    ) {
      const newQuote = await quotesService.createQuote({
        author,
        text,
        genres,
      })
      await authorsService.createAuthor(author)
      await authorsService.addGenresToAuthor({ authorName: author, genres })
      await genresService.createGenres(genres)

      context.commit('setFeedQuotes', [...context.state.feed.list, newQuote])
    },
    async getQuotes(
      context,
      filterObj: {
        search: string
        dateTimeRange: [Dayjs, Dayjs]
        author: string | undefined
        genre: string | undefined
        sort: 'created-at:desc' | 'created-at:asc' | 'updated-at:desc' | 'updated-at:asc' | undefined
      }
    ) {
      context.commit('setIsFeedQuotesFetching', true)

      const quotes = await quotesService.getQuotes(filterObj)

      context.commit('setFeedQuotes', quotes)

      context.commit('setIsFeedQuotesFetching', false)
    },
    async deleteQuote(context, quoteId: string) {
      context.commit('deleteQuote', quoteId)
      await quotesService.deleteQuote(quoteId)
    },
    async editQuote(
      context,
      {
        newValues,
        quoteId,
      }: {
        quoteId: string
        newValues: { text: string; author: string; genres: string[] }
      }
    ) {
      const updatedQuote = await quotesService.editQuote({
        newValues,
        quoteId,
      })
      await authorsService.createAuthor(newValues.author)
      await authorsService.addGenresToAuthor({
        authorName: newValues.author,
        genres: newValues.genres,
      })
      await genresService.createGenres(newValues.genres)
      context.commit('editQuote', { quoteId, newQuote: updatedQuote })
    },
    async getRandomQuote(context) {
      context.commit('setIsFetchingRandomQuote', true)

      const randomQuote = await quotesService.getRandomQuote()

      if (randomQuote) {
        await quotesService.setQuoteIsShownInRandom(randomQuote.id)
      }

      context.commit('setRandomQuote', randomQuote)

      context.commit('setIsFetchingRandomQuote', false)
    },
  },
}

export default quotesModule
