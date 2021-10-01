<template>
  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
    <div class="w-full text-center pb-8">
      <div
        class="
          w-full
          bg-white
          rounded-lg
          sahdow-lg
          p-12
          flex flex-col
          justify-center
          items-center
        "
      >
        <div class="mb-8">
          <img
            class="object-center object-cover rounded-full h-36 w-36"
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
            alt="photo"
          />
        </div>
      </div>

      <h1
        class="
          font-bold
          text-2xl
          md:text-2xl
          lg:text-2xl
          font-heading
          text-gray-900
          pb-2
        "
      >
        {{ usuario.name }}
      </h1>

      <p class="text-gray-400 font-normal text-base">
        {{ usuario.email }}
      </p>
    </div>
    <ul class="grid grid-cols-2 gap-4">
      <li v-for="job in postss" v-bind:key="job.id">
        <div class="">
          <div class="bg-white rounded-lg p-6">
            <div class="flex items-center space-x-6 mb-4">
              <img
                class="h-28 w-28 object-cover object-center rounded-full"
                v-bind:src="job.image"
              />
              <div>
                <p class="text-xl text-gray-700 font-normal mb-1">
                  {{ job.title }}
                </p>
                <p class="text-base text-blue-600 font-normal">
                  {{ job.status }}
                </p>
              </div>
            </div>
            <div>
              <p class="text-gray-400 leading-loose font-normal text-base">
                {{ job.description }}
              </p>
              <GmapMap
                :center="{
                  lat: Number(job.latitude),
                  lng: Number(job.longitude),
                }"
                :zoom="3"
                map-type-id="roadmap"
                style="width: 500px; height: 200px"
              >
                <GmapMarker
                  :key="job.id"
                  :position="{
                    lat: Number(job.latitude),
                    lng: Number(job.longitude),
                  }"
                  :clickable="true"
                  :draggable="false"
                  @click="
                    center = {
                      lat: Number(job.latitude),
                      lng: Number(job.longitude),
                    }
                  "
                />
              </GmapMap>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="container m-6 p-6 bg-white">
      <GmapMap
      :center="{ lat: 10, lng: 10 }"
      :zoom="2"
      map-type-id="roadmap"
      style="width: 1000px; height: 400px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in postss"
        :position="{ lat: Number(m.latitude), lng: Number(m.longitude) }"
        :clickable="true"
        :draggable="false"
        @click="loquesea(m)"
      />
      <gmap-info-window
        :options="{
          pixelOffset: { width: 0, height: -35 },
        }"
        :position="label.position"
        :opened="label.open"
        @closeclick="label.open = false"
      >
        <div v-html="label.template"></div>
      </gmap-info-window>
    </GmapMap>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { USER_JOBS, USER_REQUEST } from "../../store/auth-actions";
//import { USER_REQUEST } from '../../store/auth-actions'

export default {
  name: "home",
  computed: mapState({
    usuario: (state) => state.auth.usuario1,
    status: (state) => state.auth.status,
    postss: (state) => state.auth.posts,
  }),
  methods: {
    ...mapActions[{ getUserData: USER_REQUEST, getUserJobs: USER_JOBS }],
    loquesea: function (obj) {
      (this.label.position = {
        lat: Number(obj.latitude),
        lng: Number(obj.longitude),
      }),
        this.label.template =
          '<div class="max-w-md bg-white shadow-lg rounded-lg grid">' +
          '<div class="flex justify-center">' +
          '    <img class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src="'+obj.image+'">' +
          "  </div>" +
          "<div>" +
          '    <h2 class="text-gray-800 text-3xl font-semibold">'+obj.title+'</h2>' +
          '    <p class="mt-2 text-gray-600">' +
          obj.description +
          "</p>" +
          "</div>" +
          '  <div class="flex justify-end mt-4">' +
          "</div>" +
          "</div>",
        this.label.open = true
    },
  },
  data() {
    return {
      label: {
        position: { lat: 0, lng: 0 },
        open: false,
        template: "<p>hola juancarlo</p>",
      },
    };
  },

  created: () => {
    //console.log("CREATED")
  },
  mounted: function () {
    //console.log("MOUNTED")
    if (this.$store.getters.isAutenticado) {
      //console.log("MOUNTED --> AUTH OK")
      this.$store.dispatch(USER_JOBS);
    }
  },
};
</script>

<style>
</style>