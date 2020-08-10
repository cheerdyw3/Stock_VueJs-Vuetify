import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';

import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

import ImageUploader from 'vue-image-upload-resize'
Vue.use(ImageUploader);

import VueAxios from "vue-axios";
import axios from "axios";
 
Vue.use(VueAxios, axios); 
 
Vue.config.productionTip = false;

new Vue({
  router, 
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
