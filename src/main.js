import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from "axios";
import { createPinia } from 'pinia';
loadFonts()
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

createApp(App)
  .use(router)
  .use(vuetify)
  .use(createPinia())
  .mount('#app')
