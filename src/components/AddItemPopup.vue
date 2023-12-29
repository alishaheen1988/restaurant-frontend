<template>
  <v-dialog max-width="600px" v-model="dialogVisible">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" text="Add Item"> </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h3>Add a New Item</h3>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit" ref="form">
          <v-text-field class="mb-2" variant="underlined" v-model="name" label="Name"
            :rules="[rules.required]"></v-text-field>
          <v-text-field class="mb-2" variant="underlined" v-model="description" label="Description"></v-text-field>
          <v-text-field class="mb-2" variant="underlined" v-model="price" label="Price"
            :rules="[rules.required, rules.numeric]"></v-text-field>
          <v-text-field class="mb-2" variant="underlined" v-model="discount_percentage" label="Discount Percentage"
            :rules="[rules.percentage]"></v-text-field>

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
  props: ['category_id'],
  data() {
    return {
      name: '',
      price: null,
      description: '',
      discount_percentage: null,
      dialogVisible: false,
      mainStore: useMainStore(),
      rules: {
        required: (v) => !!v || "This field is required",
        percentage: (v) =>
          !!(!v || (v || "").match(/^[1-9][0-9]?$|^100$/)) || "Discount is not valid",
        numeric: (v) =>
          !!(v || "").match(/^[1-9]\d*$/) || "Price is not valid"
      },
    }
  },
  watch: {
    dialogVisible(newvalue, oldvalue) {
      if (!newvalue && oldvalue) {
        this.name = '';
        this.description = '';
        this.discount_percentage = '';
        this.price=null;
      }
    }
  },
  methods: {
    submit() {
      console.log("5555555555555")
      if (!this.$refs.form.isValid)
        return
      console.log("9999999999")
      let fromData = {
        name: this.name,
        description: this.description,
        discount_percentage: this.discount_percentage,
        price: this.price,
        category_id: this.category_id
      };
      axios
        .post(this.mainStore.root_url + "items", fromData)
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
