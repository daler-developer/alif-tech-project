import { Timestamp } from 'firebase/firestore'
import { beforeEach, describe, expect, test } from 'vitest'
import type { IState as IQuotesState } from '../quotes'
import { mutations } from '../quotes'

const getMockState = (): IQuotesState => ({
  feed: {
    isFetching: false,
    list: [],
  },
  quoteEditing: null,
  randomQuote: {
    data: null,
    isFetching: false,
  },
})

describe('quotes module', () => {
  let mockState: IQuotesState

  beforeEach(() => {
    mockState = getMockState()
  })

  describe('mutations', () => {
    test('setIsFeedQuotesFetching', () => {
      mutations.setIsFeedQuotesFetching(mockState, true)

      expect(mockState.feed.isFetching).toEqual(true)

      mutations.setIsFeedQuotesFetching(mockState, false)

      expect(mockState.feed.isFetching).toEqual(false)
    })

    test('setFeedQuotes', () => {
      const mockQuotes = [
        {
          id: 'id001',
          author: 'daler',
          genres: [],
          createdAt: new Timestamp(100, 100),
          updatedAt: new Timestamp(100, 100),
          isShownInRandom: true,
          text: 'test',
        },
      ]

      mutations.setFeedQuotes(mockState, mockQuotes)

      expect(mockState.feed.list).toEqual(mockQuotes)
    })

    test('deleteQuote', () => {
      mockState.feed.list = [
        {
          id: 'id001',
          author: 'daler',
          genres: [],
          createdAt: new Timestamp(100, 100),
          updatedAt: new Timestamp(100, 100),
          isShownInRandom: true,
          text: 'test',
        },
        {
          id: 'id002',
          author: 'aziz',
          genres: [],
          createdAt: new Timestamp(100, 100),
          updatedAt: new Timestamp(100, 100),
          isShownInRandom: true,
          text: 'test',
        },
      ]

      mutations.deleteQuote(mockState, 'id001')

      expect(mockState.feed.list).toEqual([
        {
          id: 'id002',
          author: 'aziz',
          genres: [],
          createdAt: new Timestamp(100, 100),
          updatedAt: new Timestamp(100, 100),
          isShownInRandom: true,
          text: 'test',
        },
      ])
    })

    test('setQuoteEditing', () => {
      const mockQuote = {
        id: 'id002',
        author: 'daler',
        genres: [],
        createdAt: new Timestamp(100, 100),
        updatedAt: new Timestamp(100, 100),
        isShownInRandom: true,
        text: 'test',
      }

      mutations.setQuoteEditing(mockState, mockQuote)

      expect(mockState.quoteEditing).toEqual(mockQuote)
    })

    test('setIsFetchingRandomQuote', () => {
      mutations.setIsFetchingRandomQuote(mockState, true)

      expect(mockState.randomQuote.isFetching).toEqual(true)

      mutations.setIsFetchingRandomQuote(mockState, false)

      expect(mockState.randomQuote.isFetching).toEqual(false)
    })

    test('setRandomQuote', () => {
      const mockQuote = {
        id: 'id002',
        author: 'daler',
        genres: [],
        createdAt: new Timestamp(100, 100),
        updatedAt: new Timestamp(100, 100),
        isShownInRandom: true,
        text: 'test',
      }

      mutations.setRandomQuote(mockState, mockQuote)

      expect(mockState.randomQuote.data).toEqual(mockQuote)
    })

    test('editQuote', () => {
      mockState.feed.list = [
        {
          id: 'id002',
          author: 'daler',
          genres: [],
          createdAt: new Timestamp(100, 100),
          updatedAt: new Timestamp(100, 100),
          isShownInRandom: false,
          text: 'test',
        },
        {
          id: 'id001',
          author: 'daler',
          genres: [],
          createdAt: new Timestamp(100, 100),
          updatedAt: new Timestamp(100, 100),
          isShownInRandom: false,
          text: 'test',
        },
      ]

      const mockNewQuote = {
        id: 'id001',
        author: 'aziz',
        genres: ['a', 'b'],
        createdAt: new Timestamp(100, 100),
        updatedAt: new Timestamp(100, 100),
        isShownInRandom: true,
        text: 'asdfasdf',
      }

      mutations.editQuote(mockState, {
        quoteId: 'id001',
        newQuote: mockNewQuote,
      })

      expect(mockState.feed.list).toEqual([
        {
          id: 'id002',
          author: 'daler',
          genres: [],
          createdAt: new Timestamp(100, 100),
          updatedAt: new Timestamp(100, 100),
          isShownInRandom: false,
          text: 'test',
        },
        {
          id: 'id001',
          author: 'aziz',
          genres: ['a', 'b'],
          createdAt: new Timestamp(100, 100),
          updatedAt: new Timestamp(100, 100),
          isShownInRandom: true,
          text: 'asdfasdf',
        },
      ])
    })
  })
})
