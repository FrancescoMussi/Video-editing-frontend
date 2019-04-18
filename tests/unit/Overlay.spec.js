import { mount } from '@vue/test-utils'
import Overlay from '@/components/Overlay.vue'

const wrapper = mount(Overlay)

wrapper.setData({
  displayOverlay: false,
  spinnerTextArray: [
    'text 1',
    'text 2',
  ],
  spinnerText: '',
})

describe('Overlay.vue', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders the props', () => {
    expect(wrapper.vm.displayOverlay).toBe(false)
  })

  it('call showOverlay method and change displayOverlay', () => {
    jest.useFakeTimers()
    wrapper.vm.showOverlay()
    expect(wrapper.vm.displayOverlay).toBe(true)
    expect(wrapper.find('.spinnerText').exists()).toBe(true)
    expect(setInterval).toHaveBeenCalledTimes(1)

    // Go forward in time and check value of spinnerText
    jest.advanceTimersByTime(2000);
    expect(wrapper.vm.spinnerText).toEqual('text 1')
    expect(wrapper.text()).toContain('text 1')

    jest.advanceTimersByTime(8000);
    expect(wrapper.vm.spinnerText).toEqual('text 2')
    expect(wrapper.text()).toContain('text 2')
  })

  it('hide the showOverlay when calling hideOverlay', () => {
    wrapper.vm.hideOverlay()
    expect(wrapper.vm.displayOverlay).toBe(false)
  })
})
