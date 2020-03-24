<template>
  <div class="loginContainer">
    <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-grey">CameraApp</h3>
            <p class="subtitle has-text-grey">Please login to proceed.</p>
            <div class="box">
              <figure class="avatar">
                <img src="../assets/img/logo.png" />
              </figure>
              <form @submit.prevent="loginSubmit">
                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      type="email"
                      placeholder="Your Email"
                      autofocus
                      v-model="email"
                      @blur="$v.email.$touch()"
                    />
                    <div
                      class="invalid-feedback"
                      v-if="!$v.email.required && $v.email.$dirty"
                    >
                      The email is required
                    </div>
                    <div
                      class="invalid-feedback"
                      v-if="!$v.email.email && $v.email.$dirty"
                    >
                      Please enter a valid email
                    </div>
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      type="password"
                      placeholder="Your Password"
                      v-model="password"
                      @blur="$v.password.$touch()"
                    />
                    <div
                      class="invalid-feedback"
                      v-if="!$v.password.required && $v.password.$dirty"
                    >
                      The password is required
                    </div>
                  </div>
                </div>
                <div class="invalid-feedback" v-if="invalidCredentials">
                  Invalid credentails. Please insert correct email and password
                  and try again.
                </div>
                <button
                  type="submit"
                  class="button is-block is-primary is-large is-fullwidth"
                  :disabled="buttonIsDisabled"
                >
                  <v-icon
                    name="spinner"
                    class="iconSpinner mr5"
                    pulse
                    v-if="buttonIsDisabled"
                  ></v-icon>
                  Login
                </button>
              </form>
            </div>
            <p class="has-text-grey">
              <a @click="goToRegisterPage">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import Icon from 'vue-awesome/components/Icon'
import miniToastr from 'mini-toastr'
miniToastr.init()
miniToastr.setIcon('success', 'i', { class: 'fa fa-check-circle' })
export default {
  name: 'Login',
  components: {
    'v-icon': Icon
  },
  data() {
    return {
      email: '',
      password: '',
      buttonIsDisabled: false,
      invalidCredentials: false
    }
  },
  computed: {
    registerSuccess() {
      return this.$route.params.registerSuccess ? true : false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  created() {
    if (this.registerSuccess) {
      miniToastr.success('You are succesfully registered.', '', 3000)
    }
  },
  methods: {
    goToRegisterPage() {
      this.$router.push({ name: 'register' })
    },
    loginSubmit() {
      // Check validation
      if (this.$v.$invalid) {
        this.$v.email.$touch()
        this.$v.password.$touch()
      } else {
        this.buttonIsDisabled = true
        const credentials = {
          email: this.email,
          password: this.password
        }
        // Handle login API in the store
        this.$store
          .dispatch('login', credentials)
          .then(response => {
            console.log({ response })
            this.buttonIsDisabled = false
            this.invalidCredentials = false
            this.$router.push({ name: 'home' })
            this.getUser()
          })
          .catch(error => {
            console.log({ error })
            this.invalidCredentials = true
            this.buttonIsDisabled = false
            miniToastr.error('Something went wrong.', '', 3000)
          })
      }
    },
    getUser() {
      this.$store
        .dispatch('getUser')
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

<style lang="scss" scoped></style>
