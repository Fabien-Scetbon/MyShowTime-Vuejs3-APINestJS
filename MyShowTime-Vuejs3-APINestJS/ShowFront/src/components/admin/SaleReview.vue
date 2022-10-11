<template>
  <div class="container-fluid">
    <div class="text-center">
      <h2>Event sales</h2>

      <div v-if="events.length != 0">
        <table class="table table-bordered">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Artist</th>
              <th scope="col">Date</th>
              <th scope="col">Price</th>
              <th scope="col">Tickets sold</th>
              <th scope="col">Created at</th>
              <th scope="col">Total value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event._id">
              <td>{{ event.title }}</td>
              <td>{{ event.artist }}</td>
              <td>{{ event.date }}</td>
              <td>$ {{ event.price }}</td>
              <td v-if="event.nb_ticket_send < event.nb_ticket_total">
                {{ event.nb_ticket_send }} / {{ event.nb_ticket_total }}
              </td>
              <td style="color: red" v-else>CLOSED</td>
              <td>{{ event.created_at.slice(0, 16) }}</td>
              <td style="color: green">
                $ {{ event.nb_ticket_send * event.price }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Recent events sold</h2>
      <div v-if="selectedEvents.length === 0">
        <h4>Your dont't have any event in your sale list !</h4>
      </div>
      <button
        v-if="selectedEvents.length != 0"
        v-on:click="reset()"
        class="button"
      >
        <p style="color: green; margin: auto">Reset list</p>
      </button>
       <button
        v-on:click="resetAll()"
        class="button button2"
      >
        <p style="color: red; margin: auto">Reset datas</p>
      </button>
    </div>

    <div v-if="selectedEvents.length != 0">
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in selectedEvents" :key="event._id">
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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { server } from '../../helper'
import axios from 'axios'
export default {
  name: 'SaleReview',

  data() {
    return {
      id: 0,
      events: [],
      selectedEvents: [],
      total_value: 0,
    }
  },
  created() {
    this.selectEvents()
  },

  mounted() {
    this.fetchEvents()
  },
  methods: {
    fetchEvents() {
      axios.get(`${server.baseURL}/event/events`).then(
        (
          data // (data) => (console.log(data),(this.events = data.data),console.log(this.events))
        ) => (this.events = data.data)
      )
    },
    selectEvents() {
      setTimeout(() => {
        // pour laisser le temps de fetch events !! sinon vide
        if (localStorage.getItem('listAdmin')) {
          let selectEvents = []
          let localStorageEvents = JSON.parse(localStorage.getItem('listAdmin'))
          // console.log('dans local storage')
          // console.log(localStorageEvents)

          this.events.forEach(
            (event) => {
              if (localStorageEvents.includes(event._id)) {
                // console.log('trouvé dans localStorage')
                // console.log(event._id)
                selectEvents.push(event)
              }
            },
            // console.log(selectEvents),
            (this.selectedEvents = selectEvents)
          )
        }
      }, 100)
    },
    reset() {
      if (window.confirm('Really ?')) {
        localStorage.removeItem('listAdmin')
        location.reload()
      }
    },
    resetAll() {
      if (window.confirm('Reset all datas ?')) {
        localStorage.clear()
        location.reload()
      }
    },
  },
}
</script>

<style scoped>
.button {
  border: 2px green solid;
  border-radius: 5px;
  height: 2.4rem;
  width: 6rem;
  margin-bottom: 1rem;
}

.button2 {
  border: 2px red solid;
  border-radius: 5px;
  height: 2.4rem;
  width: 7rem;
  margin-left:2rem;
  margin-bottom: 1rem;
}
</style>
