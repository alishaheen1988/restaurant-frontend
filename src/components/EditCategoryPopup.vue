<template>
  <v-dialog max-width="600px" v-model="dialogVisible">
    <template v-slot:activator="{ props }">
      <v-btn flat color="blue" v-bind="props">
        <span>Edit</span>
        <v-icon right>mdi-table-edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h3>Edit</h3>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit" ref="form">
          <v-text-field class="mb-2" variant="underlined" v-model="data_name" label="Name"
            :rules="[rules.required]"></v-text-field>
          <v-text-field class="mb-2" variant="underlined" v-model="data_description" label="Description"></v-text-field>
          <v-text-field class="mb-2" variant="underlined" v-model="data_discount_percentage" label="Discount Percentage"
            :rules="[rules.numeric]"></v-text-field>

          <v-btn type="submit" color="primary" block class="mt-2">Edit</v-btn>

        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { useMainStore } from '@/stores'
export default {
  name: "editCategory",
  props: ['id', 'name', 'description', 'discount_percentage'],
  data() {
    return {
      data_name: this.name,
      data_description: this.description,
      data_discount_percentage: this.discount_percentage,
      dialogVisible: false,
      mainStore: useMainStore(),
      rules: {
        required: (v) => !!v || "This field is required",
        numeric: (v) =>
          !!(!v || (v+"" || "").match(/^(?:100|[1-9]?\d)$/)) || "Discount is not valid"
      },
    }
  },

  methods: {

    submit() {
      if (!this.$refs.form.isValid)
        return
      let fromData = {
        name: this.data_name,
        description: this.data_description,
        discount_percentage: this.data_discount_percentage,
      };
      axios
        .put(this.mainStore.root_url + "categories/" + this.id, fromData)
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
