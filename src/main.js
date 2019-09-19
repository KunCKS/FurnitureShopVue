// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VeeValidate from "vee-validate";
import Loading from "vue-loading-overlay";
import "bootstrap";
import App from "./App";
import router from "./router";
import CurrencyFilter from "./filters/Currency";
import CashSignFilter from "./filters/cashSign";
import FormatTime from "./filters/FormatTime";

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.component("loading", Loading);
Vue.filter("currency", CurrencyFilter);
Vue.filter("cashSign", CashSignFilter);
Vue.filter("FormatTime", FormatTime);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
