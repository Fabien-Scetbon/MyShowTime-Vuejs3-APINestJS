<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Sign in</h2>
      <div v-if="errored">
        <p style="color: red">Error : please verify your credentials</p>
      </div>
      <div v-if="message">
        <p style="color: rgb(17, 153, 46)">{{ message }}</p>
      </div>
      <form id="create-post-form" @submit.prevent="signinCustomer">
        <div class="form-group col-md-12"></div>
        <div class="form-group col-md-12">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            v-model="email"
            name="title"
            class="form-control"
            placeholder="Enter email"
          />
        </div>

        <div class="form-group col-md-12">
          <label for="password">Password</label>
          <input
            type="text"
            id="password"
            v-model="password"
            name="password"
            class="form-control"
            placeholder="Enter Password"
          />
        </div>

        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { server } from '../../helper'
import router from '../../router'
export default {
  name: 'Signin',

  data() {
    return {
      email: '',
      password: '',
      errored: false,
      message: '',
    }
  },
  methods: {
    signinCustomer() {
      let customerData = {
        email: this.email,
        password: this.password,
      }
      this.__submitToServer(customerData)
    },
    __submitToServer(data) {
      axios
        .post(`${server.baseURL}/customer/signin`, data)
        .then((data) => {
          // console.log(data)
          sessionStorage.setItem('userId', data.data.userId)
          // console.log(data.data.userId)
          console.log(sessionStorage.getItem('userId'))
          sessionStorage.setItem('status', data.data.status)
          // console.log(data.data.status)
          console.log(sessionStorage.getItem('status'))
          this.errored = false
          this.message = data.data.message

          setTimeout(() => {
            location.reload()
            router.push({ name: 'HomeUser' })
          }, 2500)
        })
        .catch((error) => (this.errored = true))
    },
  },
}
</script>
