<template>
  <div class="loginContainer">
    <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-grey">CameraApp</h3>
            <p class="subtitle has-text-grey">Register with us!</p>
            <div class="box">
              <figure class="avatar">
                <img src="../assets/img/logo.png" />
              </figure>
              <form @submit.prevent="registerSubmit">
                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      :class="{ 'is-invalid': $v.firstName.$error }"
                      type="text"
                      placeholder="Your First Name"
                      v-model="firstName"
                      @blur="$v.firstName.$touch()"
                    />
                    <div
                      class="invalid-feedback"
                      v-if="!$v.firstName.required && $v.firstName.$dirty"
                    >
                      The First Name is required
                    </div>
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      :class="{ 'is-invalid': $v.lastName.$error }"
                      type="text"
                      placeholder="Your Last Name"
                      v-model="lastName"
                      @blur="$v.lastName.$touch()"
                    />
                    <div
                      class="invalid-feedback"
                      v-if="!$v.lastName.required && $v.lastName.$dirty"
                    >
                      The Last Name is required
                    </div>
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      type="email"
                      placeholder="Your Email"
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
                    <div
                      class="invalid-feedback"
                      v-if="!$v.password.minLength && $v.password.$dirty"
                    >
                      The password has to contain min. 6 chars
                    </div>
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      type="password"
                      placeholder="Password Confirmation"
                      v-model="passwordConfirmation"
                      @blur="$v.passwordConfirmation.$touch()"
                    />
                    <div
                      class="invalid-feedback"
                      v-if="
                        !$v.passwordConfirmation.required &&
                          $v.passwordConfirmation.$dirty
                      "
                    >
                      The password confirmation is required
                    </div>
                    <div
                      class="invalid-feedback"
                      v-if="
                        !$v.passwordConfirmation.sameAsPassword &&
                          $v.passwordConfirmation.$dirty
                      "
                    >
                      The password confirmation doesn't match
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  class="button is-block is-primary is-large is-fullwidth"
                  :disabled="buttonIsDisabled"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import miniToastr from 'mini-toastr'
miniToastr.init()
miniToastr.setIcon('success', 'i', { class: 'fa fa-check-circle' })
export default {
  name: 'Register',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      buttonIsDisabled: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    firstName: {
      required
    },
    lastName: {
      required
    },
    password: {
      required,
      minLength: minLength(6)
    },
    passwordConfirmation: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    registerSubmit() {
      if (this.$v.$invalid) {
        this.$v.email.$touch()
        this.$v.password.$touch()
        this.$v.firstName.$touch()
        this.$v.lastName.$touch()
        this.$v.passwordConfirmation.$touch()
      } else {
        this.buttonIsDisabled = true
        const data = {
          name: this.name,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        }
        this.$store
          .dispatch('register', data)
          .then(response => {
            console.log({ response })
            this.$router.push({
              name: 'login',
              params: { registerSuccess: true }
            })
            this.buttonIsDisabled = false
          })
          .catch(error => {
            console.error('error with register api')
            console.log({ error })
            this.buttonIsDisabled = false
            miniToastr.error('Something went wrong.', '', 3000)
          })
      }
    }
  }
}
</script>

<style></style>
