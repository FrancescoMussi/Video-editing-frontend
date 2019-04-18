import { mount } from '@vue/test-utils'
import CustomButton from '@/components/CustomButton.vue'

const text = 'testing prop text'

const wrapper = mount(CustomButton, {
  propsData: {
    text: text,
    isDisabled: false,
    showButton: true,
    cssClass: 'is-primary',
    icon: 'android'
  }
})

describe('CustomButton.vue', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders div element', () => {
    expect(wrapper.is('div')).toBe(true);
  })

  it('rendered div has css classes', () => {
    let div = wrapper.find('.level-item')
    expect(div.classes()).toContain('has-text-centered')
  })

  it('renders the props', () => {
    expect(wrapper.vm.text).toMatch(text)
    expect(wrapper.vm.isDisabled).toBe(false)
    expect(wrapper.vm.showButton).toBe(true)
    expect(wrapper.vm.cssClass).toBe('is-primary')
  })

  it('renders the elements', () => {
    expect(wrapper.find('.level-item').exists()).toBe(true)
    expect(wrapper.find('.has-text-centered').exists()).toBe(true)
    expect(wrapper.find('.button').exists()).toBe(true)
    expect(wrapper.find('.material-icons').exists()).toBe(true)
    expect(wrapper.find('.buttonText').exists()).toBe(true)
  })

  it('renders the button text', () => {
    let buttonText = wrapper.find('.buttonText')
    expect(buttonText.text()).toBe(text)
  })
})
