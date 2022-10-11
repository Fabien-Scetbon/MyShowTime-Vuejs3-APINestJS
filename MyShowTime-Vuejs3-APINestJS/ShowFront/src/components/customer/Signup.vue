<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Create Customer</h2>
      <div v-if="errorConflict">
        <p style="color: red">Error : email already exists</p>
      </div>
      <div v-if="errorCredentials">
        <p style="color: red">Error : please verify your credentials</p>
      </div>
      <div v-if="message">
        <p style="color: rgb(17, 153, 46)">{{ message }}</p>
      </div>
      <div v-if="alert">
        <p style="color: red">{{ alert }}</p>
      </div>
      <form id="create-post-form" @submit.prevent="createCustomer">
        <div class="form-group col-md-12">
          <label for="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            v-model="first_name"
            name="title"
            class="form-control"
            placeholder="Enter firstname"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            v-model="last_name"
            name="title"
            class="form-control"
            placeholder="Enter Last name"
          />
        </div>
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
          <label for="phone_number">Phone</label>
          <input
            type="text"
            id="phone_number"
            v-model="phone"
            name="title"
            class="form-control"
            placeholder="Enter Phone number"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="address">Address</label>
          <input
            type="text"
            id="address"
            v-model="address"
            name="title"
            class="form-control"
            placeholder="Enter Address"
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
        <div class="form-group col-md-12">
          <label for="password">Password confirm</label>
          <input
            type="text"
            id="password_confirm"
            v-model="password_confirm"
            name="password_confirm"
            class="form-control"
            placeholder="Password confirm"
          />
        </div>

        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Create Customer</button>
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
  name: 'Signup',

  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      password_confirm: '',
      errorConflict: false,
      errorCredentials: false,
      message: '',
      alert: '',
    }
  },
  methods: {
    createCustomer() {
      if (this.password != this.password_confirm) {
        // console.log("danger paswords")
        this.alert = "Passwords don't match !"
        return
      }

      let customerData = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        password: this.password,
        status: 0,
      }
      this.__submitToServer(customerData)
    },
    __submitToServer(data) {
      axios
        .post(`${server.baseURL}/customer/createcustomer`, data)
        .then((data) => {
          // console.log(data.data.message)
          this.alert = ''
          this.message = data.data.message
          this.errorCredentials = false
          this.errorConflict = false
          setTimeout(() => {
            router.push({ name: 'Signin' })
          }, 2500)
        })
        .catch((error) => {
          if (error.message.includes('409')) {
            this.errorConflict = true
            this.errorCredentials = false
          } else {
            this.errorCredentials = true
            this.errorConflict = false
          }
        })
    },
  },
}
</script>
