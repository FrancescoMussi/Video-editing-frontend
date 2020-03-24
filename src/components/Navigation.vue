<template>
  <transition name="fade">
    <div
      class="navbar is-inline-flex is-fixed-top"
      style="background-color: rgba(255,255,255,0.6)"
      v-if="showHeader"
    >
      <div class="navbar-brand" @click="goToHome">
        <a class="navbar-item">
          <p class="logoText">
            <span class="rezervex">REZERVEX</span>
            <span class="video">VIDEO</span>
          </p>
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-item"></div>
      </div>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link"><i class="material-icons">person_outline</i></a>
        <div class="navbar-dropdown">
          <div class="navbar-item" @click="logout">Logout</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      showHeader: false
    }
  },
  created() {
    setTimeout(() => {
      this.showHeader = true
    }, 100)
  },
  methods: {
    goToHome() {
      this.$router.push({ name: 'home' })
    },
    logout() {
      let token = this.$store.state.token
      // Remove token in the store and redirect to login page
      this.$store.commit('logout')
      this.$router.push({ name: 'login' })
      // destroy tokens in database
      this.$store
        .dispatch('destroyTokens', token)
        .then(response => {
          console.log({ response })
        })
        .catch(error => {
          console.log({ error })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';
.navbar {
  .navbar-link,
  .navbar-link:hover {
    background-color: transparent;
  }
  .navbar-item:hover {
    cursor: pointer;
  }
  .logoText {
    font-family: 'Jura', sans-serif;
    font-size: 1.7rem;

    .rezervex {
      font-weight: 700;
    }

    .video {
      font-weight: 600;
      color: $app-red;
    }
  }
}
// Fade animation
.fade-enter-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter {
  opacity: 0;
}
</style>
