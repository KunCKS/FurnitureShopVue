<template>
  <div class="container-fluid pdPage pgHightRevise pb-9">
    <loading :active.sync="status.isLoading"></loading>
    <div class="row mt-md-4">
      <!-- 商品圖片 section-->
      <div class="col-md-7">
        <div class="pdPage-imgSection">
          <div class="pdPage-img shadow-lg">
            <a href="#" class="backwardBtn" @click.prevent="backward">Back</a>
            <img class="w-100" :src="productData.imageUrl" alt />
          </div>
        </div>
      </div>
      <!-- 商品資訊 section-->
      <div class="col-md-5">
        <div class="pdPage-info px-4">
          <div class="pb-4 border-bottom">
            <h4 class="text-muted mt-2 mt-sm-0">{{productData.category_series}}</h4>
            <h2 class>{{productData.title}}</h2>
          </div>

          <div class="py-4">
            <h4>【商品介紹】</h4>
            <p class="mt-3">{{productData.description}}</p>
          </div>
          <div class="py-4">
            <h4>【商品詳情】</h4>
            <div class="form-row justify-content-center mt-4">
              <div class="col-10">
                <table class="table">
                  <tbody>
                    <tr>
                      <th>高度:</th>
                      <td>{{detail.height}} cm</td>
                    </tr>
                    <tr>
                      <th>寬度:</th>
                      <td>{{detail.width}} cm</td>
                    </tr>
                    <tr>
                      <th>深度:</th>
                      <td>{{detail.depth}} cm</td>
                    </tr>
                    <tr>
                      <th>座位高度:</th>
                      <td>{{detail.seatingHeight}} cm</td>
                    </tr>
                    <tr>
                      <th>扶手高度:</th>
                      <td>{{detail.armrestHeight}} cm</td>
                    </tr>
                    <tr>
                      <th>支腿高度:</th>
                      <td>{{detail.legsHeight}} cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="pdPage-info-price px-3 text-right">
            <del v-if="productData.origin_price">NT{{productData.origin_price|currency}}</del>
            <div class="text-success h3 d-inline-block">NT{{productData.price|currency}}</div>
          </div>
          <div class="row mx-0 no-gutters">
            <div class="col-lg-5">
              <div class="input-group">
                <div class="input-group-prepend">
                  <a
                    href="#"
                    class="btn btn-outline-secondary"
                    :class="{'disabled':qty ===1}"
                    id="button-addon1"
                    @click.prevent="qty = qty - 1"
                  >−</a>
                </div>
                <input type="number" min="1" class="form-control text-center" v-model.number="qty" />
                <div class="input-group-append">
                  <a
                    href="#"
                    class="btn btn-outline-secondary"
                    :class="{'disabled':qty ===99}"
                    id="button-addon2"
                    @click.prevent="qty = qty + 1"
                  >+</a>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <button
                class="btn btn-block btn-primary border ml-lg-2 mt-lg-0 mt-3 rounded-0"
                @click="addCart(productData.id,qty)"
              >
                <i class="fas fa-spinner fa-spin" v-if="status.uploadCart"></i>
                加到購物車
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--    相關商品 section    -->
      <div class="col-12 mt-6">
        <div class="similar-products-section px-3">
          <div class="similar-products-title">
            <span class="similar-products-title-content">相關商品</span>
          </div>
          <div class="row py-3 similar-products-content">
            <button class="btn pre" @click.prevent="similarPre" :disabled="transPage == 0">
              <i class="fas fa-angle-left"></i>
            </button>
            <button class="btn next" @click="similarNext" :disabled="transPage  == totalTransPage">
              <i class="fas fa-angle-right"></i>
            </button>
            <div
              class="col-lg-3 col-md-4 col-sm-6 col-12 similar-products"
              v-for="item in filterSimilar"
              :key="item.id"
              :style="`left:${translating}%`"
            >
              <div class="products-card text-center border border-white shadow-sm">
                <div class="products-card-imgSection">
                  <a
                    href="#"
                    class="products-card-link text-decoration-none"
                    @click.prevent="toProductPage(item.id)"
                  >
                    <div class="products-card-overlay d-flex">
                      <div class="btn btn-outline-secondary btn-sm m-auto">更多細節</div>
                    </div>
                  </a>
                  <div
                    class="bg-cover similar-products-card-img"
                    :style="`background-image:url('${item.imageUrl}')`"
                  ></div>
                </div>
                <div class="products-card-footer text-muted border-0 row no-gutters">
                  <div class="col-12 py-3">
                    <div class="products-card-title text-center text-muted">{{item.title}}</div>
                  </div>
                  <div class="col-12">
                    <div
                      class="products-card-originPrice text-right pr-3"
                    >原價 {{item.origin_price|currency}}</div>
                    <div class="products-card-price text-right pr-3">特價 {{item.price|currency}}</div>
                  </div>
                  <div class="col-12 p-1 d-flex">
                    <button class="btn btn-primary btn-block" @click="toProductPage(item.id)">更多細節</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//外部插件
