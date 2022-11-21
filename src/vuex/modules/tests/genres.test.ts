import { beforeEach, describe, expect, test } from 'vitest'
import type { IState as IGenresState } from '../genres'
import { mutations } from '../genres'

const getMockState = (): IGenresState => ({
  dropdown: {
    list: [],
  },
})

describe('genres module', () => {
  let mockState: IGenresState

  beforeEach(() => {
    mockState = getMockState()
  })

  describe('mutation', () => {
    test('setDropdownGenres', () => {
      const mockGenres = ['daler', 'aziz', 'zarain']

      mutations.setDropdownGenres(mockState, mockGenres)

      expect(mockState.dropdown.list).toEqual(mockGenres)

      mutations.setDropdownGenres(mockState, [])

      expect(mockState.dropdown.list).toEqual([])
    })
  })
})
