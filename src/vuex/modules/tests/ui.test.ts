import { mutations } from '../ui'
import type { IState as IUiState } from '../ui'
import { beforeEach, describe, expect, test } from 'vitest'

const getMockState = (): IUiState => ({
  isCreateQuoteModalVisible: true,
  isEditQuoteModalVisible: true,
})

describe('ui store', () => {
  let mockState: IUiState

  beforeEach(() => {
    mockState = getMockState()
  })

  describe('mutations', () => {
    test('setIsCreateQuoteModalVisible', () => {
      mutations.setIsCreateQuoteModalVisible(mockState, false)

      expect(mockState.isCreateQuoteModalVisible).toEqual(false)

      mutations.setIsCreateQuoteModalVisible(mockState, true)

      expect(mockState.isCreateQuoteModalVisible).toEqual(true)
    })

    test('isEditQuoteModalVisible', () => {
      mutations.setIsEditQuoteModalVisible(mockState, false)

      expect(mockState.isEditQuoteModalVisible).toEqual(false)

      mutations.setIsEditQuoteModalVisible(mockState, true)

      expect(mockState.isEditQuoteModalVisible).toEqual(true)
    })
  })
})
