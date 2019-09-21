// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VeeValidate from "vee-validate";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import "bootstrap";
import App from "./App";
import router from "./router";
import "./bus";
import CurrencyFilter from "./filters/Currency";
import CashSignFilter from "./filters/cashSign";
import FormatTime from "./filters/FormatTime";

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
//跨域API cookie儲存問題修正
Vue.use(VeeValidate);
Vue.use(VueAxios, axios);
Vue.component("loading", Loading);
//此插件還有css檔要匯入！要記得看清楚API！
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
