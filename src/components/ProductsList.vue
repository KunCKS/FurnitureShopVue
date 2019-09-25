<template>
  <div class="row no-gutters">
    <loading :active.sync="isLoading"></loading>
    <div class="col-md-2">
      <div class="p-2 sticky-top products-side-bar">
        <div class="products-side-bar-title text-center mt-md-2 border-bottom">產品列表</div>
        <ul class="navbar-nav mt-md-2 pl-2" id="accordionProducts">
          <li class="nav-item">
            <div class="card border-0">
              <div class="card-header p-0 border-0 bg-white" id="productsHeadingOne">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle"
                    data-toggle="collapse"
                    data-target="#ProductsCollapseOne"
                  >沙發</button>
                </h5>
              </div>
              <div id="ProductsCollapseOne" class="collapse" data-parent="#accordionProducts">
                <div class="card-body">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item" v-for="item in seriesList" :key="item">
                      <a
                        class="nav-link"
                        href="#"
                        @click.prevent="filterTarget ={series:item ,category: '沙發'}"
                      >{{item}} 系列</a>
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
                  >椅子</button>
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
                        <a
                          class="nav-link"
                          href="#"
                          @click.prevent="filterTarget ={series:item ,category: '椅子'}"
                        >{{item}} 系列</a>
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
                  >桌子</button>
                </h5>
              </div>
              <div id="ProductsCollapseThree" class="collapse" data-parent="#accordionProducts">
                <div class="card-body">
                  <ul class="navbar-nav mr-auto">
                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item" v-for="(item,index) in seriesList" :key="index">
                        <a
                          class="nav-link"
                          href="#"
                          @click.prevent="filterTarget ={series:item ,category: '桌子'}"
                        >{{item}} 系列</a>
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
                  >收納系列</button>
                </h5>
              </div>
              <div id="ProductsCollapseFour" class="collapse" data-parent="#accordionProducts">
                <div class="card-body">
                  <ul class="navbar-nav mr-auto">
                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item" v-for="(item,index) in seriesList" :key="index">
                        <a
                          class="nav-link"
                          href="#"
                          @click.prevent="filterTarget ={series:item ,category: '收納系列'}"
                        >{{item}} 系列</a>
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
                <button class="btn btn-danger btn-sm ml-auto mr-2" @click="addCart(item.id)">
                  <i class="fas fa-spinner fa-spin" v-if="uploadCart"></i>加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <pagination></pagination> -->
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
export default {
  // props: ["productsData"],
  data() {
    return {
      productsData: [],
      isLoading: false, //AJAX作業時loading過場動畫
      uploadCart: false, //作為商品加入購物車時的過場動圖
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
    moreInfo(id) {
      this.$router.push(`/product/${id}`);
    }
    // product-card上更多細節的route
  },
  components: {
    Pagination
  },
  created() {
    const vm = this;
    vm.getProductData();
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.filterTarget.category === "") {
        return vm.productsData;
      } else {
        const filteredData = vm.productsData.filter((item, index, arr) => {
          return item.category === vm.filterTarget.category;
        });
        if (
          (vm.filterTarget.series === "全系列") |
          (vm.filterTarget.series === "")
        ) {
          return filteredData;
        } else {
          const Data = filteredData.filter((item, index, arr) => {
            return item.category_series === vm.filterTarget.series;
          });
          return Data;
        }
      }
    }
  }
};
</script>