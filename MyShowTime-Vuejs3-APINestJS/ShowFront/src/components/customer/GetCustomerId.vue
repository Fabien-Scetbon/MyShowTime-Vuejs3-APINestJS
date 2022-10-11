<template>
  <div class="container-fluid">
    <div class="text-center">
      <h2>My profile</h2>
    </div>

    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Firstname</th>
          <th scope="col">Lastname</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Address</th>
          <th scope="col">Status</th>
          <th scope="col">Created at</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="customer._id">
          <td>{{ customer.first_name }}</td>
          <td>{{ customer.last_name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.address }}</td>
          <td>{{ customer.status }}</td>
          <td>{{ created_at }}</td>

          <td>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group" style="margin-bottom: 20px">
                <router-link
                  style="color: green"
                  :to="{
                    name: 'UpdateProfile',
                    params: { id: id },
                  }"
                  class="btn btn-sm btn-outline-secondary"
                  >Edit Profile</router-link
                >
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center">
      <h2>My shopping</h2>
      <button
        v-if="selectedEvents.length != 0"
        v-on:click="resetShop()"
        class="button"
      >
        <p style="color: green; margin: auto">Reset shopping list</p>
      </button>

      <div v-if="selectedEvents.length === 0">
        <h4>Your don't have any event in your shopping list !</h4>
      </div>
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
            <th scope="col">QR Code</th>
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
            <td>
              <img
                :src="`https://api.qrserver.com/v1/create-qr-code/?data=${event.title}+${event.date}+${event.time}+${event.place}&amp;size=70x70`"
                alt=""
                title=""
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2>My wish list</h2>

    <div v-if="alert.length != 0">
      <h4 style="color: green">{{ alert }}</h4>
      <h4 style="color: blue">{{ wishAlert }}</h4>
    </div>

    <div v-if="wishList.length === 0">
      <h4>Your don't have any wish in your wish list !</h4>
    </div>

    <ul v-if="wishList.length != 0">
      <li v-for="wish in wishList" :key="wish">
        {{ wish }}
      </li>
    </ul>
    <form id="create-post-form" @submit.prevent="addWish">
      <input
        type="text"
        class="form"
        name="wish"
        id="search"
        v-model="wish"
        placeholder="Add a new wish"
      />
      <div class="form-group col-md-4 pull-right">
        <button class="btn btn-success" type="submit">Add wish</button>
      </div>
      <button
        v-if="wishList.length != 0"
        v-on:click="resetWish()"
        class="button"
      >
        <p style="color: green; margin: auto; width: 9rem">Reset wish list</p>
      </button>
    </form>
  </div>
</template>
<script>
import { server } from '../../helper'
import axios from 'axios'
export default {
  name: 'GetCustomerId',

  data() {
    return {
      id: 0,
      customer: {},
      events: [],
      selectedEvents: [],
      created_at: '',
      wishList: [],
      wish: '',
      alert: '',
      wishAlert: '',
    }
  },
  created() {
    this.selectEvents()
    setTimeout(() => {
      this.created_at = this.customer.created_at.slice(0, 16)
      this.wishAlert = localStorage.getItem('alert' + this.id)
        ? localStorage.getItem('alert' + this.id)
        : ''
    }, 500)
  },

  mounted() {
    this.id = this.$route.params.id
    this.getCustomer()
    this.fetchEvents()
    this.fetchCustomers()

    this.wishList = localStorage.getItem('wishList' + this.id)
      ? JSON.parse(localStorage.getItem('wishList' + this.id))
      : []

    this.alert = localStorage.getItem('alert' + this.id)
      ? 'One of your favorite event has just been added !'
      : ''
  },
  methods: {
    getCustomer() {
      axios
        .get(`${server.baseURL}/customer/customer/${this.id}`)
        .then((data) => (this.customer = data.data))
    },
    fetchCustomers() {
      axios
        .get(`${server.baseURL}/customer/customers`)
        .then((data) => (this.customers = data.data))
    },
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
        if (localStorage.getItem(this.id)) {
          let selectEvents = []
          let localStorageEvents = JSON.parse(localStorage.getItem(this.id))
          // console.log('dans session storage')
          // console.log(sessionStorageEvents)

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
    resetShop() {
      if (window.confirm('Really ?')) {
        localStorage.removeItem(this.id)
        location.reload()
      }
    },
    addWish() {
      if (!this.wish) {
        return
      }
      let wishArray = []

      if (localStorage.getItem('wishList' + this.id)) {
        console.log(localStorage.getItem('wishList' + this.id))
        wishArray = JSON.parse(localStorage.getItem('wishList' + this.id))
        // console.log(wishArray)
      }

      wishArray.push(this.wish)

      localStorage.setItem('wishList' + this.id, JSON.stringify(wishArray))
      console.log(wishArray)
      this.wish = ''
      this.wishList = wishArray
    },
    resetWish() {
      if (window.confirm('Really ?')) {
        localStorage.removeItem('wishList' + this.id)
        if (localStorage.getItem('alert' + this.id)) {
          localStorage.removeItem('alert' + this.id)
          this.alert = ''
        }
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
  width: 10rem;
  margin-bottom: 1rem;
}

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

ul {
  width: 20rem;
  margin: auto;
  margin-bottom: 1rem;
}
</style>
