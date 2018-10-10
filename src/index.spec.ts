import { mount } from '@vue/test-utils'
import VueFixedHeader from './'

describe('index.ts', () => {
  test('SKIP', () => {
    mount(VueFixedHeader, {
      propsData: {
        _window: {},
        _navigator: {},
        _document: {}
      }
    })
  })
})
