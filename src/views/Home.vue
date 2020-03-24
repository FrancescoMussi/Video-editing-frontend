<template>
  <div class="demo-2">
    <navigation></navigation>
    <div id="home-container" class="home-container">
      <canvas id="video-canvas"></canvas>

      <div class="columns body-columns main-title">
        <div class="column is-half is-offset-one-quarter">
          <transition name="fade">
            <div class="card card-custom" v-show="showCard">
              <div class="header">
                <div class="media">
                  <div class="media-left">
                    <figure class="image" style="padding-top: 1rem;">
                      <i class="material-icons loveIcon has-text-danger"
                        >favorite</i
                      >
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="slogan">15 seconds. One video. A lot of love.</p>
                    <p class="slogan-subtitle is-6" style="color: black">
                      Click the record button and register your 15 seconds
                      video!
                      <br />You can then save it or delete it and record again.
                    </p>
                  </div>
                </div>
              </div>

              <div class="card-image">
                <video-recorder
                  ref="videoRecorder"
                  v-show="showVideoRecorder"
                ></video-recorder>
                <success-message
                  v-if="showSuccessVideoRecorded"
                ></success-message>
                <success-message
                  v-if="showSuccessVideoDeleted"
                  :title="videoDeletedTitle"
                ></success-message>
                <success-message
                  v-if="showSuccessVideoSaved"
                  :title="videoSavedTitle"
                  :subtitle="videoSavedSubtitle"
                ></success-message>
                <video-player
                  class="video-player-box vjs-big-play-centered"
                  style="width: 100%"
                  ref="videoPlayer"
                  v-if="showPlayer"
                  :options="playerOptions"
                  :playsinline="true"
                ></video-player>
              </div>

              <div class="card-content" style="padding-bottom: 0.5rem">
                <div class="level is-mobile">
                  <div class="level-left">
                    <custom-button
                      name="videoRecord"
                      :show-button="showStartRecordingButton"
                      css-class="is-danger"
                      :text="buttonRecordVideoText"
                      :isDisabled="isRecording"
                      icon="videocam"
                      @click.native="callRecordMethod"
                    ></custom-button>

                    <custom-button
                      name="videoDelete"
                      :show-button="showButtonDelete"
                      css-class="is-danger"
                      text="Delete"
                      :isDisabled="false"
                      icon="delete"
                      @click.native="videoDelete"
                    ></custom-button>

                    <custom-button
                      name="videoSave"
                      :show-button="showButtonSave"
                      css-class="is-primary"
                      text="Save"
                      :isDisabled="false"
                      icon="check"
                      @click.native="videoSave"
                    ></custom-button>

                    <button
                      class="button is-primary"
                      @click="openModal"
                      v-if="showFinalizeButton"
                    >
                      <i class="material-icons" style="margin-right: 0.125rem;"
                        >check_circle</i
                      >
                      Finalize
                    </button>
                  </div>
                </div>

                <div class="content">
                  <div
                    class="radialContainer is-pulled-right"
                    v-if="showVideoRecorder"
                  >
                    <radial-progress-bar
                      :diameter="70"
                      :completed-steps="completedSteps"
                      :total-steps="15"
                      :strokeWidth="7"
                      startColor="#FF3860"
                      stopColor="#ffafbf"
                    >
                      <p class="counter">{{ counter }}</p>
                    </radial-progress-bar>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <transition name="modal">
            <div
              class="modal"
              :class="{ 'is-active': isModalActive }"
              v-show="showModal"
            >
              <div class="modal-background"></div>
              <div class="modal-card">
                <header class="modal-card-head">
                  <p class="modal-card-title">Admin area</p>
                  <button
                    class="delete"
                    aria-label="close"
                    @click="isModalActive = false"
                  ></button>
                </header>
                <section class="modal-card-body">
                  <input
                    class="input"
                    type="password"
                    v-model="adminPassword"
                    placeholder="Password"
                  />
                </section>
                <footer class="modal-card-foot">
                  <button class="button is-success" @click="goToAdminDashboard">
                    Enter
                  </button>
                  <button class="button" @click="isModalActive = false">
                    Cancel
                  </button>
                </footer>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <video
        ref="hiddenVideo"
        id="videoForThumb"
        controls
        width="640"
        height="480"
        muted="true"
        style="display: none"
      ></video>
      <canvas id="canvas" style="display: none"></canvas>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { videoPlayer } from 'vue-video-player'
import axios from 'axios'
import RadialProgressBar from 'vue-radial-progress'
import SuccessMessage from '@/components/Success'
import VideoRecorder from '@/components/VideoRecorder'
import CustomButton from '@/components/CustomButton'
import Navigation from '@/components/Navigation'
import makeCanvas from '@/assets/js/demo.js'
import 'video.js/dist/video-js.css'

