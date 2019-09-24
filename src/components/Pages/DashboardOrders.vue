<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-3">
      <thead class="thead-light">
        <tr>
          <th scope="col" width="80">是否付款</th>
          <th scope="col" width="200">訂單編號</th>
          <th scope="col" width="110">下單日期</th>
          <th scope="col">訂單留言</th>
          <th scope="col" width="100">訂單金額</th>
          <th scope="col" width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>
            <!-- <div
              class="rounded-circle mx-auto"
              :class="{'bg-success':item.is_paid,'bg-danger':!item.is_paid}"
              style="width:14px;height:14px"
            ></div>-->
            <div v-if="item.is_paid" class="text-success text-center">已付款</div>
            <div v-if="!item.is_paid" class="text-danger text-center">未付款</div>
          </td>
          <td>{{item.id}}</td>
          <td>{{item.create_at|FormatTime}}</td>
          <td>{{item.message}}</td>
          <td class="text-right">{{item.total|currency}}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="openModal(item)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pagination="pagination" @gopage="getOrdersData"></pagination>
    <div class="modal fade" id="OrderModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="OrderModalLabel">編輯訂單</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="form-row">
                <div class="col-md-3">
                  <div class>下單日期：{{tempOrder.create_at|FormatTime}}</div>
                </div>
                <div class="col-md-5">
                  <div class>訂單編號：{{tempOrder.id}}</div>
                </div>
                <div class="col-md-4">
                  <label for="payment_methods">付款方式：</label>
                  <select
                    name="payment_methods"
                    id="payment_methods"
                    v-model="tempOrder.payment_method"
                  >
                    <option value="credit_card">信用卡</option>
                    <option value="CVS_COD">超商取貨付款</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <div class>
                    付款狀態：
                    <span v-if="tempOrder.is_paid" class="text-success text-center">已付款</span>
                    <span v-if="!tempOrder.is_paid" class="text-danger text-center">未付款</span>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class>
                    付款日期：
                    <span v-if="tempOrder.is_paid">{{tempOrder.paid_date|FormatTime}}</span>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class>訂單總額：{{tempOrder.total}} 元</div>
                </div>
                <form class="col-12 mt-md-2 border-top border-bottom">
                  <div class="form-row mb-3">
                    <div class="col-12 h6 my-2">收件人資料</div>
                    <div class="col-md-6">
                      <label for="username">收件人姓名</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        name="name"
                        id="username"
                        placeholder="輸入姓名"
                        v-model="tempOrder.user.name"
                      />
                      <!-- <span class="text-danger" v-if="errors.has('name')">姓名欄位不得留空</span> -->
                    </div>
                    <div class="col-md-6">
                      <label for="usertel">收件人電話</label>
                      <input
                        type="tel"
                        class="form-control form-control-sm"
                        id="usertel"
                        name="tel"
                        placeholder="請輸入電話"
                        v-model="tempOrder.user.tel"
                      />
                      <!-- <span class="text-danger" v-if="errors.has('tel')">電話欄位不得留空</span> -->
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="useremail">Email</label>
                    <input
                      type="email"
                      class="form-control form-control-sm"
                      name="email"
                      id="useremail"
                      placeholder="請輸入 Email"
                      v-model="tempOrder.user.email"
                    />
                    <!-- <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span> -->
                  </div>

                  <div class="form-group">
                    <label for="useraddress">收件人地址</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      name="address"
                      id="useraddress"
                      placeholder="請輸入地址"
                      v-model="tempOrder.user.address"
                    />
                    <!-- <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span> -->
                  </div>

                  <div class="form-group">
                    <label for="comment">
                      客戶留言
                      <small class="text-muted"></small>
                    </label>
                    <textarea
                      name
                      id="comment"
                      class="form-control form-control-sm"
                      cols="30"
                      rows="4"
                      v-model="tempOrder.message"
                    ></textarea>
                  </div>
                </form>
                <table class="table">
                  <thead>
                    <tr>
                      <th width="30"></th>
                      <th>產品名稱</th>
                      <th width="80">售價</th>
                      <th width="70">數量</th>
                      <!-- <th width="40"></th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in tempOrder.products" :key="item.id">
                      <td>
                        <img :src="item.product.imageUrl" alt style="width:30px;height:30px" />
                      </td>
                      <td>{{item.product.title}}</td>
                      <td class="text-right">{{item.product.price|currency}}</td>
                      <td>{{item.qty}}/{{item.product.unit}}</td>
                      <!-- <td>
                        <div class="btn-group dropright">
                          <button
                            type="button"
                            class="btn btn-outline-danger btn-sm rounded"
                            data-toggle="dropdown"
                          >
                            <i class="fas fa-trash-alt"></i>
                          </button>
                          <div class="ml-2 dropdown-menu px-3">
                            <small class="text-danger">確定要刪除</small>
                            <button
                              class="btn btn-danger btn-sm"
                              @click="delProductInOrder(item.id,item)"
                            >確定</button>
                          </div>
                        </div>
                      </td>-->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateOrder">
              <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
              儲存變更
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "../DashboardPagination";
import $ from "jquery";
export default {
  data() {
    return {
      isLoading: false,
      orders: [],
      tempOrder: {
        create_at: "",
        id: "",
        is_paid: "",
        message: "",
        paid_date: "",
        payment_method: "",
        products: {},
        total: "",
        user: {
          address: "",
          email: "",
          name: "",
          tel: ""
        },
        num: ""
      },
      pagination: {}
    };
  },
  components: {
    Pagination
  },
  methods: {
    del(id) {
      delete this.test[id];
      console.log(this.test);
    },
    getOrdersData(page = 1) {
      let vm = this;
      vm.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      vm.$http.get(api).then(response => {
        console.log("後台取得訂單資料：", response);
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
      //將現有的分頁資料利用props傳到元件中，再利用emit將點擊時觸發的資料回傳到此頁面中，這樣就可以利用資料重新AJAX得到新的一筆分頁資料
      //函式中先預設變數帶入1
    },
    updateOrder() {
      let vm = this;
      vm.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
      vm.$http.put(api, { data: vm.tempOrder }).then(response => {
        console.log("更新訂單資料：", response);
        vm.getOrdersData();
        $("#OrderModal").modal("hide");
      });
    },
    // delProductInOrder(productId, item) {
    //   let vm = this;
    //   console.log(vm.tempOrder.products[productId]);
    //   delete vm.tempOrder.products[productId];
    //   console.log(vm.tempOrder.products);
    //   // vm.isLoading = true;
    //   // let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
    //   // vm.$http.put(api, { data: vm.tempOrder }).then(response => {
    //   //   console.log("更新訂單資料：", response);
    //   //   vm.getOrdersData();
    //   //   $("#OrderModal").modal("hide");
    //   // });
    // },
    openModal(item) {
      this.tempOrder = Object.assign({}, item);
      $("#OrderModal").modal("show");
    }
  },
  created() {
    this.getOrdersData();
  }
};
</script>