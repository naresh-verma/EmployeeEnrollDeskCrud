import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import {setActivePinia, createPinia} from 'pinia'
import App from '../App.vue'
 
const wrapperFactory = (values={}) => 
  mount(App, {
    props: {
      ...values
    },
    global: {
      stubs: {
        'router-link': true,
        'router-view': true,
        'q-app': true,
        'q-layout': true,
        'q-page-container': true
      },
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          stubActions: false,
          initialState: {
            auth: {
              user: null,
              token: null,
              isAuthenticated: false
            }
          }
        })
      ]
    }
  });

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  });

  afterEach(() => {
    setActivePinia(null)
  });

  it('mounts renders properly', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.exists()).toBe(true)
  })
})
