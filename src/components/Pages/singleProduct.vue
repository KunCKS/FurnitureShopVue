<template>
  <div class="container-fluid pdPage pgHightRevise pb-9">
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-md-4">
      <div class="col-md-7">
        <div class="pdPage-imgSection">
          <div class="pdPage-img shadow-lg">
            <a href="#" class="backwardBtn" @click.prevent="backward">Back</a>
            <img class="w-100" :src="productData.imageUrl" alt />
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="pdPage-info px-4">
          <div class="pb-4 border-bottom">
            <h4 class="text-muted mt-2 mt-sm-0">{{productData.category}}</h4>
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
                <i class="fas fa-spinner fa-spin" v-if="uploadCart"></i>
                加到購物車
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mt-6">
        <div class="similar-products-section px-3">
          <div class="similar-products-title">
            <span class="similar-products-title-content">相關商品</span>
          </div>
          <div class="row flex-nowrap overflow-hidden py-3 similar-products-content">
            <button class="btn pre" @click.prevent="similarPre" :disabled="transPage == 0">
              <i class="fas fa-angle-left"></i>
            </button>
            <button class="btn next" @click="similarNext" :disabled="transPage == totalTransPage">
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
import $ from "jquery";
export default {
  data() {
    return {
      nextDisabled: false,
      product_id: false,
      isLoading: false,
      translating: 0,
      transPage: 0,
      products: [],
      productData: {
        imageUrl: ""
      },
      qty: 1, //這邊綁定使用者增加的數量，注意在DOM上的v-model要添加修飾符.number，否則預設會將值轉成string，導致自行輸入數字再利用btn添加時數字錯亂
      uploadCart: false, //作為商品加入購物車時的過場動圖條件
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
    getProductData() {
      const vm = this;
      const id = vm.$route.params.id;
      console.log(id);
      vm.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.$http.get(api).then(response => {
        console.log("取得單筆產品資料：", response);
        vm.productData = response.data.product;
        vm.isLoading = false;
      });
    },
    getProductsData() {
      const vm = this;
      vm.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.$http.get(api).then(response => {
        console.log("取得全部商品資料：", response);
        vm.products = response.data.products;
        vm.isLoading = false;
      });
    },
    addCart(id, qty = 1) {
      const vm = this;
      vm.uploadCart = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      let item = {
        product_id: id,
        qty: qty
      };
      vm.$http.post(api, { data: item }).then(response => {
        console.log("加到購物車內：", response);
        if (response.data.success) {
          vm.uploadCart = false;
          vm.$bus.$emit("message:push", response.data.message, "success");
          vm.$bus.$emit("reGetCart");
        } else {
          vm.uploadCart = false;
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
    backward() {
      this.$router.back();
    },
    similarNext() {
      const vm = this;
      vm.transPage += 1;
      vm.translating = -100 * vm.transPage;
      // console.log($(window).width());
    },
    similarPre() {
      const vm = this;
      vm.transPage -= 1;
      vm.translating = -100 * vm.transPage;
    },
    toProductPage(id) {
      const vm = this;
      vm.$router.push(`/product/${id}`);
      $(window).scrollTop(0);
      vm.getProductData();
    }
  },
  computed: {
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
    this.getProductData();
    this.getProductsData();
    this.screenWidth = $(window).width(); //在渲染初期就要宣告screenWidth數值，否則會以 screenWidth < 576的方式計算total
    window.onresize = () => {
      this.screenWidth = $(window).width();
      // console.log($(window).width());
    };
  }
};
</script>