import Vue from "vue";
Vue.prototype.$bus = new Vue();
//在Vue實體的prototype下再新建一個名為$bus的Vue實體作為監視用

//自訂事件

// Alert.vue
// 自定義事件名稱為 'messsage:push'
// message: 傳入參數
// status: class樣式，預設值為 warning

// NavBar.vue
// 自定義事件名稱為 'signIn'
// 監視signIn事件並改變isSignedIn變數boolean值
