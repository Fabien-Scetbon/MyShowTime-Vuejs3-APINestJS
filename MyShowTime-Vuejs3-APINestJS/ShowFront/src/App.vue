<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home user |</router-link> 
      <router-link v-if="admin" style="color: blue" to="/homeadmin"
        > Home admin |</router-link
      >

      <router-link v-if="!connected" style="color: rgb(172, 23, 185)" to="/signin"
        > Signin |</router-link
      >
      
      <router-link v-if="!connected" style="color: rgb(172, 23, 185)" to="/signup"
        > Signup |</router-link
      >
      
      <button v-if="connected" v-on:click="profile()" class="button">
        <p style="color: green"> My profile |</p>
      </button>
      
      <button v-if="connected" v-on:click="logOut()" class="button">
        <p style="color: red"> Logout</p>
      </button>
      <div v-if="message">
        <p style="color: rgb(17, 153, 46)">{{ message }}</p>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import router from './router'

export default {
  data() {
    return {
      message: '',
      admin: '',
      connected: '',
    }
  },
  created() {
    this.admin = sessionStorage.getItem('status') == 1 ? true : false
    this.connected = sessionStorage.getItem('userId') ? true : false
  },

  methods: {
    logOut() {
      if (sessionStorage.getItem('userId')) {
        this.message = 'User is logged out !'
        setTimeout(() => {
          this.message = ''
          sessionStorage.clear()
          // localStorage.clear()
          location.reload()
          router.push({ name: 'Home' })
        }, 2000)
      }
    },
    profile() {
      if (sessionStorage.getItem('userId')) {
        let userId = sessionStorage.getItem('userId')
        console.log(userId)
        router.push({
          name: 'GetCustomerId',
          params: { id: userId },
        })
      } else {
        return
      }
    },
  },
}
</script>

<style>
.form-wrapper {
  width: 500px;
  margin: 0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  text-decoration: underline wavy rgb(63, 179, 159);
}

.button {
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #2c3e50;
  font-size: 1rem;
  font-weight: bold;
  height: 1rem;
  padding: 0;
  margin: 0;
}

.button:active {
  background-color: transparent;
  border: none;
  color: rgb(146, 15, 15);
  font-size: 1rem;
  padding: 0;
  margin: 0;
}
</style>
