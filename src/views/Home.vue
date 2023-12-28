<template>
  Home
</template>

<script>
import { defineComponent } from 'vue';
import { useMainStore } from '@/stores';

export default defineComponent({
  name: 'Home',
  data() {
    return {
      mainStore: useMainStore()
    }
  },
  mounted() {
    this.mainStore.getRestaurantMenu();
  }
});
</script>
