import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
    state: () => ({
        token: localStorage.getItem("access_token") || null,
        user_name: localStorage.getItem("user_name") || "",
    }),
    getters: {
        loggedIn() {
            return this.token ? true : false;
        }
    },
    actions: {
        setToken(user_name,token) {
            localStorage.setItem("user_name", user_name);
            localStorage.setItem("access_token", token);
            this.token = token;
            this.user_name = user_name;
            axios.defaults.headers.common["Authorization"] =`Bearer ${token}`;
        },
        destroyToken() {
            this.token = null;
            this.user_name = "";
            localStorage.removeItem("access_token");
            localStorage.removeItem("user_name");
            axios.defaults.headers.common['Authorization'] = ``;
        }
    }
})