<template>
  <div class="container" style="min-height:calc(100vh - 83.38px - 205.6px - 24px)">
    <loading :active.sync="status.isLoading"></loading>
    <div class="row justify-content-center my-4">
      <div class="col-12">
        <div class="form-row">
          <div class="col-12 col-sm">
            <div class="alert border-primary text-center alert-rounded" role="alert">1.輸入訂單資料</div>
          </div>
          <div class="col-12 col-sm">
            <div
              class="alert text-center alert-rounded"
              :class="{'alert-primary':!status.isPaid,'border-primary':status.isPaid}"
              role="alert"
            >2.金流付款</div>
          </div>
          <div class="col-12 col-sm">
            <div
              class="alert text-center alert-rounded"
              :class="{'alert-primary':status.isPaid,'border-primary':!status.isPaid}"
              role="alert"
            >3.完成</div>
          </div>
        </div>
      </div>
      <div class="col-md-6 mt-md-4">
        <div class="row border p-4 shadow justify-content-center">
          <div class="col-12">
            <table class="table">
              <tbody>
                <tr>
                  <th class="border-0" width="120">下單日期</th>
                  <td class="border-0">{{orderData.create_at|FormatTime}}</td>
                </tr>
                <tr>
                  <th>訂單編號</th>
                  <td>{{orderData.id}}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{{orderData.user.email}}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>{{orderData.user.name}}</td>
                </tr>
                <tr>
                  <th>收件人電話</th>
                  <td>{{orderData.user.tel}}</td>
                </tr>
                <tr>
                  <th>收件人地址</th>
                  <td>{{orderData.user.address}}</td>
                </tr>
                <tr>
                  <th>訂單金額</th>
                  <td>{{orderData.total|currency}}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <span v-if="!status.isPaid">尚未付款</span>
                    <span class="text-success" v-if="status.isPaid">付款完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-5" v-if="!status.isPaid">
            <div class="text-right">
              <button class="btn btn-danger btn-block" @click="checkout">確認付款去</button>
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
      orderData: { user: { email: "" } },
      status: {
        isLoading: false,
        isPaid: false //作為是否已付款的條件變數
      }
    };
  },
  methods: {
    //取得訂單資料
    getOrderData() {
      const vm = this;
      vm.status.isLoading = true;
      const id = vm.$route.params.id; //利用route提供要帶入api的值
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${id}`;
      vm.$http.get(api).then(response => {
        // console.log("取得訂單資料：", response);
        if (response.data.order == null) {
          vm.$bus.$emit("message:push", "查無此訂單", "warning");
          vm.$router.push("/home");
        } else {
          vm.orderData = response.data.order;
          vm.status.isPaid = response.data.order.is_paid;
          vm.status.isLoading = false;
        }
      });
    },
    //確定付款功能
    checkout(e) {
      const vm = this;
      vm.status.isLoading = true;
      $(e.target).addClass("disabled");
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderData.id}`;
      vm.$http.post(api).then(response => {
        // console.log("結帳付款：", response);
        if (response.data.success) {
          vm.status.isPaid = true;
          vm.status.isLoading = false;
        } else {
          vm.$bus.$emit("message:push", "付款失敗", "danger");
          vm.status.isLoading = false;
        }
      });
    }
  },
  created() {
    this.getOrderData();
  }
};
</script>