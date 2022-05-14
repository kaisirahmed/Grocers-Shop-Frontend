import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from 'axios';
import { initialize } from './helpers/general';
import Modal from './components/modal/Modal.vue';

Axios.defaults.baseURL = 'http://localhost:8000/api/app/v1';
//Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

initialize(store, router);

const app = createApp(App)
  app.use(router)
  app.use(store)
  app.component('Modal', Modal)
  app.mount("#app");

