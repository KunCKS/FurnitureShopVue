<template>
  <div class="container pt-md-3 pb-md-5 pgHightRevise">
    <loading :active.sync="isLoading"></loading>
    <div class="row">
      <div class="col-md-8">
        <div class="h4 text-center">購 物 車 清 單</div>
        <table class="table">
          <thead>
            <th width="30"></th>
            <th colspan="2" width="42">品名</th>
            <th width="70" class="text-center">數量</th>
            <th width="90">單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cartData.carts" :key="item.id">
              <td class="align-middle">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm border-0"
                  @click="removeCartItem(item.id)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td>
                <div
                  class="bg-cover"
                  :style="`background-image:url('${item.product.imageUrl}');width: 42px;height:42px`"
                ></div>
              </td>
              <td>
                <div class="text-muted">{{item.product.category}} {{item.product.title}}</div>
              </td>
              <td class="align-middle text-center">
                <div class>{{item.qty}}</div>
              </td>
              <td class="align-middle text-right">
                <span class="text-success">{{item.product.price|currency}}</span>
                <del class="text-muted">{{item.product.origin_price|currency}}</del>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center" v-if="cartData.carts.length < 1">購物車沒有產品喔！！</div>
      </div>
      <div class="col-md-4 border p-3">
        <div class="h5 text-center border-bottom pb-2">購 物 車 合 計</div>
        <div class="d-flex">
          <h6>總計</h6>
          <span class="ml-auto">{{cartData.total|currency}}</span>
        </div>
        <div class="d-flex">
          <h6>折扣價</h6>
          <span class="ml-auto">{{cartData.total|currency}}</span>
        </div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="couponCode" />
          <div class="input-group-append">
            <button
              class="btn btn-outline-primary"
              type="button"
              id="button-addon2"
              @click="useCoupon"
            >套用優惠碼</button>
          </div>
        </div>
        <a
          href="#"
          class="btn btn-outline-success btn-block"
          :class="{'disabled':cartData.carts.length < 1}"
          @click.prevent="toCustomerOrder"
        >前往結帳</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartData: {
        carts: {
          0: { product: { imageUrl: "" } }
        }
      },
      isLoading: false,
      couponCode: ""
    };
  },
  methods: {
    getCartData() {
      const vm = this;
      vm.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(api).then(response => {
        console.log("取得購物車資料：", response);
        vm.cartData = response.data.data;
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.$http.delete(api).then(response => {
        console.log("刪除購物車資料：", response);
        vm.$bus.$emit("reGetCart");
        vm.getCartData();
      });
    },
    useCoupon() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const code = { code: vm.couponCode };
      vm.$http.post(api, { data: code }).then(response => {
        console.log("套用Coupon：", response);
        if (response.data.success) {
          vm.cartData.final_total = response.data.data.final_total;
          vm.$bus.$emit("message:push", response.data.message, "success");
          vm.isLoading = false;
        } else {
          vm.$bus.$emit("message:push", response.data.message, "danger");
          vm.isLoading = false;
        }
      });
    },
    toCustomerOrder() {
      this.$router.push("/CustomerOrder");
    }
  },
  created() {
    this.getCartData();
  }
};
</script>