<template>
  <div class="container-fluid">
    <div class="text-center">
      <h2>Event</h2>
    </div>
    <div v-if="message">
      <p style="color: rgb(17, 153, 46)">{{ message }}</p>
    </div>

    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Artist</th>
          <th scope="col">Show</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Place</th>
          <th scope="col">Price</th>
          <th scope="col">Content</th>
          <th scope="col">Tickets sold</th>
          <th scope="col">Created at</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="event._id">
          <td>{{ event.title }}</td>
          <td>{{ event.artist }}</td>
          <td>{{ event.show }}</td>
          <td>{{ event.date }}</td>
          <td>{{ event.time }}</td>
          <td>{{ event.place }}</td>
          <td>$ {{ event.price }}</td>
          <td>{{ event.content }}</td>
          <td v-if="nb_sold < nb_total">{{ nb_sold }} / {{ nb_total }}</td>
          <td style="color: red" v-else>CLOSED</td>
          <td>{{ created_at }}</td>
          <td>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group" style="margin-bottom: 20px">
                <button
                  v-if="nb_sold < nb_total"
                  style="color: green"
                  class="btn btn-sm btn-outline-secondary"
                  v-on:click="shopEvent(id)"
                >
                  Buy Event
                </button>
                <router-link
                  v-if="admin"
                  style="color: blue"
                  :to="{
                    name: 'EditEvent',
                    params: { id: id },
                  }"
                  class="btn btn-sm btn-outline-secondary"
                  >Edit Event</router-link
                >
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { server } from '../../helper'
import axios from 'axios'
export default {
  name: 'GetEventId',
  data() {
    return {
      id: 0,
      event: {},
      errored: false,
      message: '',
      created_at: '',
      nb_total: 0,
      nb_sold: 0,
      admin: '',
    }
  },
  created() {
    setTimeout(() => {
      this.created_at = this.event.created_at.slice(0, 16)
      this.nb_total = this.event.nb_ticket_total
      this.nb_sold = this.event.nb_ticket_send
    }, 100)
    this.admin = sessionStorage.getItem('status') == 1 ? true : false
  },
  mounted() {
    this.id = this.$route.params.id
    this.getEvent()
  },
  methods: {
    getEvent() {
      axios
        .get(`${server.baseURL}/event/event/${this.id}`)
        .then((data) => (this.event = data.data))
    },
    shopEvent(id) {
      if (sessionStorage.getItem('userId')) {
        let userId = sessionStorage.getItem('userId')
        // console.log('userId')
        // console.log(userId)
        if (window.confirm('Really ?')) {
          let shopArray = []
          let listAdmin = []
          // console.log('localstorUser')
          // console.log(localStorage.getItem(userId))

          if (localStorage.getItem(userId)) {
            console.log(localStorage.getItem(userId))
            shopArray = JSON.parse(localStorage.getItem(userId))
            // console.log(shopArray)
          }
          if (localStorage.getItem('listAdmin')) {
            listAdmin = JSON.parse(localStorage.getItem('listAdmin'))
          }

          shopArray.push(id)
          listAdmin.push(id)

          localStorage.setItem(userId, JSON.stringify(shopArray))
          localStorage.setItem('listAdmin', JSON.stringify(listAdmin))
          console.log(shopArray)
          this.editEvent()
        } else {
          return
        }
      } else {
        return
      }
    },
    editEvent() {
      let eventData = {
        title: this.event.title,
        artist: this.event.artist,
        show: this.event.show,
        date: this.event.date,
        time: this.event.time,
        place: this.event.place,
        price: this.event.price,
        content: this.event.content,
        nb_ticket_send: this.event.nb_ticket_send + 1,
        nb_ticket_total: this.event.nb_ticket_total,
      }
      axios
        .put(
          `${server.baseURL}/event/updateevent?eventID=${this.id}`,
          eventData
        )
        .then((data) => {
          console.log(data.data.message)
          this.message = 'Event has been add in your Profile !'
          setTimeout(() => {
            window.location.reload()
          }, 2500)
        })
    },
  },
}
</script>
