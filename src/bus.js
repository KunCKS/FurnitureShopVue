import Vue from "vue";
Vue.prototype.$bus = new Vue();
//在Vue實體的prototype下再新建一個名為$bus的Vue實體作為監視用
