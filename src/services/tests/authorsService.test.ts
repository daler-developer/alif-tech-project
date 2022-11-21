import { afterEach, describe, expect, test, vi, type Mock } from 'vitest'
import { getDocs, getDoc, setDoc, doc } from 'firebase/firestore'
import firestore from 'firebase/firestore'
import authorsService from '../authorsService'

vi.mock('firebase/firestore')

describe('authorsService', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('getAuthors()', () => {
    test('return value', async () => {
      ;(getDocs as Mock).mockResolvedValue([
        {
          id: 'id001',
          data: () => ({ name: 'daler', genres: [] }),
        },
        {
          id: 'id002',
          data: () => ({ name: 'daler', genres: [] }),
        },
      ])

      const authors = await authorsService.getAuthors()

      expect(authors).toEqual([
        {
          id: 'id001',
          name: 'daler',
          genres: [],
        },
        {
          id: 'id002',
          name: 'daler',
          genres: [],
        },
      ])
    })
  })

  describe('getAuthorByName()', () => {
    test.skip('doc() call', async () => {
      ;(getDoc as Mock).mockResolvedValue({
        id: 'id002',
        data: () => ({ name: 'daler', genres: [] }),
        exists: () => true,
      })

      await authorsService.getAuthorByName('aziz')

      expect(doc as Mock).toHaveBeenCalled()
      expect((doc as Mock).mock.calls[0][1]).toEqual('authors')
      expect((doc as Mock).mock.calls[0][2]).toEqual('daler')
    })

    test('getAuthorByName() should return author', async () => {
      ;(getDoc as Mock).mockResolvedValue({
        id: 'id002',
        data: () => ({ name: 'daler', genres: [] }),
        exists: () => true,
      })

      const author = await authorsService.getAuthorByName('daler')

      expect(author).toEqual({
        id: 'id002',
        name: 'daler',
        genres: [],
      })
    })

    test('getAuthorByName() should return null', async () => {
      ;(getDoc as Mock).mockResolvedValue({
        id: 'id002',
        data: () => ({ name: 'daler', genres: [] }),
        exists: () => false,
      })

      const author = await authorsService.getAuthorByName('aziz')

      expect(author).toBeNull()
    })
  })

  describe('createAuthor()', () => {
    test('doc() call', async () => {
      await authorsService.createAuthor('daler')

      expect(doc as Mock).toHaveBeenCalled()
      expect((doc as Mock).mock.calls[0][1]).toEqual('authors')
      expect((doc as Mock).mock.calls[0][2]).toEqual('daler')
    })

    test('setDoc() call', async () => {
      await authorsService.createAuthor('daler')

      expect(setDoc as Mock).toHaveBeenCalled()
    })
  })
})
