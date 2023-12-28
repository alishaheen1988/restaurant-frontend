import { defineStore } from 'pinia'
import axios from "axios";

export const useMainStore = defineStore('mainStore', {
    state: () => ({
        root_url: process.env.VUE_APP_BACKEND_URL,
        token: localStorage.getItem("access_token") || null,
        user_name: localStorage.getItem("user_name") || "",
        restaurant_menu: null
    }),
    getters: {
        loggedIn() {
            return this.token ? true : false;
        }
    },
    actions: {
        setToken(user_name, token) {
            localStorage.setItem("user_name", user_name);
            localStorage.setItem("access_token", token);
            this.token = token;
            this.user_name = user_name;
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        },
        destroyToken() {
            this.token = null;
            this.user_name = "";
            localStorage.removeItem("access_token");
            localStorage.removeItem("user_name");
            axios.defaults.headers.common['Authorization'] = ``;
        },
        getRestaurantMenu() {
            axios
                .get(this.root_url + 'categories')
                .then((response) => {
                    this.restaurant_menu = response.data.data;
                }).catch((err) => {
                    console.log(err)
                })
        }
    }
})