import $ from "jquery";
export default {
  data() {
    return {
      nextDisabled: false, //
      status: {
        isLoading: false,
        uploadCart: false //作為商品加入購物車時的過場動圖條件
      },
      translating: 0, //綁定DOM style='left:值 '，相關商品是利用flex-nowrap overflow-hidden變成一長列，所以利用位移來製造移動的效果
      transPage: 0,
      products: [],
      productData: {
        //取得單筆資料
        imageUrl: ""
      },
      qty: 1, //這邊綁定使用者增加的數量，注意在DOM上的v-model要添加修飾符.number，否則預設會將值轉成string，導致自行輸入數字再利用btn添加時數字錯亂

      detail: {
        height: "85½",
        width: "366",
        depth: "325",
        seatingHeight: "41½",
        armrestHeight: "61½",
        legsHeight: "3½"
      },
      products: [],
      screenWidth: 0
    };
  },
  methods: {
    //取得單筆商品資料，利用$route.params來取得要做AJAX的目標
    getProductData() {
      const vm = this;
      const id = vm.$route.params.id;
      console.log(id);
      vm.status.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.$http.get(api).then(response => {
        console.log("取得單筆產品資料：", response);
        vm.productData = response.data.product;
        vm.status.isLoading = false;
      });
    },
    //取得全部資料，作為相關商品的資料
    getProductsData() {
      const vm = this;
      vm.status.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.$http.get(api).then(response => {
        console.log("取得全部商品資料：", response);
        vm.products = response.data.products;
        vm.status.isLoading = false;
      });
    },
    //添加商品到購物車
    addCart(id, qty = 1) {
      const vm = this;
      vm.status.uploadCart = true; //作為購物車動態icon的開關條件
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      let item = {
        product_id: id,
        qty: qty
      };
      vm.$http.post(api, { data: item }).then(response => {
        console.log("加到購物車內：", response);
        if (response.data.success) {
          vm.status.uploadCart = false; //作為購物車動態icon的開關條件
          vm.$bus.$emit("message:push", response.data.message, "success"); // 觸發事件使頁面回應動作後的訊息，可參考bus.js
          vm.$bus.$emit("reGetCart"); //觸發重新讀取購物車資料的事件，可參考bus.js
        } else {
          vm.status.uploadCart = false;
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
    //回到上一頁
    backward() {
      this.$router.back();
    },
    //向右位移相關商品
    similarNext() {
      const vm = this;
      vm.transPage += 1; //記錄位移頁碼，作為防止過度位移的參考
      vm.translating = -100 * vm.transPage;
    },
    //向左位移相關商品
    similarPre() {
      const vm = this;
      vm.transPage -= 1; //記錄位移頁碼
      vm.translating = -100 * vm.transPage;
    },
    //從目前商品頁面導航至相關商品的目標商品，注意這邊要重新getProductData一次，否則會呈現同一筆資料
    toProductPage(id) {
      const vm = this;
      vm.$router.push(`/product/${id}`);
      // $(window).scrollTop(0);
      vm.getProductData();
    }
  },
  computed: {
    //先過濾吊同樣的商品，再過濾同series的商品。
    filterSimilar() {
      const vm = this;
      return vm.products
        .filter(item => {
          return item.id !== vm.$route.params.id;
        })
        .filter(item => {
          return item.category_series == vm.productData.category_series;
        });
    },
    //計算目前相關商品數量因頁面大小顯示，會生成的頁數（位移的最大值）。
    //當目前頁碼與總頁數相等時則button會開啟disabled的屬性，使移動的韓式無法觸發
    //原本使用a連結來套用disabled ClassName禁止觸發位移函式，但點擊時會穿到而發生點擊到下方的相關商品，導致頁面轉換，所以改以button來使用
    totalTransPage() {
      // console.log($(window).width());
      const vm = this;
      if (vm.screenWidth < 576) {
        // console.log("<576");
        return Math.floor(vm.filterSimilar.length);
      } else if (vm.screenWidth < 768 && vm.screenWidth >= 576) {
        // console.log(">576");
        return Math.floor(vm.filterSimilar.length / 2);
      } else if (vm.screenWidth < 992 && vm.screenWidth >= 768) {
        // console.log(">768");
        return Math.floor(vm.filterSimilar.length / 3);
      } else {
        // console.log(">992");
        return Math.floor(vm.filterSimilar.length / 4);
      }
    }
  },
  created() {
    const vm = this;
    vm.getProductData();
    vm.getProductsData();
    vm.screenWidth = $(window).width(); //在渲染初期就要宣告screenWidth數值，否則會以 screenWidth < 576的方式計算total
    //當視窗大小改變時重新取得視窗寬度
    window.onresize = () => {
      if (vm.$route.fullPath.indexOf("/product/") !== 0) {
        window.onresize = null; //取消監視
        return; //return 退出函式，否則下面語法一樣會執行一次。
      }
      vm.screenWidth = $(window).width();
      // console.log($(window).width());
    };
  }
};
</script>