<template>
  <v-dialog max-width="600px" v-model="dialogVisible">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" flat color="red">
        <span>Delete</span>
        <v-icon right>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h3>Delete</h3>
      </v-card-title>
      <v-card-text>
        <div>are you sure you want to delete {{ type == 'categories' ? 'category' : 'item' }} {{name}}?</div>
        <v-row class="mt-5" justify="start">
          <v-col cols="6" >
            <v-btn @click="submit" color="primary" block class="mt-2">Yes</v-btn>

          </v-col>
          <v-col cols="6" >
            <v-btn @click="dialogVisible = false" color="primary" block class="mt-2">No</v-btn>

          </v-col>
        </v-row>

      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { useMainStore } from '@/stores'
export default {
  name: "DeleteItem",
  props: ['type', 'id','name'],
  data() {
    return {
      dialogVisible: false,
      mainStore: useMainStore()
    }
  },

  methods: {

    submit() {
      axios
        .delete(this.mainStore.root_url + this.type + "/" + this.id)
        .then(() => {
          this.mainStore.getRestaurantMenu();
          this.dialogVisible = false;
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
