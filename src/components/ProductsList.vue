<template>
  <div class="row no-gutters">
    <loading :active.sync="status.isLoading"></loading>
    <!-- 商品sidebar -->
    <div class="col-md-2">
      <div class="p-2 sticky-top products-side-bar">
        <div class="px-3 py-4 border-top h6 mb-0">商品列表</div>
        <ul class="navbar-nav" id="accordionProducts">
          <li class="nav-item border-top py-2">
            <div class="card border-0">
              <div class="card-header p-0 border-0 bg-white" id="productsHeadingOne">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle h7 mb-0 pl-md-3 pr-md-1"
                    data-toggle="collapse"
                    data-target="#ProductsCollapseOne"
                  >
                    沙發
                    <span class="h8">SOFAS</span>
                  </button>
                </h5>
              </div>
              <div id="ProductsCollapseOne" class="collapse" data-parent="#accordionProducts">
                <div class="card-body py-2">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item" v-for="item in seriesList" :key="item">
                      <router-link
                        class="nav-link h7 font-weight-normal mb-0"
                        :to="`/products/沙發/${item}`"
                      >{{item}} 系列</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li class="nav-item border-top py-2">
            <div class="card border-0">
              <div class="card-header p-0 border-0 bg-white" id="productsHeadingTwo">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle h7 mb-0 pl-md-3 pr-md-1"
                    data-toggle="collapse"
                    data-target="#ProductsCollapseTwo"
                  >
                    椅子
                    <span class="h8">CHAIRS</span>
                  </button>
                </h5>
              </div>
              <div
                id="ProductsCollapseTwo"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionProducts"
              >
                <div class="card-body py-2">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item" v-for="(item,index) in seriesList" :key="index">
                      <router-link
                        class="nav-link h7 font-weight-normal mb-0"
                        :to="`/products/椅子/${item}`"
                      >{{item}} 系列</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li class="nav-item border-top py-2">
            <div class="card border-0">
              <div class="card-header p-0 border-0 bg-white" id="productsHeadingThree">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle h7 mb-0 pl-md-3 pr-md-1"
                    data-toggle="collapse"
                    data-target="#ProductsCollapseThree"
                  >
                    桌子
                    <span class="h8">TABLES</span>
                  </button>
                </h5>
              </div>
              <div id="ProductsCollapseThree" class="collapse" data-parent="#accordionProducts">
                <div class="card-body py-2">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item" v-for="(item,index) in seriesList" :key="index">
                      <router-link
                        class="nav-link h7 font-weight-normal mb-0"
                        :to="`/products/桌子/${item}`"
                      >{{item}} 系列</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li class="nav-item border-top border-bottom py-2">
            <div class="card border-0">
              <div class="card-header p-0 border-0 bg-white" id="productsHeadingFour">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle h7 mb-0 pl-md-3 pr-md-1"
                    data-toggle="collapse"
                    data-target="#ProductsCollapseFour"
                  >
                    收納系列
                    <span class="h8">STORAGE</span>
                  </button>
                </h5>
              </div>
              <div id="ProductsCollapseFour" class="collapse" data-parent="#accordionProducts">
                <div class="card-body py-2">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item" v-for="(item,index) in seriesList" :key="index">
                      <router-link
                        class="nav-link h7 font-weight-normal mb-0"
                        :to="`/products/收納系列/${item}`"
                      >{{item}} 系列</router-link>
                    </li>
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
        <div class="col-md-6 mb-md-3 mt-md-0 mt-2" v-for="item in filterData" :key="item.id">
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
            <div class="products-card-footer text-muted border-0 p-3 row no-gutters">
              <div class="col-8 my-auto">
                <div class="products-card-title text-left">{{item.category_series}}</div>
                <div class="products-card-title text-left text-muted">{{item.title}}</div>
              </div>
              <div class="col-4">
                <div class="products-card-originPrice text-right">
                  原價
                  <strike>{{item.origin_price|currency}}</strike>
                </div>
                <div class="products-card-price text-right">特價 {{item.price|currency}}</div>
              </div>
              <div class="col-12 d-flex mt-2">
                <button class="btn btn-primary btn-sm ml-auto" @click="addCart(item.id)">
                  <i class="fas fa-spinner fa-spin" v-if="status.product_id === item.id"></i> 加入購物車
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
//自訂元件
import Pagination from "./Pagination";
//外部插件
import $ from "jquery";
export default {
  data() {
    return {
      productsData: [], //商品資料
      pageProducts: [], //分頁商品資料
      pagination: {}, //分頁頁碼資料
      status: {
        isLoading: false, //AJAX作業時loading過場動畫
        product_id: "" //作為商品加入購物車時的過場動圖條件
      },
      seriesList: [] //利用function過濾出來的產品系列

      // filterTarget: {   //原本作為過濾data的變數，不使用了，詳細說明到最下方看。
      //   series: "",
      //   category: ""
      // },
    };
  },
  methods: {
    //取得商品資料
    getProductData() {
      const vm = this;
      vm.status.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.$http.get(api).then(response => {
        // console.log("產品頁面取得資料：", response);
        vm.productsData = response.data.products;
        vm.seriesList = response.data.products
          .map(item => {
            return item.category_series;
          })
          .filter((item, index, arr) => {
            return arr.indexOf(item) === index;
          });
        //關於seriesList過濾，indexOf若直接item.category_series並與filter(item, index, arr)中arr每項資料做比對是會沒有結果的，
        //所以要利用map()將要過濾的資料先建立為新的陣列，再做filter()
        vm.seriesList.unshift("所有"); //在陣列最前面加入新的data
        vm.status.isLoading = false;
      });
    },
    //取得分頁資料
    getPagination(page = 1) {
      const vm = this;
      vm.status.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      vm.$http.get(api).then(response => {
        // console.log("取得pagination資料：", response);
        vm.pageProducts = response.data.products;
        vm.pagination = response.data.pagination;
        vm.status.isLoading = false;
      });
    },
    //添加商品到購物車
    addCart(id, qty = 1) {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.product_id = id; //將當前id添加到product_id變數中作為動態icon的開關條件
      let item = {
        product_id: id,
        qty: qty
      };
      vm.$http.post(api, { data: item }).then(response => {
        // console.log("加到購物車內：", response);
        if (response.data.success) {
          vm.status.product_id = ""; //將product_id 值去除，作為動態icon的開關條件
          vm.$bus.$emit("message:push", response.data.message, "success"); // 觸發事件使頁面回應動作後的訊息，可參考bus.js
          vm.$bus.$emit("reGetCart"); //觸發重新讀取購物車資料的事件，可參考bus.js
        } else {
          vm.status.product_id = "";
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
    //將商品頁面導至單一商品頁面
    moreInfo(id) {
      this.$router.push(`/product/${id}`);
      $(window).scrollTop(0);
    }
  },
  components: {
    Pagination
  },
  created() {
    this.getProductData();
    this.getPagination();
  },
  computed: {
    //商品頁面資料呈現的過濾機制
    filterData() {
      const vm = this;
      if (
        (vm.$route.fullPath === "/products/") |
        (vm.$route.fullPath === "/products")
      ) {
        return vm.pageProducts; //當在 products route時，則以10筆資料為一頁的方式呈現（AJAX取得得分頁資料）
      } else {
        //以下做法是利用$route.params來改變過濾的條件，因此各個route-link只要帶入到需要的route就可進行資料的過濾。
        //這邊先過濾category再進行series的過濾
        const filteredData = vm.productsData.filter(item => {
          return item.category === vm.$route.params.category;
        });
        //ex:沙發的所有系列
        if (
          (vm.$route.params.series === "所有") |
          (vm.$route.params.series === "")
        ) {
          return filteredData;
        } else {
          //ex:沙發的其他系列
          const Data = filteredData.filter(item => {
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