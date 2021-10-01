<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>User name</label>
     <input required v-model="username" type="text" placeholder="Snoopy"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" type="submit">Login</button>

     {{status}}
   </form>
   
 </div>
</template>


<script>

import {PETICION_AUTH, SALIR_AUTH} from '../../store/auth-actions'
import { mapState } from 'vuex'

export default {
  name: 'login',
  props: {
    msg: String
  },
  computed: mapState({usuario: state => state.auth.usuario, status: state=> state.auth.status}),
  data() {
    return {
      username: "",
      password: ""
    }

  },
  methods: {
    login: function() {
      const { username, password} = this;
      this.$store.dispatch(PETICION_AUTH, {email:username, password:password}).then(() => {
        this.$router.push('/home')
      })
    },
     logout: function () {
    this.$store.dispatch(SALIR_AUTH)
    .then(() => {
      this.$router.push('/login')
    })
  }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
