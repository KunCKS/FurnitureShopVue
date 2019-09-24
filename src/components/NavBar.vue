<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light home-navbar-zindex" id="header-navbar">
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
    <router-link class="p-0 mx-md-0 mx-auto" to="/home">
      <img src="../assets/ASIN_logo.svg" style="width:80px" alt />
    </router-link>
    <!-- <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>-->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item mr-2">
          <router-link class="nav-link" to="/products">產品</router-link>
        </li>
        <li class="nav-item mr-2">
          <router-link class="nav-link" to>優惠訊息</router-link>
        </li>
        <li class="nav-item mr-2">
          <router-link class="nav-link" to>聯絡我們</router-link>
        </li>
        <li class="nav-item mr-2">
          <router-link class="nav-link" to>查詢訂單</router-link>
        </li>
        <li class="nav-item mr-2" v-if="isSignedIn">
          <a href="#" class="nav-link" @click.prevent="signout">會員登出</a>
        </li>
        <li class="nav-item mr-2" v-if="!isSignedIn">
          <router-link class="nav-link" to="/login">會員登入</router-link>
        </li>
        <li class="nav-item mr-2">
          <router-link class="nav-link" to="/cart">
            <i class="fas fa-shopping-cart"></i>
          </router-link>
        </li>
      </ul>
      <!-- <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>-->
    </div>
  </nav>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      isSignedIn: false
      //利用eventBus來變換值，作為登入登出的判斷
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
    }
  },
  created() {
    let vm = this;
    vm.$bus.$on("signIn", () => {
      vm.isSignedIn = true;
      //監視signIn事件，用來改變isSignedIn值
    });
  }
  //scroll滑動數據
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