import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AuthorCard from '../AuthorCard.vue'

describe('<AuthorCard />', () => {
  test('Author name should be rendered', () => {
    const wrapper = mount(AuthorCard, {
      props: {
        author: {
          id: 'id001',
          name: 'daler',
          genres: [],
        },
      },
    })

    expect(wrapper.get('[data-test="author-name"]').text()).toContain('daler')
  })

  test('genres dropdown is hidden and shown when clicked show genres buttons', async () => {
    const wrapper = mount(AuthorCard, {
      props: {
        author: {
          id: 'id001',
          name: 'daler',
          genres: [],
        },
      },
    })

    expect(wrapper.find('[data-test="genres-dropdown"]').exists()).toBeFalsy()

    await wrapper.get('[data-test="button"]').trigger('click')

    expect(wrapper.find('[data-test="genres-dropdown"]').exists()).toBeTruthy()
  })

  test('genres dropdown should show all genres or "No genres" text if there are no genres', async () => {
    const wrapper = mount(AuthorCard, {
      props: {
        author: {
          id: 'id001',
          name: 'daler',
          genres: ['first', 'second', 'third'],
        },
      },
    })

    await wrapper.get('[data-test="button"]').trigger('click')

    expect(wrapper.find('[data-test="genres-list"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="no-genres-text"]').exists()).not.toBeTruthy()

    expect(wrapper.get('[data-test="genres-list"]').text()).toContain('first, second, third')

    await wrapper.setProps({
      author: {
        id: 'id001',
        name: 'daler',
        genres: [],
      },
    })

    expect(wrapper.find('[data-test="genres-list"]').exists()).not.toBeTruthy()
    expect(wrapper.find('[data-test="no-genres-text"]').exists()).toBeTruthy()
  })
})
