import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  Toast,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  newestOnTop: true,
});
