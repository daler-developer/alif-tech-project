import type { IQuote } from '@/models'
import { createVuexStore, key } from '@/store/store'
import { mount } from '@vue/test-utils'
import { Timestamp } from 'firebase/firestore'
import { describe, expect, test, vi } from 'vitest'
import QuoteCard from '../QuoteCard.vue'

describe('<QuoteCard />', () => {
  test('text is rendered', () => {
    const mockQuote: IQuote = {
      id: 'id001',
      author: 'daler',
      createdAt: new Timestamp(100, 100),
      updatedAt: new Timestamp(100, 100),
      genres: [],
      isShownInRandom: false,
      text: 'text',
    }

    const wrapper = mount(QuoteCard, {
      props: {
        quote: mockQuote,
      },
    })

    expect(wrapper.get('[data-test="quote-text"]').text()).toContain(mockQuote.text)
  })

  test('genres list is rendered', () => {
    const mockQuote: IQuote = {
      id: 'id001',
      author: 'daler',
      createdAt: new Timestamp(100, 100),
      updatedAt: new Timestamp(100, 100),
      genres: ['a', 'b'],
      isShownInRandom: false,
      text: 'text',
    }

    const wrapper = mount(QuoteCard, {
      props: {
        quote: mockQuote,
      },
    })

    expect(wrapper.find('[data-test="genres-list"]').exists()).toEqual(true)
  })

  test('genres list is not rendered', () => {
    const mockQuote: IQuote = {
      id: 'id001',
      author: 'daler',
      createdAt: new Timestamp(100, 100),
      updatedAt: new Timestamp(100, 100),
      genres: [],
      isShownInRandom: false,
      text: 'text',
    }

    const wrapper = mount(QuoteCard, {
      props: {
        quote: mockQuote,
      },
    })

    expect(wrapper.find('[data-test="genres-list"]').exists()).toEqual(false)
  })

  test('created at is rendered', () => {
    const mockQuote: IQuote = {
      id: 'id001',
      author: 'daler',
      createdAt: new Timestamp(100, 100),
      updatedAt: new Timestamp(100, 100),
      genres: [],
      isShownInRandom: false,
      text: 'text',
    }

    const wrapper = mount(QuoteCard, {
      props: {
        quote: mockQuote,
      },
    })

    expect(wrapper.get('[data-test="created-at"]').text()).toContain('Created: 01:01:1970 06:01:40')
  })

  test('updated at is rendered', () => {
    const mockQuote: IQuote = {
      id: 'id001',
      author: 'daler',
      createdAt: new Timestamp(100, 100),
      updatedAt: new Timestamp(1000, 1000),
      genres: [],
      isShownInRandom: false,
      text: 'text',
    }

    const wrapper = mount(QuoteCard, {
      props: {
        quote: mockQuote,
      },
    })

    expect(wrapper.get('[data-test="updated-at"]').text()).toContain('Updated: 01:01:1970 06:16:40')
  })

  test('edit button', async () => {
    const store = createVuexStore()

    const spyCommit = vi.spyOn(store, 'commit')

    const mockQuote = {
      id: 'id001',
      author: 'daler',
      createdAt: new Timestamp(100, 100),
      updatedAt: new Timestamp(1000, 1000),
      genres: [],
      isShownInRandom: false,
      text: 'text',
    }

    const wrapper = mount(QuoteCard, {
      props: {
        quote: mockQuote,
      },
      global: {
        provide: {
          [key]: store,
        },
      },
    })

    await wrapper.get('[data-test="edit-button"]').trigger('click')

    expect(spyCommit).toHaveBeenCalledTimes(2)

    expect(spyCommit.mock.calls[0][0]).toEqual('quotes/setQuoteEditing')
    expect(spyCommit.mock.calls[0][1]).toEqual(mockQuote)

    expect(spyCommit.mock.calls[1][0]).toEqual('ui/setIsEditQuoteModalVisible')
    expect(spyCommit.mock.calls[1][1]).toEqual(true)
  })
})
