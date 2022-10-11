<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Create Event</h2>
      <div v-if="errorCredentials">
        <p style="color: red">Error : please verify your credentials</p>
      </div>
      <div v-if="message">
        <p style="color: rgb(17, 153, 46)">{{ message }}</p>
      </div>
      <form id="create-post-form" @submit.prevent="createEvent">
        <div class="form-group col-md-12">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            v-model="title"
            name="title"
            class="form-control"
            placeholder="Enter title"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="artist">Artist</label>
          <input
            type="text"
            id="artist"
            v-model="artist"
            name="title"
            class="form-control"
            placeholder="Enter artist"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="show">Show</label>
          <input
            type="text"
            id="show"
            v-model="show"
            name="title"
            class="form-control"
            placeholder="Enter show"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="date">Date</label>
          <input
            type="text"
            id="date"
            v-model="date"
            name="title"
            class="form-control"
            placeholder="Enter date"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="time">Time</label>
          <input
            type="text"
            id="time"
            v-model="time"
            name="title"
            class="form-control"
            placeholder="Enter time"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="place">Place</label>
          <input
            type="text"
            id="place"
            v-model="place"
            name="title"
            class="form-control"
            placeholder="Enter place"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="price">Price</label>
          <input
            type="number"
            id="price"
            v-model="price"
            name="title"
            class="form-control"
            placeholder="Enter price"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="content">Content</label>
          <input
            type="text"
            id="content"
            v-model="content"
            name="title"
            class="form-control"
            placeholder="Enter content"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="content">Total number of tickets</label>
          <input
            type="number"
            id="nb_ticket_total"
            v-model="nb_ticket_total"
            name="title"
            class="form-control"
            placeholder="Enter number"
          />
        </div>
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Create event</button>
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
  name: 'CreateEvent',

  data() {
    return {
      title: '',
      artist: '',
      show: '',
      date: '',
      time: '',
      place: '',
      price: '',
      content: '',
      nb_ticket_send: '',
      nb_ticket_total: '',
      errorCredentials: false,
      message: '',
      customers: [],
    }
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
    createEvent() {
      let eventData = {
        title: this.title,
        artist: this.artist,
        show: this.show,
        date: this.date,
        time: this.time,
        place: this.place,
        price: this.price,
        content: this.content,
        nb_ticket_send: 0,
        nb_ticket_total: this.nb_ticket_total,
      }
      this.__submitToServer(eventData)
    },
    __submitToServer(data) {
      axios
        .post(`${server.baseURL}/event/createevent`, data)
        .then((data) => {
          // console.log(data.data.message)
          this.message = data.data.message
          this.errorCredentials = false

          setTimeout(() => {
            this.sendAlert()
            router.push({ name: 'HomeUser' })
          }, 2500)
        })
        .catch((error) => {
          this.errorCredentials = true
        })
    },

    sendAlert() {
      // localStorage.setItem('newEvent', this.artist)
      // console.log(localStorage.getItem('newEvent'))

      this.customers.forEach((customer) => {
        if (localStorage.getItem('wishList' + customer._id)) {
          let customer_wish_list = JSON.parse(
            localStorage.getItem('wishList' + customer._id)
          )
          console.log(customer_wish_list)

            customer_wish_list.forEach((wish) => {
              if (wish.toUpperCase() == this.title.toUpperCase()) {
                localStorage.setItem('alert' + customer._id, this.title)
              } else if (wish.toUpperCase() == this.artist.toUpperCase()) {
                localStorage.setItem('alert' + customer._id, this.artist)
              }
            })
        }
      })
    },
  },
}
</script>
