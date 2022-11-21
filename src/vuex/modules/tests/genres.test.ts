import { mutations } from '../genres'
import type { IState as IGenresState } from '../genres'
import { describe, expect, test, vi } from 'vitest'

const mockState: IGenresState = {
  dropdown: {
    list: [],
  },
}

describe('genres module', () => {
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
