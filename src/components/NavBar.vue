<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light home-navBar" id="header-navbar">
    <a
      href="#"
      class="menuBtn position-absolute d-md-none"
      @click.prevent="flyoutShown"
      id="menuBtnInNavBar"
    >
      <div class="btnBar"></div>
      <div class="btnBar"></div>
      <div class="btnBar"></div>
    </a>
    <router-link class="p-0 mx-md-0 ml-6" to="/home">
      <img src="../assets/ASIN_logo.svg" style="width:80px" alt />
    </router-link>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item mr-2">
          <router-link class="nav-link" to="/products">商品</router-link>
        </li>
        <li class="nav-item mr-2">
          <router-link class="nav-link" to="/promotion">最新消息</router-link>
        </li>
        <li class="nav-item mr-2">
          <router-link class="nav-link" to="/promotion#contact">聯絡我們</router-link>
        </li>
        <li class="nav-item dropdown mr-2">
          <a href="#" class="nav-link dropdown-toggle" role="button" data-toggle="dropdown">查詢訂單</a>
          <div class="dropdown-menu px-2">
            <div class="input-group input-group-sm">
              <input type="text" class="form-control border" placeholder="訂單編號" v-model="order_id" />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  @click.prevent="toOrder"
                >送出</button>
              </div>
            </div>
          </div>
        </li>
        <li class="nav-item mr-2" v-if="isSignedIn">
          <a href="#" class="nav-link" @click.prevent="signout">會員登出</a>
        </li>
        <li class="nav-item mr-2" v-if="!isSignedIn">
          <router-link class="nav-link" to="/login">會員登入</router-link>
        </li>
        <li class="nav-item mr-2">
          <router-link class="nav-link navBar-cart-icon" to="/cart">
            <i class="fas fa-shopping-cart"></i>
            <span
              class="badge badge-danger rounded-circle navBar-cart-totalItems"
              v-if="cartData.carts"
            >{{cartData.carts.length}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <router-link class="navBar-cart-icon-collapse mr-2" to="/cart">
      <i class="fas fa-shopping-cart"></i>
      <span
        class="badge badge-danger rounded-circle navBar-cart-totalItems"
        v-if="cartData.carts"
      >{{cartData.carts.length}}</span>
    </router-link>
  </nav>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      isSignedIn: false,
      //利用eventBus來變換值，作為登入登出的判斷
      cartData: [],
      order_id: ""
    };
  },
  methods: {
    flyoutShown() {
      $("#menuBtnInNavBar").toggleClass("menuBtn-shown");
      $("#sideNav").toggleClass("shown");
    },
    signout() {
      let vm = this;
      let api = `${process.env.APIPATH}/logout`;
      vm.$http.post(api).then(response => {
        vm.$bus.$emit("message:push", response.data.message);
        vm.isSignedIn = false;
        vm.$router.push("/home");
      });
    },
    getCartData() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(api).then(response => {
        console.log("取得購物車資料：", response);
        vm.cartData = response.data.data;
      });
    },
    toOrder() {
      this.$router.push(`customercheckout/${this.order_id}`);
      this.order_id = "";
    }
  },
  created() {
    const vm = this;
    vm.getCartData();
    vm.$bus.$on("signIn", () => {
      vm.isSignedIn = true;
      //監視signIn事件，用來改變isSignedIn值
    });
    vm.$bus.$on("reGetCart", () => {
      vm.getCartData();
      //
    });
  }
  // scroll滑動數據
  // created() {
  //   let lastScrollY = 0;
  //   $(window).scroll(() => {
  //     console.log(scrollY, lastScrollY);
  //     if (scrollY < lastScrollY) {
  //       console.log("往上");
  //     } else {
  //       console.log("往下");
  //     }
  //     lastScrollY = scrollY;
  //   });
  // }
};
</script>