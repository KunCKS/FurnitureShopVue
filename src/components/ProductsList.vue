<template>
  <div class="row no-gutters">
    <loading :active.sync="isLoading"></loading>
    <!-- 商品sidebar -->
    <div class="col-md-2">
      <div class="p-2 sticky-top products-side-bar">
        <div class="products-side-bar-title text-center mt-md-2 border-bottom">產品列表</div>
        <!-- <div>{{filterTarget.series}}{{filterTarget.category}}</div> -->
        <ul class="navbar-nav mt-md-2 pl-2" id="accordionProducts">
          <li class="nav-item">
            <div class="card border-0">
              <div class="card-header p-0 border-0 bg-white" id="productsHeadingOne">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle"
                    data-toggle="collapse"
                    data-target="#ProductsCollapseOne"
                  >沙發 SOFAS</button>
                </h5>
              </div>
              <div id="ProductsCollapseOne" class="collapse" data-parent="#accordionProducts">
                <div class="card-body">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item" v-for="item in seriesList" :key="item">
                      <router-link class="nav-link" :to="`/products/沙發/${item}`">{{item}} 系列</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li class="nav-item">
            <div class="card border-0">
              <div class="card-header p-0 border-0 bg-white" id="productsHeadingTwo">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle"
                    data-toggle="collapse"
                    data-target="#ProductsCollapseTwo"
                  >椅子 CHAIRS</button>
                </h5>
              </div>
              <div
                id="ProductsCollapseTwo"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionProducts"
              >
                <div class="card-body">
                  <ul class="navbar-nav mr-auto">
                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item" v-for="(item,index) in seriesList" :key="index">
                        <router-link class="nav-link" :to="`/products/椅子/${item}`">{{item}} 系列</router-link>
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li class="nav-item">
            <div class="card border-0">
              <div class="card-header p-0 border-0 bg-white" id="productsHeadingThree">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle"
                    data-toggle="collapse"
                    data-target="#ProductsCollapseThree"
                  >桌子 DESKS</button>
                </h5>
              </div>
              <div id="ProductsCollapseThree" class="collapse" data-parent="#accordionProducts">
                <div class="card-body">
                  <ul class="navbar-nav mr-auto">
                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item" v-for="(item,index) in seriesList" :key="index">
                        <router-link class="nav-link" :to="`/products/桌子/${item}`">{{item}} 系列</router-link>
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li class="nav-item">
            <div class="card border-0">
              <div class="card-header p-0 border-0 bg-white" id="productsHeadingFour">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle"
                    data-toggle="collapse"
                    data-target="#ProductsCollapseFour"
                  >收納系列 STORAGE</button>
                </h5>
              </div>
              <div id="ProductsCollapseFour" class="collapse" data-parent="#accordionProducts">
                <div class="card-body">
                  <ul class="navbar-nav mr-auto">
                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item" v-for="(item,index) in seriesList" :key="index">
                        <router-link class="nav-link" :to="`/products/收納系列/${item}`">{{item}} 系列</router-link>
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="col-md-10">
      <div class="text-center py-6" v-if="filterData.length == 0">此系列產品，設計師還在努力創作中！</div>
      <div class="row mx-0 mt-md-2">
        <div class="col-md-6 mb-md-3" v-for="item in filterData" :key="item.id">
          <div class="products-card text-center border border-white shadow">
            <div class="products-card-imgSection">
              <a
                href="#"
                class="products-card-link text-decoration-none"
                @click.prevent="moreInfo(item.id)"
              >
                <div class="products-card-overlay d-flex">
                  <div class="btn btn-outline-secondary btn-sm m-auto">更多細節</div>
                </div>
              </a>
              <div
                class="bg-cover products-card-img"
                :style="`background-image:url('${item.imageUrl}')`"
              ></div>
            </div>
            <div class="products-card-footer text-muted border-0 row no-gutters">
              <div class="col-md-8 my-auto">
                <div class="pl-3 products-card-title text-left">{{item.category_series}}</div>
                <div class="pl-3 products-card-title text-left text-muted">{{item.title}}</div>
              </div>
              <div class="col-md-4 py-3">
                <div
                  class="products-card-originPrice text-right pr-3"
                >原價 {{item.origin_price|currency|cashSign}}</div>
                <div class="products-card-price text-right pr-3">特價 {{item.price|currency|cashSign}}</div>
              </div>
              <div class="col-12 p-1 d-flex">
                <button class="btn btn-primary btn-sm ml-auto mr-2" @click="addCart(item.id)">
                  <i class="fas fa-spinner fa-spin" v-if="product_id === item.id"></i> 加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <pagination
        v-if="$route.fullPath === '/products/' | $route.fullPath === '/products'"
        :pagination="pagination"
        @gopage="getPagination"
      ></pagination>
      <div class="row py-md-8 py-2 no-gutters">
        <div class="col-11 border-top mx-auto d-md-block d-none"></div>
      </div>
    </div>
  </div>
