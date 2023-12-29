<template>
  <v-dialog max-width="600px" v-model="dialogVisible">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" text="Add SubCategory"> </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h3>Add a New SubCategory</h3>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit" ref="form">
          <v-text-field class="mb-2" variant="underlined" v-model="name" label="Name"
            :rules="[rules.required]"></v-text-field>
          <v-text-field class="mb-2" variant="underlined" v-model="description" label="Description"></v-text-field>
          <v-text-field class="mb-2" variant="underlined" v-model="discount_percentage" label="Discount Percentage"
            :rules="[rules.numeric]"></v-text-field>

          <v-btn type="submit" color="primary" block class="mt-2">Add</v-btn>

        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { useMainStore } from '@/stores'
export default {
  name: "addCategory",
  props: ['parent_id'],
  data() {
    return {
      name: '',
      description: null,
      discount_percentage: null,
      dialogVisible: false,
      mainStore: useMainStore(),
      rules: {
        required: (v) => !!v || "This field is required",
        numeric: (v) =>
          !!(!v || (v || "").match(/^[1-9][0-9]?$|^100$/)) || "Discount is not valid"
      },
    }
  },
  watch: {
    dialogVisible(newvalue, oldvalue) {
      if (!newvalue && oldvalue) {
        this.name = '';
        this.description = '';
        this.discount_percentage = '';
      }
    }
  },
  methods: {

    submit() {
      if (!this.$refs.form.isValid)
        return
      let fromData = {
        name: this.name,
        description: this.description,
        discount_percentage: this.discount_percentage,
        parent_id: this.parent_id
      };
      axios
        .post(this.mainStore.root_url + "categories", fromData)
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
