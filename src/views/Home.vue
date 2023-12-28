<template>
  Home
</template>

<script>
import { defineComponent } from 'vue';
import axios from "axios";

export default defineComponent({
  name: 'Home',

mounted() {
    axios
      .get('http://127.0.0.1:8000/api/categories')
      .then((response) => {
        console.log(response)
      }).catch((err) =>{
        console.log(err)
      })
  }
});
</script>
