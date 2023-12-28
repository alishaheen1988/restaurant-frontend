<template>
  <v-app>
   <toolbar></toolbar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Toolbar from '@/views/Toolbar.vue' 
export default {
  name: 'App',
  components: {
    Toolbar
  },
  data: () => ({
    
  }),
 

}
</script>
