<template>
  <div>
    <div class="text-right py-3">
      <button class="btn btn-large btn-secondary">新建Coupon</button>
    </div>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">Coupon名稱</th>
          <th scope="col" width="200">Coupon Code</th>
          <th scope="col" width="110">截止日</th>
          <th scope="col" width="100">是否啟用</th>
          <th scope="col" width="130">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.code}}</td>
          <td>{{item.due_date|FormatTime}}</td>
          <td>{{item.is_enabled}}</td>
          <td>
            <button class="btn btn-primary btn-sm">編輯</button>
            <button class="btn btn-danger btn-sm">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import $ from "jquery";
import pagination from "../Pagination";
export default {
  data() {
    return {
      coupons: [
        {
          due_date: 1555459200,
          id: "-L9u5Cgodczattv-7i8D",
          is_enabled: 1,
          percent: 70,
          title: "超級特惠價格2"
        },
        {
          due_date: 6547658,
          is_enabled: 1,
          percent: 80,
          title: "超級特惠價格"
        }
      ]
    };
  }
};
</script>

