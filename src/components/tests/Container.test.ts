import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import AppContainer from '../AppContainer.vue'

describe('<AppContainer />', () => {
  test('slot is rendered', () => {
    const wrapper = mount(AppContainer, {
      slots: {
        default: 'Hello',
      },
    })

    expect(wrapper.get("[data-test='container']").text()).toContain('Hello')
  })
})
