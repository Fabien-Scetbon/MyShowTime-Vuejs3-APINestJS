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
            placeholder="Enter last name"
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
            placeholder="Enter phone number"
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
            placeholder="Enter address"
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
            placeholder="Enter password"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="status">Is admin</label>
          <input
            type="number"
            id="status"
            v-model="status"
            name="status"
            class="form-control"
            placeholder="Enter status"
          />
        </div>
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Create account</button>
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
     name: 'CreateCustomer',

  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      status: '',
      errorConflict: false,
      errorCredentials: false,
      message: '',
    }
  },
  methods: {
    createCustomer() {
      let customerData = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        password: this.password,
        status: this.status,
      }
      this.__submitToServer(customerData)
    },
    __submitToServer(data) {
      axios
        .post(`${server.baseURL}/customer/createcustomer`, data)
        .then((data) => {
          console.log(data.data.message)
          this.message = data.data.message
          this.errorCredentials = false
          this.errorConflict = false

          setTimeout(() => {
            router.push({ name: 'Home' })
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
