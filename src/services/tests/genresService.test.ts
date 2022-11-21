import { getDocs, setDoc } from 'firebase/firestore'
import { afterEach, describe, expect, test, vi, type Mock } from 'vitest'
import genresService from '../genresService'

vi.mock('firebase/firestore')

describe('genresService', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('getAllGenres()', () => {
    test('return value', async () => {
      ;(getDocs as Mock).mockResolvedValue([
        {
          data: () => ({ genre: 'daler' }),
        },
        {
          data: () => ({ genre: 'aziz' }),
        },
      ])

      const genres = await genresService.getAllGenres()

      expect(genres).toEqual(['daler', 'aziz'])
    })
  })

  describe('createGenres()', () => {
    test('setDoc() calls', async () => {
      await genresService.createGenres(['daler', 'aziz', 'zarina'])

      expect(setDoc as Mock).toHaveBeenCalledTimes(3)
    })
  })
})
