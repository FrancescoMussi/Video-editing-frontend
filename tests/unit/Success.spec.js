import { mount } from '@vue/test-utils'
import SuccessMessage from '@/components/Success.vue'

const title = 'Component title'
const subtitle = 'Component subtitle'

const wrapper = mount(SuccessMessage, {
  propsData: {
    title: title,
    subtitle: subtitle,
  }
})

describe('Success.vue', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('render the div element', () => {
    expect(wrapper.is('div')).toBe(true)
  })

  it('the div element has classes', () => {
    let div = wrapper.find('.columns')
    expect(div.classes()).toContain('is-mobile')
    expect(div.classes()).toContain('is-centered')
  })

  it('render the props', () => {
    expect(wrapper.vm.title).toMatch(title)
    expect(wrapper.vm.subtitle).toMatch(subtitle)
  })

  it('render the elements', () => {
    expect(wrapper.find('.column').exists()).toBe(true)
    expect(wrapper.find('.success-title').exists()).toBe(true)
    expect(wrapper.find('.success-subtitle').exists()).toBe(true)
    expect(wrapper.find('.sa').exists()).toBe(true)
    expect(wrapper.find('.sa-success').exists()).toBe(true)
  })

  it('render the title', () => {
    let h2Text = wrapper.find('.success-title')
    expect(h2Text.text()).toBe(title)
  })

  it('render the subtitle', () => {
    let h2Text = wrapper.find('.success-subtitle')
    expect(h2Text.text()).toBe(subtitle)
  })
})
