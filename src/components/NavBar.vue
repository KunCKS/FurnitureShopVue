<template>
  <nav
    class="navbar navbar-expand-md navbar-light index-navBar negative-row-margin"
    id="header-navbar"
  >
    <div class="cart-overlay" @click="dropdownToggle"></div>
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
          <!-- 查詢訂單隱藏的 menu -->
          <div class="dropdown-menu px-2 shadow">
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
        <li class="nav-item mr-2 d-none" v-if="isSignedIn">
          <a href="#" class="nav-link" @click.prevent="signout">會員登出</a>
        </li>
        <li class="nav-item mr-2 d-none" v-if="!isSignedIn">
          <router-link class="nav-link" to="/login">會員登入</router-link>
        </li>
      </ul>
    </div>
    <div class="dropdown ml-auto mr-md-0 mr-3">
      <a href="#" class="nav-link navBar-cart-icon cart-dropdown" @click="dropdownToggle">
        <i class="fas fa-shopping-bag"></i>
        <span
          class="badge badge-danger rounded-circle navBar-cart-totalItems"
          v-if="cartData.carts"
        >{{cartData.carts.length}}</span>
      </a>
      <!-- 購物車隱藏的 menu -->
      <div class="cart-dropdown-menu px-3 shadow rounded">
        <h6 class="text-primary">已選擇商品</h6>
        <div class="table-scroll">
          <div class="text-center py-6" v-if="cartData.carts.length < 1">購物車沒有產品喔！！</div>
          <table class="table table-sm">
            <tbody>
              <tr v-for="(item,index) in cartData.carts" :key="item.id">
                <td class="align-middle">
                  <button
                    type="button"
                    :id="`NavBarCart-${index}`"
                    class="btn btn-outline-danger btn-sm border-0"
                    @click="removeCartItem(item.id,index)"
                  >
                    <i class="far fa-trash-alt" v-if="currentProductId !== item.id"></i>
                    <i class="fas fa-spinner fa-spin" v-if="currentProductId === item.id"></i>
                  </button>
                </td>
                <td class="align-middle">
                  <div
                    class="bg-cover"
                    :style="`background-image:url('${item.product.imageUrl}');width:35px;height:35px`"
                  ></div>
                </td>
                <td class="align-middle">
                  <div class="text-muted">
                    <div class="cart-title">{{item.product.title}}</div>
                    <div class="cart-unit text-primary">{{item.qty}}/{{item.product.unit}}</div>
                  </div>
                </td>
                <td class="align-middle text-right">
                  <span class="text-success cart-price">{{item.product.price|currency}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="d-flex justify-content-between align-items-center pt-2 px-2 pb-2 border-top border-bottom"
        >
          <span>小計</span>
          <span class="h5 m-0 text-success">{{cartData.total|currency}}</span>
        </div>
        <a href="#" class="btn btn-block btn-outline-primary mt-2" @click="toCart">結帳去</a>
      </div>
    </div>
  </nav>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      isSignedIn: false,
      //利用eventBus來變換值，作為頁面登入登出文字顯示的判斷
      cartData: {
        carts: []
      },
      order_id: "", //綁定查詢訂單時輸入的資料
      currentProductId: ""
    };
  },
  methods: {
    // 登出功能
    signout() {
      let vm = this;
      let api = `${process.env.APIPATH}/logout`;
      vm.$http.post(api).then(response => {
        vm.$bus.$emit("message:push", response.data.message);
        vm.isSignedIn = false;
        vm.$router.push("/home");
      });
    },
    //取得購物車的資料
    getCartData() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(api).then(response => {
        console.log("取得購物車資料：", response);
        vm.cartData = response.data.data;
      });
    },
    //購物車內移除項目的功能
    removeCartItem(id, index) {
      const vm = this;
      $(`#NavBarCart-${index}`).attr("disabled", true);
      vm.currentProductId = id;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.$http.delete(api).then(response => {
        console.log("刪除購物車資料：", response);
        vm.$bus.$emit("reGetCart"); //由於商品添加、刪除時購物車資料會變動，所以利用event bus觸發重新取得購物車資料
        vm.getCartData();
      });
    },
    //查詢訂單功能
    toOrder() {
      this.$router.push(`customercheckout/${this.order_id}`);
      this.order_id = "";
    },
    // 動態切換購物車 menu等 ClassName，相關樣式內容參考navBar.scss
    dropdownToggle() {
      // console.log($(".dropdown-toggle"));
      $(".cart-dropdown-menu").toggleClass("show");
      $("body").toggleClass("of-hidden");
      $(".cart-overlay").toggleClass("show");
    },
    //結帳按鈕觸發時關閉購物車並導向結帳畫面
    toCart() {
      this.dropdownToggle();
      this.$router.push("/cart");
    },
    flyoutShown() {
      $("#menuBtnInNavBar").toggleClass("menuBtn-shown");
      $("#sideNav").toggleClass("shown");
      $("#menuBtnInNavBar").toggleClass("menuBtn-shown");
      //點擊替換className達到sidebar動畫效果
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