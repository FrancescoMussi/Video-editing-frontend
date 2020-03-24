<template>
  <div>
    <overlay ref="overlay"></overlay>
    <navigation></navigation>
    <div class="columns adminArea">
      <aside class="column is-2 aside hero is-fullheight">
        <div class="compose has-text-centered">
          <custom-button
            name="sendVideos"
            :show-button="true"
            css-class="is-danger"
            text=" Create video"
            icon="ondemand_video"
            @click.native="sendVideos"
          ></custom-button>
          <a
            class="button is-primary is-fullwidth downloadButton"
            v-if="showDownloadButton"
            target="_blank"
            href="http://localhost:8000/videos/output.mp4"
          >
            <i class="material-icons" style="margin-right: 3px"
              >open_in_browser</i
            >
            Open video
          </a>
        </div>
      </aside>

      <div
        class="column is-6 messages is-fullheight"
        style="padding-left: 50px"
      >
        <div v-if="showDraggable">
          <div class="textContainer">
            <h1 class="title">Admin Area</h1>
            <h3 class="subtitle">
              You can drag the video to re-order them.
              <br />Press the button on the left to create the final video
            </h3>
          </div>
          <draggable ref="draggable" v-model="videosScoped" @end="videoDragged">
            <transition-group name="list-complete">
              <div
                class="card list-complete-item"
                v-for="video in videosScoped"
                :key="video.id"
              >
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-64x64">
                        <img :src="video.thumb" alt="Placeholder image" />
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">Video #{{ video.id }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
        <div v-show="showSuccessMessage">
          <div class="textContainer">
            <h1 class="title titleSuccess">Video successfully created!</h1>
            <h3 class="subtitle subtitleSuccess">
              Click the button in the left panel to open the video in a new tab.
              <br />You can download the video it directly from there.
            </h3>
            <success-message
              style="margin-top: -70px"
              ref="successMessage"
            ></success-message>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import axios from 'axios'
import CustomButton from '@/components/CustomButton'
import SuccessMessage from '@/components/Success'
import Overlay from '@/components/Overlay'
import Navigation from '@/components/Navigation'
export default {
  name: 'AdminArea',
  components: {
    draggable,
    CustomButton,
    SuccessMessage,
    Overlay,
    Navigation
  },
  data() {
    return {
      showDownloadButton: false,
      showDraggable: true,
      showSuccessMessage: false,
      successTitle: 'The video has been successfully created!',
      successSubtitle:
        'Click the download button on the left to download the video',
      axiosValueTest: '',
      videosScoped: []
    }
  },
  computed: {
    videos() {
      return this.$store.state.videos
    }
  },
  created() {
    this.videosScoped = this.videos.map(item => ({ ...item }))
  },
  methods: {
    videoDragged() {
      this.$store.commit('updateVideos', this.videosScoped)
    },
    sendVideos() {
      this.$refs.overlay.showOverlay()
      this.sendVideosRequest()
    },
    // Send videos to API and get final edited video
    async sendVideosRequest() {
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
      const postData = {
        videos: JSON.stringify(this.videos)
      }
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + this.$store.state.token
      const response = await axios.post(
        'http://localhost:8000/api/concat_videos',
        postData,
        axiosConfig
      )
      console.log({ response })
      this.showSuccessMessages()
      this.$refs.overlay.hideOverlay()
    },
    showSuccessMessages() {
      this.showDownloadButton = true
      this.showDraggable = false
      this.showSuccessMessage = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';
.adminArea {
  margin-top: 3.5625rem;

  .card-content {
    padding-left: 1rem;
    padding-top: 0.9rem;
  }
  .textContainer {
    margin: 1.875rem 0;
  }
  .titleSuccess {
    color: $app-red;
  }
  .subtitleSuccess {
    color: $app-red;
  }
  .downloadButton {
    margin-top: 0.3125rem;
  }

  .aside {
    display: block;
    background-color: #f9f9f9;
    border-right: 1px solid #dedede;

    .compose {
      height: 5.9rem;
      margin: 0 -0.625rem;
      padding: 1.56rem 1.875rem;
    }
    .compose .button {
      color: #f6f7f7;
    }
    .compose .button .compose {
      font-size: 0.875rem;
      font-weight: 700;
    }
  }

  // Drag items Animation
  .list-complete-item {
    margin-top: 0.5rem;
    border: 1px solid lightgrey;
    transition: all 0.5s;
  }
  .list-complete-item:hover {
    cursor: move;
  }
  .list-complete-enter,
  .list-complete-leave-active {
    opacity: 0;
  }
}
</style>
