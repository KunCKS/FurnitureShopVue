<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right py-3">
      <button class="btn btn-large btn-secondary" @click="openModal(true)">新建Coupon</button>
    </div>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">Coupon名稱</th>
          <th scope="col" width="200">Coupon Code</th>
          <th scope="col" width="110">截止日</th>
          <th scope="col" width="80">折數</th>
          <th scope="col" width="130">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.code}}</td>
          <td>{{item.due_date|FormatTime}}</td>
          <td>
            {{item.percent}}
            <!-- <span v-if="item.is_enabled">已啟用</span>
            <span v-if="!item.is_enabled">未啟用</span>-->
          </td>
          <td>
            <a
              class="btn btn-outline-primary btn-sm"
              href="#"
              @click.prevent="openModal(false,item)"
            >編輯</a>
            <a
              class="btn btn-outline-danger btn-sm"
              href="#"
              @click.prevent="openModal(false,item,true)"
            >刪除</a>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pagination="pagination" @gopage="getCouponsData"></pagination>
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="couponModalLabel">
              <span v-if="isNew">新增Coupon</span>
              <span v-if="!isNew">編輯Coupon</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempCoupon.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="category">折數</label>
                    <input
                      type="number"
                      class="form-control"
                      id="category"
                      placeholder="請輸入折數"
                      v-model="tempCoupon.percent"
                    />
                  </div>
                  <div class="form-group col-md-12">
                    <label for="price">折扣碼</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入折扣碼"
                      v-model="tempCoupon.code"
                    />
                  </div>
                  <div class="form-group col-md-12">
                    <label for="origin_price">到期日</label>
                    <input
                      type="date"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入到期日"
                      v-model="tempCoupon.due_date"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">
              <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delcouponModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="delcouponModalLabel">
              <span>刪除Coupon</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 {{tempCoupon.title}} Coupon。
            <strong class="text-danger">(刪除後將無法恢復)</strong>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="removeCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import pagination from "../Pagination";
export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      isLoading: false,
      isNew: false,
      tempCoupon: {},
      tempTimestamp: ""
    };
  },
  methods: {
    getCouponsData(page = 1) {
      let vm = this;
      vm.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      vm.$http.get(api).then(response => {
        console.log("後台取得Coupons資料：", response);
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
      //將現有的分頁資料利用props傳到元件中，再利用emit將點擊時觸發的資料回傳到此頁面中，這樣就可以利用資料重新AJAX得到新的一筆分頁資料
      //函式中先預設變數帶入1
    },
    updateCoupon() {
      let vm = this;
      vm.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let method = "post";
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        method = "put";
      }
      vm.formatTimestamp(vm.tempCoupon.due_date);
      const coupon = vm.tempCoupon;
      vm.$http[method](api, { data: coupon }).then(response => {
        if (!response.data.success) {
          console.log("更新coupon失敗", response);
          vm.isLoading = false;
          $("#couponModal").modal("hide");
        } else {
          console.log("updateCoupon:", response);
          vm.isLoading = false;
          $("#couponModal").modal("hide");
          vm.getCouponsData();
        }
      });
    },
    removeCoupon() {
      let vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      vm.$http.delete(api).then(response => {
        console.log("deleteCoupons:", response);
        vm.isLoading = false;
        if (!response.data.success) {
          console.log(response.data.message);
        }
        $("#delcouponModal").modal("hide");
        vm.getCouponsData();
      });
    },
    openModal(isNew, item, isDel) {
      if (isNew) {
        this.tempCoupon = {};
        this.tempTimestamp = "";
        this.isNew = true;
      } else if (!isNew && isDel) {
        this.tempCoupon = Object.assign({}, item);
        $("#delcouponModal").modal("show");
        return;
      } else {
        this.tempCoupon = Object.assign({}, item);
        this.formatTime(this.tempCoupon.due_date);
        this.isNew = false;
      }
      $("#couponModal").modal("show");
    },
    formatTime(timestamp) {
      let dates = new Date(timestamp * 1000);
      let year = dates.getFullYear();
      let month =
        dates.getMonth() < 10
          ? `0${dates.getMonth() + 1}`
          : dates.getMonth() + 1;
      let date = dates.getDate() < 10 ? `0${dates.getDate()}` : dates.getDate();
      this.tempCoupon.due_date = `${year}-${month}-${date}`;
      console.log("formatTime:", this.tempCoupon.due_date);
    },
    formatTimestamp(date) {
      let dates = new Date(date);
      this.tempCoupon.due_date = Math.floor(dates.getTime() / 1000);
      console.log("formatTimestamp:", this.tempCoupon.due_date);
    }
  },
  created() {
    this.getCouponsData();
  },
  components: {
    pagination
  }
};
</script>

