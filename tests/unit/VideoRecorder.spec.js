import { shallowMount, createLocalVue } from '@vue/test-utils'
import VideoRecorder from '@/components/VideoRecorder.vue'
import Vuex from 'vuex'
import store from '@/store/store.js'

const localVue = createLocalVue()
localVue.use(Vuex)

const initVideo = jest.fn()
const wrapper = shallowMount(VideoRecorder, {
  store,
  localVue,
  methods: { initVideo }
})

wrapper.setData({
  stream: {},
  video: {},
  recorder: {},
})

window.MediaRecorder = jest.fn().mockImplementation(query => {
  return {
    start: jest.fn(),
    stop: jest.fn(),
    pause: jest.fn()
  };
});

describe('VideoRecorder.vue', () => {

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('render the div element', () => {
    expect(wrapper.is('div')).toBe(true)
  })

  it('render the video element', () => {
    let video = wrapper.find({ ref: 'video'})
    expect(video.exists()).toBe(true)
  })

  it('computed properties are properly returned', () => {
    expect(store.state.isRecording).toEqual(false)
  })

  it('call the initVideo method when mounted', () => {
    expect(initVideo).toHaveBeenCalledTimes(1)
  })

  it('call the startRecording method', () => {
    jest.useFakeTimers()
    wrapper.vm.startRecording()

    // Recording has started
    expect(store.state.isRecording).toEqual(true)
    expect(wrapper.vm.recorder.start).toHaveBeenCalledTimes(1)

    // test the setInterval has been called and the counter has been decremented
    jest.advanceTimersByTime(1000);
    expect(setInterval).toHaveBeenCalledTimes(1)
    expect(store.state.counter).toEqual(14)
    jest.advanceTimersByTime(1000);
    expect(store.state.counter).toEqual(13)
    expect(setTimeout).toHaveBeenCalledTimes(1)

    // Recording has been stopped
    jest.advanceTimersByTime(13000);
    expect(wrapper.vm.recorder.stop).toHaveBeenCalledTimes(1)
    expect(store.state.isRecording).toEqual(false)
  })


  it('call the stopRecording method', () => {
    jest.useFakeTimers()
    wrapper.vm.stopRecording()
    expect(store.state.showVideoRecorder).toEqual(false)
    expect(store.state.showFinalizeButton).toEqual(false)
    expect(store.state.showSuccessVideoRecorded).toEqual(true)
  })


})
