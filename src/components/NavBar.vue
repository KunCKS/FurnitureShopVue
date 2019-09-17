<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light" id="header-navbar">
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
    <a class="navbar-brand p-0 mx-md-0 mx-auto" href="#" @click.prevent="toHome">
      <img src="../assets/ASIN_logo.svg" style="width:80px" alt />
    </a>
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
      <ul class="navbar-nav ml-auto mr-3">
        <li class="nav-item mr-2">
          <a class="nav-link" href="#" @click.prevent="toProducts">產品</a>
        </li>
        <li class="nav-item mr-2">
          <a class="nav-link" href="#">尋找靈感</a>
        </li>
        <li class="nav-item mr-2">
          <a class="nav-link" href="#">優惠訊息</a>
        </li>
        <li class="nav-item mr-2">
          <a class="nav-link" href="#">查詢訂單</a>
        </li>
        <li class="nav-item mr-2">
          <a class="nav-link" href="#">
            <i class="fas fa-shopping-cart"></i>
          </a>
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
  methods: {
    flyoutShown() {
      $("#menuBtnInNavBar").toggleClass("menuBtn-shown");
      $("#sideNav").toggleClass("shown");
    },
    toProducts() {
      this.$router.push("/products");
    },
    toHome() {
      this.$router.push("/");
    }
  }
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