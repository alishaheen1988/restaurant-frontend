<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <h2>Sign in</h2>
      <v-form @submit.prevent="submit" ref="form">
        <v-text-field variant="underlined" v-model="email" label="Email"
          :rules="[rules.required, rules.email]"></v-text-field>

        <v-text-field variant="underlined" v-model="password" label="password" type="password"
          :rules="[rules.required, rules.password]"></v-text-field>

        <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>

      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useMainStore } from '@/stores'
import axios from "axios";

export default defineComponent({
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      mainStore: useMainStore(),
      rules: {
        email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
        password: (v) =>
          !!(v || "").match(/^.{6,15}$/) || "Password must be 6-15 characters.",
        required: (v) => !!v || "This field is required",
      },
    }
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate())
        return
      axios
        .post(this.mainStore.root_url+"login",{"email":this.email,"password":this.password})
        .then((response) => {
          this.mainStore.setToken(response.data.data.name,response.data.data.token);
          this.$router.push("/");
        }).catch((err) => {
          console.log(err)
        })
    }
  }

});
</script>
