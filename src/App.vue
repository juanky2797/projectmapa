<template>
  <div id="app" class="bg-gray-100">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {SALIR_AUTH, USER_REQUEST} from './store/auth-actions'
import axios from 'axios'



export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted: () => {
    let token = localStorage.getItem('usuario-token') 
    console.log(token)
    if(token == null) {
      //alert("no hay token")
    }
    axios.interceptors.response.use(undefined, (err) => {
      return new Promise(() => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) { // if you ever get an unauthorized, logout the user 
        this.$store.dispatch(SALIR_AUTH) // you can also redirect to /login if needed ! 
        } throw err;
      })
    })
  },

  created: function() {
    if (this.$store.getters.isAutenticado) {
      this.$store.dispatch(USER_REQUEST);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
