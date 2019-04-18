import { mount, createLocalVue, TransitionGroupStub, TransitionStub } from '@vue/test-utils'
import AdminArea from '@/views/AdminArea.vue'
import CustomButton from '@/components/CustomButton.vue'
import Vuex from 'vuex'
import store from '@/store/store.js'

jest.mock('axios')
const localVue = createLocalVue()
localVue.use(Vuex)

const wrapper = mount(AdminArea, {
  store,
  localVue,
  stubs: {
    'transition': TransitionStub,
    'transition-group': TransitionGroupStub
  }
})

const addVideo = store._mutations.addVideo[0]
const updateVideos = store._mutations.updateVideos[0]

let video1= {
  base64: '',
  blob: {},
  href: 'blob:http://localhost:8080/93c59e49-f2ec-4dde-a4ab-c43b1a2c8912',
  id: 1,
  thumb: ''
}

wrapper.setData({
  base64: null,
  showDownloadButton: false,
  showDraggable: true,
  showSuccessMessage: false,
  successTitle: 'The video has been successfully created!',
  successSubtitle: 'Click the download button on the left to download the video'
})

describe('AdminArea.vue', () => {

  const successMessage = wrapper.find({ref: 'successMessage'})

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('render the div element', () => {
    expect(wrapper.is('div')).toBe(true)
  })

  it('render the overlay component', () => {
    let overlay = wrapper.find({ ref: 'overlay'})
    expect(overlay.exists()).toBe(true)
  })

  it('render the custom button component', () => {
    let customButton = wrapper.find(CustomButton)
    expect(customButton.exists()).toBe(true)
  })

  it('success message is empty at start (v-show false)', () => {
    expect(successMessage.exists()).toBe(true)
    expect(successMessage.isVisible()).toBe(false)
  })

  it('show success message if showSuccessMessage is true', () => {
    const textContainer = wrapper.find('.textContainer')
    wrapper.vm.showSuccessMessage = true
    expect(successMessage.isVisible()).toBe(true)
    expect(textContainer.isVisible()).toBe(true)
    expect(wrapper.find('.titleSuccess').text()).toEqual('Video successfully created!')
  })

  it('add a video to the list', () => {
    expect(store.state.videos).toEqual([])
    addVideo(video1)
    expect(store.state.videos.length).toEqual(1)
  })

  it('show the videos', () => {
    const draggable = wrapper.find({ref: 'draggable'})
    expect(draggable.exists()).toBe(true)
    const listVideo = wrapper.find('.list-complete-item')
    expect(listVideo.exists()).toBe(true)
  })

  it('reset the videos', () => {
    updateVideos([])
    expect(store.state.videos.length).toEqual(0)
  })

})