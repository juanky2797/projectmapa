<template>
  <div>

    <div class="text-blue-900 text-4xl">
      Bienvenido
    </div>
    <div class="container">
      <router-link v-if="!isAutenticado" to="/login">Login</router-link>
      <button v-if="isAutenticado" @click="logout"> logout</button>
    </div>
    <div class="container">
        <router-view/>
    </div>
  </div>
</template>


<script>
import { mapGetters} from "vuex";
import {SALIR_AUTH} from '../store/auth-actions'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    ...mapGetters(["isAutenticado"])
  },
  methods: {
    logout: function() {
      this.$store.dispatch(SALIR_AUTH).then(() => this.$router.push("/"));
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

@import "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";
</style>
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
