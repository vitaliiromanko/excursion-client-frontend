import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import axios from "axios";
import store from "@/store";
import Vue3Toasity, { toast } from "vue3-toastify";

import "@/assets/main.css";
import "@/interceptors/index.js";
import "@/validation/index.js";

import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";
import "@vueform/multiselect/themes/default.css";

import "vue3-toastify/dist/index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas);
library.add(far);
library.add(fab);

axios.defaults.baseURL =
  "https://excursion-client-production.up.railway.app/api/v1/client";

const app = createApp(App);

app.use(router).use(store).use(Vue3Toasity, {
  multiple: false,
  autoClose: 8000,
  position: toast.POSITION.TOP_CENTER,
});
app.mount("#app");
