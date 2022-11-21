import { deleteDoc, doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { beforeEach, describe, expect, test, vi, type Mock } from 'vitest'
import quotesService from '../quotesService'

vi.mock('firebase/firestore')

describe('quotesService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('deleteQuote()', () => {
    test('deleteDoc() call', async () => {
      await quotesService.deleteQuote('id001')

      expect(deleteDoc as Mock).toHaveBeenCalled()
    })

    test('doc() call', async () => {
      await quotesService.deleteQuote('id001')

      expect(doc as Mock).toHaveBeenCalled()
      expect((doc as Mock).mock.lastCall[1]).toEqual('quotes')
      expect((doc as Mock).mock.lastCall[2]).toEqual('id001')
    })
  })

  describe('getQuoteById()', () => {
    test('should return quote', async () => {
      const quoteData = {
        author: 'daler',
        genres: [],
        createdAt: new Timestamp(100, 100),
        updatedAt: new Timestamp(100, 100),
      }

      ;(getDoc as Mock).mockResolvedValue({
        id: 'id001',
        data: () => quoteData,
        exists: () => true,
      })

      const quote = await quotesService.getQuoteById('id001')

      expect(quote).toEqual({ id: 'id001', ...quoteData })
    })

    test('should return null', async () => {
      ;(getDoc as Mock).mockResolvedValue({
        id: 'id001',
        exists: () => false,
      })

      const quote = await quotesService.getQuoteById('id001')

      expect(quote).toBeNull()
    })
  })

  describe('setQuoteIsShownInRandom()', () => {
    test('updateDoc() call', async () => {
      await quotesService.setQuoteIsShownInRandom('id001')

      expect(updateDoc as Mock).toHaveBeenCalled()
      expect((updateDoc as Mock).mock.lastCall[1]).toEqual({
        isShownInRandom: true,
      })
    })

    test('doc() call', async () => {
      await quotesService.setQuoteIsShownInRandom('id001')

      expect(doc as Mock).toHaveBeenCalled()
      expect((doc as Mock).mock.lastCall[1]).toEqual('quotes')
      expect((doc as Mock).mock.lastCall[2]).toEqual('id001')
    })
  })
})
