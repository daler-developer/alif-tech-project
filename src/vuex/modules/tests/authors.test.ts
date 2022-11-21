import { mutations } from '../authors'
import type { IState as AuthorsState } from '../authors'
import { describe, expect, test, vi } from 'vitest'

const mockState: AuthorsState = {
  feed: {
    list: [],
    isFetching: false,
  },
  dropdown: {
    list: [],
  },
}

vi.mock('../../../services/authorsService')

describe('authors module', () => {
  describe('mutation', () => {
    test('setFeedAuthors', () => {
      const mockAuthors = [
        {
          id: 'id001',
          name: 'daler',
          genres: ['a', 'b'],
        },
        {
          id: 'id002',
          name: 'aziz',
          genres: [],
        },
      ]

      mutations.setFeedAuthors(mockState, mockAuthors)

      expect(mockState.feed.list).toEqual(mockAuthors)
    })

    test('setIsFetchingFeedAuthors', () => {
      mutations.setIsFetchingFeedAuthors(mockState, true)

      expect(mockState.feed.isFetching).toEqual(true)

      mutations.setIsFetchingFeedAuthors(mockState, false)

      expect(mockState.feed.isFetching).toEqual(false)
    })

    test('setDropdownAuthors', () => {
      const mockAuthors = [
        {
          id: 'id001',
          name: 'daler',
          genres: ['a', 'b'],
        },
        {
          id: 'id002',
          name: 'aziz',
          genres: [],
        },
      ]

      mutations.setDropdownAuthors(mockState, mockAuthors)

      expect(mockState.dropdown.list).toEqual(mockAuthors)
    })
  })

  // describe('actions', () => {
  //   test('getFeedAuthors', () => {})
  // })
})
