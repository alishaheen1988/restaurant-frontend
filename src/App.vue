<template>
  <v-app>
    <toolbar></toolbar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Toolbar from '@/views/Toolbar.vue';
import axios from "axios";
import { useMainStore } from '@/stores';

export default {
  name: 'App',
  components: {
    Toolbar
  },
  data: () => ({
    mainStore: useMainStore()
  }),
  beforeMount() {

    if (this.mainStore.loggedIn)
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.mainStore.token}`;
    else
      axios.defaults.headers.common['Authorization'] = ``;
  },

}
</script>
