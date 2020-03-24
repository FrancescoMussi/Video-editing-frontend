import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default new Vuex.Store({
  state: {
    token: window.localStorage.getItem('access_token') || null,
    userId: null,
    showVideoRecorder: true,
    showStartRecordingButton: true,
    showSuccessVideoRecorded: false,
    showPlayer: false,
    showButtonDelete: false,
    showButtonSave: false,
    showSuccessVideoDeleted: false,
    showSuccessVideoSaved: false,
    showFinalizeButton: false,
    isRecording: false,
    counter: 15,
    completedSteps: 0,
    videoOutput: {
      name: '',
      href: ''
    },
    playerOptions: {
      height: '360',
      muted: false,
      language: 'en',
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      poster: '/static/images/author.jpg'
    },
    videos: [],
    chunks: [],
    blobArray: [],
    currentBlob: null,
    videoId: 1,
    baseUrl: 'http://127.0.0.1:8000'
  },
  getters: {
    loggedIn: state => {
      return state.token !== null
    }
  },
  mutations: {
    logout: state => {
      state.token = null
    },
    setToken: (state, token) => {
      state.token = token
    },
    setShowVideoRecorder: (state, showVideoRecorder) => {
      state.showVideoRecorder = showVideoRecorder
    },
    setShowStartRecordingButton: (state, showStartRecordingButton) => {
      state.showStartRecordingButton = showStartRecordingButton
    },
    setShowSuccessVideoRecorded: (state, showSuccessVideoRecorded) => {
      state.showSuccessVideoRecorded = showSuccessVideoRecorded
    },
    setShowPlayer: (state, showPlayer) => {
      state.showPlayer = showPlayer
    },
    setShowButtonDelete: (state, showButtonDelete) => {
      state.showButtonDelete = showButtonDelete
    },
    setShowButtonSave: (state, showButtonSave) => {
      state.showButtonSave = showButtonSave
    },
    setShowFinalizeButton: (state, showFinalizeButton) => {
      state.showFinalizeButton = showFinalizeButton
    },
    setShowSuccessVideoDeleted: (state, showSuccessVideoDeleted) => {
      state.showSuccessVideoDeleted = showSuccessVideoDeleted
    },
    setShowSuccessVideoSaved: (state, showSuccessVideoSaved) => {
      state.showSuccessVideoSaved = showSuccessVideoSaved
    },
    setIsRecording: (state, isRecording) => {
      state.isRecording = isRecording
    },
    setVideoOutput: (state, video) => {
      state.videoOutput.name = video.name
      state.videoOutput.href = video.href
    },
    setCounter: (state, counter) => {
      state.counter = counter
    },
    counterDecrement: state => {
      state.counter--
    },
    setCompletedSteps: (state, completedSteps) => {
      state.completedSteps = completedSteps
    },
    completedStepsIncrement: state => {
      state.completedSteps++
    },
    addVideo: (state, video) => {
      state.videos.push(video)
    },
    removeVideo: state => {
      state.videos.pop()
    },
    setPlayerOptions: (state, options) => {
      state.playerOptions.sources = []
      state.playerOptions.sources.push(options)
    },
    setPlayerSources: (state, sources) => {
      state.playerOptions.sources = sources
    },
    setAutoplay: state => {
      state.playerOptions.autoplay = true
    },
    addChunk: (state, chunk) => {
      state.chunks.push(chunk)
    },
    addBlob: (state, blob) => {
      state.blobArray.push(blob)
    },
    setCurrentBlob: (state, currentBlob) => {
      state.currentBlob = currentBlob
    },
    updateVideos: (state, videos) => {
      state.videos = videos
    },
    videoIdIncrease: state => {
      state.videoId++
    },
    setUserId: (state, id) => {
      state.userId = id
    }
  },
  actions: {
    register: (context, data) => {
      return axios
        .post('/register', {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password
        })
        .then(response => {
          context.commit('logout')
          return response
        })
        .catch(error => {
          throw error
        })
    },
    login: (context, credentials) => {
      return axios
        .post('/login', {
          username: credentials.email,
          password: credentials.password
        })
        .then(response => {
          const token = response.data.access_token
          window.localStorage.setItem('access_token', token)
          context.commit('setToken', token)
          return response
        })
        .catch(error => {
          throw error
        })
    },
    getUser: context => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + context.state.token
      return axios
        .get('/user')
        .then(response => {
          context.commit('setUserId', response.data)
          return response
        })
        .catch(error => {
          throw error
        })
    },
    destroyTokens: (context, token) => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      return axios
        .post('/logout')
        .then(response => {
          window.localStorage.removeItem('access_token')
          return response
        })
        .catch(error => {
          window.localStorage.removeItem('access_token')
          context.commit('logout')
          throw error
        })
    }
  }
})
