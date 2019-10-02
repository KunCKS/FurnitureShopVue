<template>
  <div class="container pt-md-3 pb-md-5 pgHightRevise">
    <loading :active.sync="status.isLoading"></loading>
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="row">
          <div class="col-12 col-sm">
            <div class="alert alert-primary text-center alert-rounded" role="alert">1.輸入訂單資料</div>
          </div>
          <div class="col-12 col-sm">
            <div class="alert border-primary text-center alert-rounded" role="alert">2.金流付款</div>
          </div>
          <div class="col-12 col-sm">
            <div class="alert border-primary text-center alert-rounded" role="alert">3.完成</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-md-4">
      <form class="col-md-7 px-4">
        <div class="form-row mb-3">
          <div class="col-12 h5 mb-3 text-center">訂單資訊</div>
          <div class="col-md-6">
            <label for="username">收件人姓名</label>
            <input
              type="text"
              class="form-control"
              :class="{'is-invalid':errors.has('name')}"
              name="name"
              id="username"
              v-validate="'required'"
              placeholder="輸入姓名"
              v-model="order.user.name"
            />
            <span class="text-danger" v-if="errors.has('name')">姓名欄位不得留空</span>
          </div>
          <div class="col-md-6">
            <label for="usertel">收件人電話</label>
            <input
              type="tel"
              class="form-control"
              :class="{'is-invalid':errors.has('tel')}"
              id="usertel"
              name="tel"
              placeholder="請輸入電話"
              v-validate="'required'"
              v-model="order.user.tel"
            />
            <span class="text-danger" v-if="errors.has('tel')">電話欄位不得留空</span>
          </div>
        </div>

        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            :class="{'is-invalid':errors.has('email')}"
            name="email"
            id="useremail"
            v-validate="'required|email'"
            placeholder="請輸入 Email"
            v-model="order.user.email"
          />
          <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid':errors.has('address')}"
            name="address"
            id="useraddress"
            v-validate="'required'"
            placeholder="請輸入地址"
            v-model="order.user.address"
          />
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="comment">
            備註
            <small class="text-muted">(選填)</small>
          </label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="4"
            v-model="order.message"
          ></textarea>
        </div>
      </form>

      <div class="col-md-5 border shadow d-flex flex-column">
        <div class="h5 text-center mt-3">您的訂單</div>
        <table class="table mt-3">
          <thead>
            <tr>
              <td>商品</td>
              <td width="100">總計</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartData.carts" :key="item.id">
              <td>{{item.product.title}} Ｘ{{item.qty}}</td>
              <td class="text-right">{{item.product.price|currency}}</td>
            </tr>
          </tbody>
          <tfoot class="border-top">
            <tr>
              <th>總計</th>
              <td class="text-right">{{cartData.total|currency}}</td>
            </tr>
            <tr v-if="cartData.final_total < cartData.total">
              <th>
                折扣價
                <small class="text-success">(已套用coupon優惠)</small>
              </th>
              <td class="text-right">{{cartData.final_total|currency}}</td>
            </tr>
          </tfoot>
        </table>
        <div class="order-submit-section p-2 mt-auto">
          <div class="d-flex">
            <strong class>配送方式</strong>
            <div class="ml-auto">
              <div class="form-check ml-auto">
                <input
                  class="form-check-input"
                  :class="{'is-invalid':errors.has('payment')}"
                  type="radio"
                  name="payment"
                  id="CVS_COD"
                  value="CVS_COD"
                  v-model="order.user.payment_method"
                  checked
                  v-validate="'required'"
                />
                <label class="form-check-label mr-3" for="CVS_COD">超商付款</label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  :class="{'is-invalid':errors.has('payment')}"
                  type="radio"
                  name="payment"
                  id="credit_card"
                  value="credit_card"
                  v-model="order.user.payment_method"
                  v-validate="'required'"
                />
                <label class="form-check-label" for="credit_card">信用卡付款</label>
              </div>
              <div class="text-danger" v-if="errors.has('payment')">請選擇付款方式</div>
            </div>
          </div>

          <button class="btn btn-outline-success btn-block mt-4" @click.prevent="createOrder">
            <i class="fas fa-spinner fa-spin" v-if="status.uploadCart"></i>送出訂單
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//上面表單使用vee-validate套件來做驗證，errors為套件所提供的變數，其可調用has,first等方法，has內的值指向input的name屬性。
import $ from "jquery";
export default {
  data() {
    return {
      status: {
        isLoading: false,
        uploadCart: false
      },
      cartData: {}, //取得的購物車資料
      //建立訂單資料用以傳送到後端
      order: {
        user: {},
        message: ""
      }
    };
  },
  methods: {
    //取得購物車資料
    getCartData() {
      const vm = this;
      vm.status.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(api).then(response => {
        // console.log("取得購物車資料：", response);
        vm.cartData = response.data.data;
        vm.status.isLoading = false;
      });
    },
    //建立訂單資料並傳送
    createOrder(e) {
      const vm = this;
      $(e.target).attr("disabled", true); //避免重複點擊
      vm.status.uploadCart = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.order;
      //利用vee validator進行驗證，這邊是防止資料不完全則無法通過的語法
      this.$validator.validate().then(valid => {
        if (valid) {
          vm.$http.post(api, { data: order }).then(response => {
            // console.log("建立訂單：", response);
            if (response.data.success) {
              vm.$bus.$emit("reGetCart");
              vm.$router.push(`/customercheckout/${response.data.orderId}`);
              vm.status.uploadCart = false;
              $(e.target).removeAttr("disabled");
            } else {
              vm.status.uploadCart = false;
              vm.$bus.$emit(
                "message:push",
                "訂單建立失敗，請洽客服人員",
                "danger"
              );
              $(e.target).removeAttr("disabled");
            }
          });
        } else {
          vm.status.uploadCart = false;
          $(e.target).removeAttr("disabled");
        }
      });
    }
  },
  created() {
    this.getCartData();
  }
};
</script>