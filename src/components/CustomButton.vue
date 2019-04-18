<template>
  <div>
    <div class="level-item has-text-centered">
      <div>
        <a
          class="button"
          :class="cssClass"
          v-if="showButton"
          :disabled="isDisabled"
        >
          <i class="material-icons">{{ icon }}</i>
          <span class="buttonText">{{ text }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    icon: String,
    showButton: Boolean,
    cssClass: String,
    text: String,
    isDisabled: Boolean
  },
  mounted() {}
}
</script>
