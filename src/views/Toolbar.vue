<template>
  <v-toolbar :color="'indigo'" dark>

    <v-toolbar-title>My Restaurant</v-toolbar-title>

    <v-spacer></v-spacer>
    <div v-if="mainStore.loggedIn">
      <span>Hello {{ mainStore.user_name }}</span>
      <v-btn icon @click="logout">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </div>

  </v-toolbar>
</template>

<script>
import { defineComponent } from 'vue';
import { useMainStore } from '@/stores'
import axios from "axios";

export default defineComponent({
  name: 'Toolbar',
  data() {
    return {
      mainStore: useMainStore()
    }
  },
  methods: {
    logout() {

      axios
        .post(this.mainStore.root_url + "logout")
        .then(() => {
          this.mainStore.destroyToken();
          this.$router.push("/login");
        }).catch((err) => {
          console.log(err)
        })
    }
  }

});
</script>
