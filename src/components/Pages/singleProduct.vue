<template>
  <div class="container-fluid pdPage pgHightRevise pb-9">
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-md-4">
      <div class="col-md-7">
        <div class="pdPage-imgSection">
          <div class="pdPage-img shadow-lg">
            <img class="w-100" :src="productData.imageUrl" alt />
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="pdPage-info px-3">
          <div class="pl-3 pb-4 border-bottom">
            <h4 class="text-muted">{{productData.category}}</h4>
            <h2 class>{{productData.title}}</h2>
          </div>

          <div class="pl-3 py-4">
            <h4>【產品介紹】</h4>
            <p class="mt-3">{{productData.description}}</p>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-md-7 d-flex justify-content-">
                <div class="pdPage-info px-3">
                  <div class="pdPage-info-price">
                    <div class="text-success h3 d-inline-block">NT{{productData.price|currency}}</div>
                    <del v-if="productData.origin_price">NT{{productData.origin_price|currency}}</del>
                  </div>
                  <div class="input-group mt-2">
                    <div class="input-group-prepend">
                      <a
                        class="btn btn-outline-secondary"
                        :class="{'disabled':qty ===1}"
                        type="button"
                        id="button-addon1"
                        @click.prevent="qty = qty - 1"
                      >−</a>
                    </div>
                    <input
                      type="number"
                      min="1"
                      class="form-control text-center"
                      v-model.number="qty"
                    />
                    <div class="input-group-append">
                      <a
                        class="btn btn-outline-secondary"
                        :class="{'disabled':qty ===99}"
                        type="button"
                        id="button-addon2"
                        @click.prevent="qty = qty + 1"
                      >+</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-5 d-flex align-items-end">
                <button
                  class="btn btn-outline-primary px-4 border ml-auto rounded-0"
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      productData: {
        imageUrl: ""
      },
      qty: 1, //這邊綁定使用者增加的數量，注意在DOM上的v-model要添加修飾符.number，否則預設會將值轉成string，導致自行輸入數字再利用btn添加時數字錯亂
      uploadCart: false
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
    }
  },
  created() {
    this.getProductData();
  }
};
</script>