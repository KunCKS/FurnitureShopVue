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

//導航守衛
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    let api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then(response => {
      console.log("檢查用戶是否仍持續登入：", response);
      if (response.data.success) {
        next();
      } else {
        alert("請重新登入");
        next({
          path: "/login"
        });
      }
    });
    //這邊設定若path的meta帶的requiresAuth變數為true時，則執行api做驗證，若response是true，則調用next()讓其通過到 to，否則就回傳login的path到next()中將route轉到登入頁面。
  } else {
    next();
    //記得這邊要再調用一次next()，否則會守衛會卡住頁面等待你下指令ＱＱ
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
