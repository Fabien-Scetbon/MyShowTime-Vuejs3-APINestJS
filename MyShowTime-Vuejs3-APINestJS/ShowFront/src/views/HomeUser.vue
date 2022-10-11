<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Event List</h1>
      <p>Built with Nest.js, Vue.js, and MongoDB</p>
      <div v-if="message">
        <p style="color: red">{{ message }}</p>
      </div>
      <div v-if="events.length === 0">
        <h2>No event found at the moment</h2>
      </div>
      <div v-if="events.length != 0">
        <form id="create-post-form" @submit.prevent="searchEvent">
          <input
            type="text"
            class="form"
            name="search"
            id="search"
            v-model="search"
            placeholder="Wich event are you looking for ?"
          />
          <div class="form-group col-md-4 pull-right">
            <button class="btn btn-success" type="submit">Search</button>
          </div>
          <button v-on:click="refresh()" class="button">
            <p style="color: green; margin: auto">Refresh</p>
          </button>
        </form>
      </div>
    </div>

    <div v-if="events.length != 0">
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
            <th v-if="connected" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event._id">
            <td>{{ event.title }}</td>
            <td>{{ event.artist }}</td>
            <td>{{ event.show }}</td>
            <td>{{ event.date }}</td>
            <td>{{ event.time }}</td>
            <td>{{ event.place }}</td>
            <td>$ {{ event.price }}</td>
            <td>{{ event.content.slice(0, 10) + '...' }}</td>
            <td v-if="event.nb_ticket_send < event.nb_ticket_total">
              {{ event.nb_ticket_send }} / {{ event.nb_ticket_total }}
            </td>
            <td style="color: red" v-else>CLOSED</td>
            <td>{{ event.created_at.slice(0, 16) }}</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px">
                  <router-link
                    v-if="connected"
                    style="color: green"
                    :to="{
                      name: 'GetEventId',
                      params: { id: event._id },
                    }"
                    class="btn btn-sm btn-outline-secondary"
                    >See Event</router-link
                  >

                  <router-link
                    v-if="admin"
                    style="color: blue"
                    :to="{ name: 'EditEvent', params: { id: event._id } }"
                    class="btn btn-sm btn-outline-secondary"
                    >Edit Event</router-link
                  >
                  <button
                    v-if="admin"
                    style="color: blue"
                    class="btn btn-sm btn-outline-secondary"
                    v-on:click="deleteEvent(event._id)"
                  >
                    Delete Event
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
  name: 'HomeUser',

  data() {
    return {
      id: 0,
      events: [],
      message: '',
      search: '',
      eventsSearchArray: [],
      admin: '',
      connected: '',
    }
  },
  created() {
    this.admin = sessionStorage.getItem('status') == 1 ? true : false
    this.connected = sessionStorage.getItem('userId') ? true : false
  },
  mounted() {
    this.fetchEvents()
  },
  methods: {
    fetchEvents() {
      axios
        .get(`${server.baseURL}/event/events`)
        .then((data) => (this.events = data.data))
    },
    deleteEvent(id) {
      if (sessionStorage.getItem('status') == 1) {
        if (window.confirm('Really ?')) {
          axios
            .delete(`${server.baseURL}/event/deleteevent?eventID=${id}`)
            .then((data) => {
              // console.log(data)
              this.message = data.data.message
              setTimeout(() => {
                window.location.reload()
              }, 2500)
            })
        }
      } else {
        return
      }
    },
    searchEvent() {
      if (!this.search) {
        return
      }
      this.eventsSearchArray = []
      console.log(this.search)

      let findEvent = this.events.some((event) =>
        event.title.toUpperCase().includes(this.search.toUpperCase())
      )
      if (findEvent) {
        this.eventsSearchArray = this.events.filter((event) =>
          event.title.toUpperCase().includes(this.search.toUpperCase())
        )
        // console.log(this.eventsSearchArray)
      }
      findEvent = this.events.some((event) =>
        event.artist.toUpperCase().includes(this.search.toUpperCase())
      )
      if (findEvent) {
        this.eventsSearchArray = this.eventsSearchArray.concat(
          this.events.filter((event) =>
            event.artist.toUpperCase().includes(this.search.toUpperCase())
          )
        )
        // console.log(this.eventsSearchArray)
      }
      findEvent = this.events.some((event) =>
        event.show.toUpperCase().includes(this.search.toUpperCase())
      )
      if (findEvent) {
        this.eventsSearchArray = this.eventsSearchArray.concat(
          this.events.filter((event) =>
            event.show.toUpperCase().includes(this.search.toUpperCase())
          )
        )
        // console.log(this.eventsSearchArray)
      }

      findEvent = this.events.some((event) => event.date.includes(this.search))
      if (findEvent) {
        this.eventsSearchArray = this.eventsSearchArray.concat(
          this.events.filter((event) => event.date.includes(this.search))
        )
        // console.log(this.eventsSearchArray)
      }
      this.search = ''
      this.events = this.eventsSearchArray
      if (this.events.length == 0) {
        this.message = "Sorry, your search doesn't match !"
        setTimeout(() => {
          window.location.reload()
        }, 2500)
      }
    },
    refresh() {
      window.location.reload()
    },
  },
}
</script>

<style scoped>
#create-post-form {
  display: flex;
  justify-content: center;
  margin: auto;
  width: 31rem;
  height: 2.5rem;
  margin-bottom: 1rem;
}

#search {
  width: 20rem;
  border: 2px green solid;
  border-radius: 5px;
  text-align: center;
}
.button {
  border: 2px green solid;
  border-radius: 5px;
  height: 2.4rem;
  width: 5.5rem;
}
</style>
