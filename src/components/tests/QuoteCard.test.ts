import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuoteCard from '../QuoteCard.vue'
import type { IQuote } from '@/models'
import { Timestamp } from 'firebase/firestore'

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
})