</template>

<script>
//上面模板包含了sidebar及產品list，相關CSS樣式寫在productsSideBar.scss及productsCard.scss
//
import Pagination from "./Pagination";
import $ from "jquery";
export default {
  // props: ["productsData"],
  data() {
    return {
      productsData: [],
      pageProducts: [],
      pagination: {},
      isLoading: false, //AJAX作業時loading過場動畫
      product_id: "", //作為商品加入購物車時的過場動圖條件
      filterTarget: {
        series: "",
        category: ""
      }, //filter target
      seriesList: [] //利用function過濾出來的產品系列
      // categoryList: []
    };
  },
  methods: {
    getProductData() {
      const vm = this;
      vm.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.$http.get(api).then(response => {
        console.log("產品頁面取得資料：", response);
        vm.productsData = response.data.products;
        vm.seriesList = response.data.products
          .map(item => {
            return item.category_series;
          })
          .filter((item, index, arr) => {
            return arr.indexOf(item) === index;
          });
        //關於seriesList過濾，indexOf若直接item.category_series並與filter(item, index, arr)中arr每項資料做比對是會沒有結果的，所以要利用map()將要過濾的資料先建立為新的陣列，再做filter()
        vm.seriesList.unshift("全系列"); //在陣列最前方加入新的data
        // vm.categoryList = response.data.products
        //   .map(item => {
        //     return item.category;
        //   })
        //   .filter((item, index, arr) => {
        //     return arr.indexOf(item) === index;
        //   });
        // vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    getPagination(page = 1) {
      const vm = this;
      vm.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      vm.$http.get(api).then(response => {
        console.log("取得pagination資料：", response);
        vm.pageProducts = response.data.products;
        vm.pagination = response.data.pagination;
        // vm.categoryList = response.data.products
        //   .map(item => {
        //     return item.category;
        //   })
        //   .filter((item, index, arr) => {
        //     return arr.indexOf(item) === index;
        //   });
        // vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    addCart(id, qty = 1) {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.product_id = id;
      let item = {
        product_id: id,
        qty: qty
      };
      vm.$http.post(api, { data: item }).then(response => {
        console.log("加到購物車內：", response);
        if (response.data.success) {
          vm.product_id = "";
          vm.$bus.$emit("message:push", response.data.message, "success");
          vm.$bus.$emit("reGetCart");
        } else {
          vm.product_id = "";
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
    moreInfo(id) {
      this.$router.push(`/product/${id}`);
      $(window).scrollTop(0);
    }
    // product-card上進入單一商品頁面的route
  },
  components: {
    Pagination
  },
  created() {
    this.getProductData();
    this.getPagination();
  },
  computed: {
    filterData() {
      const vm = this;
      if (
        (vm.$route.fullPath === "/products/") |
        (vm.$route.fullPath === "/products")
      ) {
        return vm.pageProducts; //當在 products route時，則以10筆資料為一頁的方式呈現
      } else {
        const filteredData = vm.productsData.filter((item, index, arr) => {
          return item.category === vm.$route.params.category;
        });
        if (
          (vm.$route.params.series === "全系列") |
          (vm.$route.params.series === "")
        ) {
          return filteredData;
        } else {
          const Data = filteredData.filter((item, index, arr) => {
            return item.category_series === vm.$route.params.series;
          });
          return Data;
        }
      }
      //記錄一下修正過程
      //原本過濾data是利用 product sidebar點擊時將不同的category及series值帶到data中的變數filterTarget來進行過濾
      //但這樣要利用外外層(隔了一層)的抽屜式sidebar來點擊進行頁面移動及data傳入非常麻煩
      //原本嘗試event bus的方式，但在兩route的hook中會導致無法擷取到資料
      //想破頭想不到解決方式
      //後來觀察到電商網頁在切換不同產品時期route會改變，才豁然開朗也可以利用route來傳遞要filter的target
    }
  }
};
</script>