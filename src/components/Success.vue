<template>
  <div>
    <div class="columns is-mobile is-centered">
      <div class="column is-two-quarter success-container">
        <h2 class="success-title has-text-centered">{{ title }}</h2>
        <p class="success-subtitle has-text-centered" v-html="subtitle"></p>
      </div>
    </div>
    <div class="columns is-mobile is-centered">
      <div class="column is-one-quarter">
        <div class="sa">
          <div class="sa-success">
            <div class="sa-success-tip"></div>
            <div class="sa-success-long"></div>
            <div class="sa-success-placeholder"></div>
            <div class="sa-success-fix"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuccessMessage',
  props: ['title', 'subtitle'],
  computed: {
    showSuccessVideoRecorded() {
      return this.$store.state.showSuccessVideoRecorded
    },
    showSuccessVideoRecordedInfo() {
      return this.$store.state.showSuccessVideoRecorded
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';
.success-container {
  margin-top: 1.25rem;
  text-align: left;

  .success-title {
    font-size: 2rem;
    color: $app-red !important;
    justify-content: left !important;
  }
  .success-subtitle {
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
  }
}

// ANIMATION
.sa {
  width: 8.75rem;
  height: 8.75rem;
  padding: 1.625rem;
  background-color: transparent;
  // margin: 0 auto;
  &-success {
    border-radius: 50%;
    border: 0.25rem solid $app-red;
    box-sizing: content-box;
    height: 5rem;
    padding: 0;
    position: relative;
    background-color: transparent;
    width: 5rem;
    &:after,
    &:before {
      background: transparent;
      content: '';
      height: 7.5rem;
      position: absolute;
      transform: rotate(45deg);
      width: 3.75rem;
    }
    &:before {
      border-radius: 2.5rem 0 0 2.5rem;
      width: 1.625rem;
      height: 5rem;
      top: -1.0625rem;
      left: 0.3125rem;
      transform-origin: 3.75rem 3.75rem;
      transform: rotate(-45deg);
    }
    &:after {
      border-radius: 0 7.5rem 7.5rem 0;
      left: 1.875rem;
      top: -0.6875rem;
      transform-origin: 0 3.75rem;
      transform: rotate(-45deg);
      animation: rotatePlaceholder 4.25s ease-in;
    }
    &-placeholder {
      border-radius: 50%;
      border: 0.25rem solid rgba(255, 56, 96, 0.25);
      box-sizing: content-box;
      height: 5rem;
      left: -0.25rem;
      position: absolute;
      top: -0.25rem;
      width: 5rem;
      z-index: 2;
    }
    &-fix {
      background-color: transparent;
      height: 5.625rem;
      left: 1.75rem;
      position: absolute;
      top: 0.5rem;
      transform: rotate(-45deg);
      width: 0.3125rem;
      z-index: 1;
    }
    &-tip,
    &-long {
      background-color: $app-red;
      border-radius: 0.125rem;
      height: 0.3125rem;
      position: absolute;
      z-index: 2;
    }
    &-tip {
      left: 0.875rem;
      top: 2.875rem;
      transform: rotate(45deg);
      width: 1.563rem;
      animation: animateSuccessTip 0.75s;
    }
    &-long {
      right: 0.5rem;
      top: 2.375rem;
      transform: rotate(-45deg);
      width: 2.9rem;
      animation: animateSuccessLong 0.75s;
    }
  }
}
@keyframes animateSuccessTip {
  0%,
  54% {
    width: 0;
    left: 0.0625rem;
    top: 1.1875rem;
  }
  70% {
    width: 3.125rem;
    left: -0.5rem;
    top: 2.3125rem;
  }
  84% {
    width: 1.0625rem;
    left: 1.3125rem;
    top: 3rem;
  }
  100% {
    width: 1.563rem;
    left: 0.875rem;
    top: 2.8125rem;
  }
}
@keyframes animateSuccessLong {
  0%,
  65% {
    width: 0;
    right: 2.875rem;
    top: 3.375rem;
  }
  84% {
    width: 3.4375rem;
    right: 0;
    top: 2.1875rem;
  }
  100% {
    width: 2.9rem;
    right: 0.5rem;
    top: 2.375rem;
  }
}
@keyframes rotatePlaceholder {
  0%,
  5% {
    transform: rotate(-45deg);
  }
  100%,
  12% {
    transform: rotate(-405deg);
  }
}
</style>
