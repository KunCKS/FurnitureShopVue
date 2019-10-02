<template>
  <div class="container pt-md-3 pb-md-5 pgHightRevise">
    <loading :active.sync="status.isLoading"></loading>
    <div class="row">
      <!--    左側購物清單    -->
      <div class="col-md-8">
        <div class="h4 text-center">購 物 車 清 單</div>
        <table class="table" v-if="cartData.carts.length >= 1">
          <thead>
            <th width="30"></th>
            <th colspan="2">品名</th>
            <th width="75" class="text-center">數量</th>
            <th width="90">單價</th>
          </thead>
          <tbody>
            <tr v-for="(item,index) in cartData.carts" :key="item.id">
              <td class="align-middle">
                <button
                  :id="`cart-del-${index}`"
                  type="button"
                  class="btn btn-outline-danger btn-sm border-0"
                  @click="removeCartItem(item.id,index)"
                >
                  <i class="far fa-trash-alt" v-if="status.currentProductId !== item.id"></i>
                  <i class="fas fa-spinner fa-spin" v-if="status.currentProductId === item.id"></i>
                </button>
              </td>
              <td width="42" class="align-middle">
                <div
                  class="bg-cover"
                  :style="`background-image:url('${item.product.imageUrl}');width: 42px;height:42px`"
                ></div>
              </td>
              <td class="align-middle">
                <div class="text-muted">
                  <span class="d-md-inline-block d-none">{{item.product.category_series}}</span>
                  {{item.product.title}}
                </div>
              </td>
              <td class="align-middle text-center">
                <div class>{{item.qty}}/{{item.product.unit}}</div>
              </td>
              <td class="align-middle text-right">
                <span class="text-success">{{item.product.price|currency}}</span>
                <del class="text-muted">{{item.product.origin_price|currency}}</del>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="py-6 text-center border-top border-bottom" v-if="cartData.carts.length < 1">
          <div class="h5">購物車沒有商品喔！</div>
          <router-link class="btn btn-primary mt-3" to="/products">繼續購物</router-link>
        </div>
      </div>
      <!--    右側購物小計    -->
      <div class="col-md-4 mt-md-0 mt-2">
        <div class="border p-3 shadow">
          <div class="h5 text-center border-bottom pb-2">購 物 車 合 計</div>
          <div class="d-flex">
            <h6>總計</h6>
            <span class="ml-auto" v-if="cartData.total">{{cartData.total|currency}}</span>
          </div>
          <div class="d-flex">
            <div class="d-flex" v-if="cartData.final_total < cartData.total">
              <h6>折扣價</h6>
              <small class="text-success">(已套用coupon優惠)</small>
            </div>
            <span
              class="ml-auto text-success"
              v-if="cartData.final_total < cartData.total"
            >{{cartData.final_total|currency}}</span>
          </div>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="請輸入優惠碼"
              v-model="couponCode"
              @keyup.enter="useCoupon"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-primary"
                type="button"
                id="button-addon2"
                @click="useCoupon"
              >套用優惠碼</button>
            </div>
            <small
              class="ml-auto text-success py-1"
              v-if="cartData.final_total >= cartData.total"
            >現在輸入OPEN50OFF即可享有折扣價喔!</small>
          </div>
          <router-link
            class="btn btn-outline-success btn-block"
            :class="{'disabled':cartData.carts.length < 1}"
            to="/CustomerOrder"
          >前往結帳</router-link>
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
      //取得的購物車資料
      cartData: {
        carts: {
          0: { product: { imageUrl: "" } }
        }
      },
      status: { isLoading: false, currentProductId: "" },
      couponCode: "" //綁定使用者輸入的coupon
    };
  },
  methods: {
    //取得購物車資料
    getCartData() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(api).then(response => {
        // console.log("取得購物車資料：", response);
        vm.cartData = response.data.data;
      });
    },
    //刪除購物車中的資料
    removeCartItem(id, index) {
      const vm = this;
      $(`#cart-del-${index}`).attr("disabled", true);
      vm.status.currentProductId = id;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.$http.delete(api).then(response => {
        // console.log("刪除購物車資料：", response);
        vm.$bus.$emit("reGetCart");
        vm.getCartData();
      });
    },
    //使用coupon折扣
    useCoupon() {
      const vm = this;
      vm.status.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const code = { code: vm.couponCode };
      vm.$http.post(api, { data: code }).then(response => {
        // console.log("套用Coupon：", response);
        if (response.data.success) {
          vm.cartData.final_total = response.data.data.final_total;
          vm.$bus.$emit("message:push", response.data.message, "success");
          vm.status.isLoading = false;
        } else {
          vm.$bus.$emit("message:push", response.data.message, "danger");
          vm.status.isLoading = false;
        }
      });
    }
  },
  created() {
    this.getCartData();
    //更新購物車資料
    this.$bus.$on("reGetCart", () => {
      this.getCartData();
    });
  }
};
</script>