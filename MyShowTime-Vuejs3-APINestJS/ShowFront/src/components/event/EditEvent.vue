<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Edit Event</h2>
      <div v-if="errorCredentials">
        <p style="color: red">Error : please verify your credentials</p>
      </div>
      <div v-if="message">
        <p style="color: rgb(17, 153, 46)">{{ message }}</p>
      </div>
      <form id="create-post-form" @submit.prevent="editEvent">
        <div class="form-group col-md-12">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            v-model="event.title"
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
            v-model="event.artist"
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
            v-model="event.show"
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
            v-model="event.date"
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
            v-model="event.time"
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
            v-model="event.place"
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
            v-model="event.price"
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
            v-model="event.content"
            name="title"
            class="form-control"
            placeholder="Enter content"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="nb_ticket_send">Number of tickets sold</label>
          <input
            type="number"
            id="nb_ticket_send"
            v-model="event.nb_ticket_send"
            name="title"
            class="form-control"
            placeholder="Enter number"
          />
        </div>
         <div class="form-group col-md-12">
          <label for="nb_ticket_total">Number total of tickets</label>
          <input
            type="number"
            id="nb_ticket_total"
            v-model="event.nb_ticket_total"
            name="title"
            class="form-control"
            placeholder="Enter number"
          />
        </div>

        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Update Event</button>
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
  name: 'EditEvent',

  data() {
    return {
      id: 0,
      event: {},
      errorCredentials: false,
      message: '',
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getEvent()
  },
  methods: {
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
        nb_ticket_send: this.event.nb_ticket_send,
        nb_ticket_total: this.event.nb_ticket_total,
      }
      axios
        .put(
          `${server.baseURL}/event/updateevent?eventID=${this.id}`,
          eventData
        )
        .then((data) => {
          console.log(data.data.message)
          this.message = data.data.message
          this.errorCredentials = false
          setTimeout(() => {
            router.push({ name: 'HomeUser' })
          }, 2500)
        })
        .catch((error) => {
          this.errorCredentials = true
        })
    },
    getEvent() {
      axios
        .get(`${server.baseURL}/event/event/${this.id}`)
        .then((data) => (this.event = data.data))
    },
  },
}
</script>
