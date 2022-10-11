<template>
  <div class="container-fluid">
    <div class="text-center">
      <router-link style="color: blue;  font-weight: bold" to="/createcustomer"
        >Create customer</router-link
      >
      |
      <router-link style="color: blue;  font-weight: bold" to="/createevent"
        >Create event</router-link
      >
      |
       <router-link style="color: blue;  font-weight: bold" to="/salereview"
        >Sale review</router-link
      >

      <h1>Customer List</h1>
      <p>{{ token }}</p>
      <p>Built with Nest.js, Vue.js, and MongoDB</p>
      <div v-if="message">
        <p style="color: rgb(17, 153, 46)">{{ message }}</p>
      </div>
      <div v-if="customers.length === 0">
        <h2>No customer found at the moment</h2>
      </div>
    </div>

    <div v-if="customers.length != 0">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Status</th>
            <th scope="col">Creation date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer._id">
            <td>{{ customer.first_name }}</td>
            <td>{{ customer.last_name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.address }}</td>
            <td>{{ customer.status }}</td>
            <td>{{ customer.created_at.slice(0, 16) }}</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px">
                  <router-link
                    style="color: blue"
                    :to="{
                      name: 'GetCustomerId',
                      params: { id: customer._id },
                    }"
                    class="btn btn-sm btn-outline-secondary"
                    >See Profile</router-link
                  >
                  <router-link
                    style="color: blue"
                    :to="{ name: 'EditCustomer', params: { id: customer._id } }"
                    class="btn btn-sm btn-outline-secondary"
                    >Edit Customer</router-link
                  >
                  <button
                    style="color: blue"
                    class="btn btn-sm btn-outline-secondary"
                    v-on:click="deleteCustomer(customer._id)"
                  >
                    Delete Customer
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { server } from '../helper'
import axios from 'axios'
export default {
  name: 'HomeAdmin',

  data() {
    return {
      customers: [],
      token: '',
      message: '',
    }
  },
  created() {
    this.token = sessionStorage.getItem('token')
    // console.log('token')
    // console.log(sessionStorage.getItem('token'))
  },
  mounted() {
    this.fetchCustomers()
  },
  methods: {
    fetchCustomers() {
      axios
        .get(`${server.baseURL}/customer/customers`)
        .then((data) => (this.customers = data.data))
    },
    deleteCustomer(id) {
      if (window.confirm('Really ?')) {
        axios
          .delete(`${server.baseURL}/customer/deletecustomer?customerID=${id}`)
          .then((data) => {
            // console.log(data)
            this.message = data.data.message
            setTimeout(() => {
              window.location.reload()
            }, 2500)
          })
      }
    },
  },
}
</script>
