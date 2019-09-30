<template>
  <div class="container" style="min-height:calc(100vh - 83.38px - 205.6px - 24px)">
    <loading :active.sync="isLoading"></loading>
    <div class="row justify-content-center my-4">
      <div class="col-12">
        <div class="form-row">
          <div class="col-12 col-sm">
            <div class="alert alert-light text-center alert-rounded" role="alert">1.輸入訂單資料</div>
          </div>
          <div class="col-12 col-sm">
            <div
              class="alert text-center alert-rounded"
              :class="{'alert-primary':!isPaid,'alert-light':isPaid}"
              role="alert"
            >2.金流付款</div>
          </div>
          <div class="col-12 col-sm">
            <div
              class="alert text-center alert-rounded"
              :class="{'alert-primary':isPaid,'alert-light':!isPaid}"
              role="alert"
            >3.完成</div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row border p-4 shadow justify-content-center">
          <div class="col-12">
            <table class="table">
              <tbody>
                <tr>
                  <th class="border-0" width="120">下單日期</th>
                  <td class="border-0">{{orderData.create_at|FormatTime}}</td>
                </tr>
                <tr>
                  <th width="120">Email</th>
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
                    <span v-if="!isPaid">尚未付款</span>
                    <span class="text-success" v-if="isPaid">付款完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-5" v-if="!isPaid">
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
export default {
  data() {
    return {
      orderData: { user: { email: "" } },
      isLoading: false,
      isPaid: false
    };
  },
  methods: {
    getOrderData() {
      const vm = this;
      vm.isLoading = true;
      const id = vm.$route.params.id;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${id}`;
      vm.$http.get(api).then(response => {
        console.log("取得訂單資料：", response);
        if (response.data.order == null) {
          vm.$bus.$emit("message:push", "查無此訂單", "warning");
          vm.$router.push("/home");
        } else {
          vm.orderData = response.data.order;
          vm.isPaid = response.data.order.is_paid;
          vm.isLoading = false;
        }
      });
    },
    checkout() {
      const vm = this;
      vm.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderData.id}`;
      vm.$http.post(api).then(response => {
        console.log("結帳付款：", response);
        if (response.data.success) {
          vm.isPaid = true;
          vm.isLoading = false;
        } else {
          vm.$bus.$emit("message:push", "付款失敗", "danger");
          vm.isLoading = false;
        }
      });
    }
  },
  created() {
    this.getOrderData();
  }
};
</script>