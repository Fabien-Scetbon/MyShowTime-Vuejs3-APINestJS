<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Edit my profile</h2>
      <div v-if="errorConflict">
        <p style="color: red">Error : email already exists</p>
      </div>
      <div v-if="errorCredentials">
        <p style="color: red">Error : please verify your credentials</p>
      </div>
       <div v-if="message">
        <p style="color: rgb(17, 153, 46)">{{message}}</p>
      </div>

      <form id="create-post-form" @submit.prevent="editCustomer">
        <div class="form-group col-md-12">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            v-model="customer.email"
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
            v-model="customer.password"
            name="password"
            class="form-control"
            placeholder="Enter Password"
          />
        </div>

        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Edit my profile</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { server } from '../../helper'
import axios from 'axios'
import router from '../../router'
export default {
      name: "UpdateProfile",

  data() {
    return {
      id: 0,
      customer: {},
      errorConflict: false,
      errorCredentials: false,
      message:'',
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getCustomer()
  },
  methods: {
    editCustomer() {
      let customerData = {
        first_name: this.customer.first_name,
        last_name: this.customer.last_name,
        email: this.customer.email,
        phone: this.customer.phone,
        address: this.customer.address,
        password: this.customer.password,
        status: this.customer.status,
      }
      axios
        .put(
          `${server.baseURL}/customer/updatecustomer?customerID=${this.id}`,
          customerData
        )
        .then((data) => {
          console.log(data.data.message)
          this.message = data.data.message
          this.errorCredentials = false
          this.errorConflict = false
          setTimeout(() => {
            router.push({ name: 'HomeUser' })
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
    getCustomer() {
      axios
        .get(`${server.baseURL}/customer/customer/${this.id}`)
        .then((data) => (this.customer = data.data))
    },
  },
}
</script>
