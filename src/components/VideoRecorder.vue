<template>
  <div>
    <video
      ref="video"
      id="video"
      width="640"
      height="480"
      autoplay
      muted="true"
    ></video>
  </div>
</template>

<script>
export default {
  name: 'VideoRecorder',
  data() {
    return {
      stream: {},
      video: {},
      recorder: {}
    }
  },
  computed: {
    isRecording() {
      return this.$store.state.isRecording
    },
    counter() {
      return this.$store.state.counter
    },
    videoOutput() {
      return this.$store.state.videoOutput
    },
    videos() {
      return this.$store.state.videos
    }
  },
  mounted() {
    this.initVideo()
  },
  methods: {
    initVideo() {
      this.video = this.$refs.video
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: {
              width: 1920,
              height: 1080,
              minFrameRate: 30
            },
            audio: {
              echoCancellation: true,
              autoGainControl: false,
              noiseCancellation: true
            }
          })
          .then(stream => {
            this.stream = stream
            this.video.srcObject = stream
            this.video.play()
          })
      }
    },
    startRecording() {
      // Check if it is already recording - Avoiding calling function multiple times
      if (!this.isRecording) {
        // Init new MediaRecorder and starting it
        this.recorder = {}
        this.recorder = new MediaRecorder(this.stream, {
          mimeType: 'video/webm;codecs=h264'
        })
        this.recorder.start()
        this.$store.commit('setIsRecording', true)

        // Start visual counter
        let counterInterval = setInterval(() => {
          this.$store.commit('counterDecrement')
          this.$store.commit('completedStepsIncrement')
        }, 1000)

        // Stop recording after fixed amount of seconds
        setTimeout(() => {
          this.stopRecording()
          this.$store.commit('setIsRecording', false)
          clearInterval(counterInterval)
        }, this.counter * 1000)
      }
    },
    stopRecording() {
      this.$store.commit('setShowVideoRecorder', false)
      this.$store.commit('setShowFinalizeButton', false)
      this.$store.commit('setShowSuccessVideoRecorded', true)
      this.recorder.ondataavailable = e => {
        this.$store.commit('addChunk', e.data)
        this.$store.commit('setCurrentBlob', e.data)

        // Hide Record button
        this.$store.commit('setShowStartRecordingButton', false)

        let videoSource = {
          type: 'video/webm',
          src: URL.createObjectURL(e.data)
        }
        this.$store.commit('setPlayerOptions', videoSource)

        setTimeout(() => {
          // Show Player
          this.$store.commit('setShowPlayer', true)
          this.$store.commit('setShowButtonDelete', true)
          this.$store.commit('setShowButtonSave', true)
          this.$store.commit('setShowSuccessVideoRecorded', false)
        }, 1000)
      }
      this.recorder.stop()
    }
  }
}
</script>

<style scoped lang="scss">
#video {
  background-color: #000000;
}
</style>
