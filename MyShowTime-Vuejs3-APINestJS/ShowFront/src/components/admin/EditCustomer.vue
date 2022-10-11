<template>
  <div>
    
    <div class="col-md-12 form-wrapper">
      <h2>Edit Customer</h2>
      <div v-if="errorConflict">
        <p style="color: red">Error : email already exists</p>
      </div>
      <div v-if="errorCredentials">
        <p style="color: red">Error : please verify your credentials</p>
      </div>
       <div v-if="message">
        <p style="color: rgb(17, 153, 46)">{{ message }}</p>
      </div>
      <form id="create-post-form" @submit.prevent="editCustomer">
        <div class="form-group col-md-12">
          <label for="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            v-model="customer.first_name"
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
            v-model="customer.last_name"
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
            v-model="customer.email"
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
            v-model="customer.phone"
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
            v-model="customer.address"
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
            v-model="customer.password"
            name="password"
            class="form-control"
            placeholder="Enter Password"
          />
          
        </div>
         <div class="form-group col-md-12">
          <label for="status">Is admin</label>
          <input
            type="number"
            id="status"
            v-model="customer.status"
            name="status"
            class="form-control"
            placeholder="Enter Status"
          />
          </div>
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Update Customer</button>
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
     name: 'EditCustomer',

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
            router.push({ name: 'HomeAdmin' })
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
