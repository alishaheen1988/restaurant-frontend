<template>
  <v-app>
    <v-toolbar :color="'indigo'" dark>

      <v-toolbar-title>My Restaurant</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: 'App',

  data: () => ({
    //
  }),
  beforeMount() {

      axios.defaults.headers.common["Authorization"] =
        "Bearer :12121" ;
  },
  

}
</script>
