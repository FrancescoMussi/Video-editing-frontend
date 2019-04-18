<template>
  <div id="overlay" v-if="displayOverlay">
    <div class="spinnerContainer">
      <self-building-square-spinner
        :animation-duration="6000"
        :size="40"
        color="#ff1d5e"
        class="spinner"
      />
      <p class="spinnerText">{{ spinnerText }}...</p>
      <p class="pleaseWait">
        Please wait. The process may take several minutes.
      </p>
    </div>
  </div>
</template>

<script>
import { SelfBuildingSquareSpinner } from 'epic-spinners'
export default {
  name: 'Overlay',
  components: { SelfBuildingSquareSpinner },
  props: {},
  data() {
    return {
      spinnerTextArray: [
        'Importing videos',
        'Decoding videos',
        'Decoding audio',
        'Editing videos',
        'Finalizing output'
      ],
      spinnerText: '',
      displayOverlay: false
    }
  },
  mounted() {},
  methods: {
    showOverlay() {
      this.displayOverlay = true
      let index = 0
      this.spinnerText = this.spinnerTextArray[index]
      let interval = setInterval(() => {
        index++
        this.spinnerText = this.spinnerTextArray[index]
        if (index === 4) {
          clearInterval(interval)
        }
      }, 7000)
    },
    hideOverlay() {
      this.displayOverlay = false
    }
  }
}
</script>

<style scoped lang="scss">
#overlay {
  position: fixed; // Sit on top of the page content
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(245, 245, 245, 0.75);
  z-index: 2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  .spinnerContainer {
    margin: auto;
    width: 50%;
    z-index: 99998;

    .spinner {
      width: 20%;
      margin: auto;
    }
    .spinnerText {
      font-size: 2rem;
      color: #999;
    }

    .pleaseWait {
      color: #888;
    }
  }
}
</style>
