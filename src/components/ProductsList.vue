<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mx-0 mt-md-2">
      <div class="col-md-6 mb-md-3" v-for="item in productsData" :key="item.id">
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
              <div class="pl-3 products-card-title text-left">{{item.category}}</div>
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
</template>

<script>
import Pagination from "./Pagination";
export default {
  // props: ["productsData"],
  data() {
    return {
      productsData: [],
      isLoading: false,
      uploadCart: false
    };
  },
  methods: {
    getProductList() {
      const vm = this;
      vm.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.$http.get(api).then(response => {
        console.log("產品頁面取得資料：", response);
        vm.productsData = response.data.products;
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
        vm.uploadCart = false;
      });
    },
    moreInfo(id) {
      this.$router.push(`/product/${id}`);
    }
  },
  components: {
    Pagination
  },
  created() {
    this.getProductList();
  },
  computed: {
    filterData() {}
  }
};
</script>