export default {
  name: 'app',
  components: {
    videoPlayer,
    RadialProgressBar,
    SuccessMessage,
    VideoRecorder,
    CustomButton,
    Navigation
  },
  data() {
    return {
      videoSavedTitle: '',
      videoSavedSubtitle: '',
      videoDeletedTitle: '',
      videoDataTemp: {},
      isModalActive: false,
      base64Array: [],
      adminPassword: '',
      showCard: false,
      showModal: false,
      options: {
        video: {},
        autoplay: false,
        contextmenu: [
          {
            text: 'GitHub',
            link: 'https://github.com/MoePlayer/vue-dplayer'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState([
      'isRecording',
      'showButtonDelete',
      'showButtonSave',
      'showStartRecordingButton',
      'showFinalizeButton',
      'showSuccessVideoRecorded',
      'showSuccessVideoDeleted',
      'showSuccessVideoSaved',
      'showVideoRecorder',
      'showPlayer',
      'counter',
      'completedSteps',
      'videos',
      'videoOutput',
      'playerOptions',
      'chunks',
      'blobArray',
      'currentBlob',
      'videoId'
    ]),
    buttonRecordVideoText() {
      if (!this.isRecording) {
        return 'Record Video'
      } else {
        return 'Recording...'
      }
    }
  },
  mounted() {
    this.initMessages()
    makeCanvas()
    setTimeout(() => {
      this.showCard = true
    }, 1000)
  },
  methods: {
    ...mapMutations([
      'removeVideo',
      'setShowSuccessVideoDeleted',
      'setShowFinalizeButton',
      'setShowSuccessVideoSaved',
      'setShowVideoRecorder',
      'addVideo',
      'videoIdIncrease',
      'setShowPlayer',
      'setIsRecording',
      'setShowButtonDelete',
      'setShowButtonSave',
      'setCounter',
      'setCompletedSteps',
      'setShowStartRecordingButton'
    ]),
    initMessages() {
      this.videoDeletedTitle = 'Video Deleted'
      this.videoSavedTitle = 'Video Saved!'
      this.videoSavedSubtitle = 'Thank you for your participation!'
    },
    callRecordMethod() {
      this.$refs.videoRecorder.startRecording()
    },
    videoDelete() {
      this.setShowSuccessVideoDeleted(true)
      this.removeVideo()
      this.videoReset()

      setTimeout(() => {
        this.setShowSuccessVideoDeleted(false)
        this.setShowFinalizeButton(true)
        this.showRecorder()
      }, 1000)
    },
    videoSave() {
      this.$refs.hiddenVideo.src = this.playerOptions.sources[0].src
      let videoObject = {}
      videoObject.blob = this.currentBlob
      videoObject.href = URL.createObjectURL(this.currentBlob)

      let reader = new FileReader()
      reader.readAsDataURL(this.currentBlob)
      reader.onloadend = () => {
        videoObject.base64 = reader.result
        this.setShowSuccessVideoSaved(true)
        this.setShowVideoRecorder(false)
        this.videoReset()

        setTimeout(() => {
          this.setShowSuccessVideoSaved(false)
          this.setShowFinalizeButton(true)
          videoObject.thumb = this.getThumbnail()
          videoObject.id = this.videoId
          this.addVideo(videoObject)
          this.videoIdIncrease()
          this.showRecorder()
        }, 4000)
      }
    },
    videoReset() {
      this.setShowPlayer(false)
      this.setIsRecording(false)
      this.setShowButtonDelete(false)
      this.setShowButtonSave(false)
      this.$refs.videoRecorder.initVideo()
      this.setCounter(15)
      this.setCompletedSteps(0)
    },
    showRecorder() {
      this.setShowVideoRecorder(true)
      this.setShowStartRecordingButton(true)
    },
    getThumbnail() {
      let video = this.$refs.hiddenVideo
      var canvas = document.getElementById('canvas')
      canvas.width = 640
      canvas.height = 480
      canvas.getContext('2d').drawImage(video, 0, 0, video.width, video.height)
      return canvas.toDataURL()
    },
    openModal() {
      this.isModalActive = !this.isModalActive
      setTimeout(() => {
        this.showModal = true
      }, 100)
    },
    async goToAdminDashboard() {
      const postData = {
        password: this.adminPassword,
        user_id: this.$store.state.userId
      }
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + this.$store.state.token
      const response = await axios.post(
        this.$store.state.baseUrl + '/api/admin_access',
        postData
      )
      console.log({ response })
      if (response.data === 'success') {
        this.$router.push('/adminArea')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.home-container {
  position: fixed;
  width: 100%;
  background: #333;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  z-index: -991;
  background-image: url('../assets/img/bg.jpg');

  .body-columns {
    margin-top: 10vh;
  }
  .main-title {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    margin: 0;
    padding: 0;
    color: #f9f1e9;
    text-align: center;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
  }
  .loveIcon {
    font-size: 2.7rem !important;
  }
  .radialContainer {
    margin: auto;
    width: 15%;
    margin-top: -5rem;
  }
  .card-custom {
    background-color: rgba(255, 255, 255, 0.5) !important;
    border: 1px solid #888;
  }
  #video {
    background-color: #000000;
  }
  .slogan {
    font-size: 1.8rem;
    line-height: 1.125;
    padding-top: 0.3rem;
    margin-bottom: 0.1rem !important;
    font-weight: 300;
    color: $app-red;
  }
  .slogan-subtitle {
    color: #333 !important;
    font-size: 1.1rem;
    line-height: 1.2rem;
  }

  .counter {
    font-size: 1.9rem;
    font-weight: 500;
    color: $app-red !important;
  }

  .footer {
    margin-top: 10vh;
    padding: 2rem 1.5rem;
  }
}

// Animation
.fade-enter-active {
  transition: opacity 2s ease-in-out;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter {
  opacity: 0;
}
.modal-enter-active {
  transition: opacity 0.7s ease-in-out;
}
.modal-enter-to {
  opacity: 1;
}
.modal-enter {
  opacity: 0;
}
</style>
