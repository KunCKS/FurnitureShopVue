<template>
  <div>
    <div class="text-right py-3">
      <button class="btn btn-large btn-secondary">新建產品</button>
    </div>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col" width="80">是否付款</th>
          <th scope="col" width="200">訂單編號</th>
          <th scope="col" width="110">下單日期</th>
          <th scope="col">訂單留言</th>
          <th scope="col" width="100">訂單金額</th>
          <th scope="col" width="130">編輯</th>
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
            <button class="btn btn-primary btn-sm">編輯</button>
            <button class="btn btn-danger btn-sm">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        {
          create_at: 1523539834,
          id: "-L9u2EUkQSoEmW7QzGLF",
          is_paid: true,
          message: "這是留言",
          paid_date: 1523539924,
          payment_method: "credit_card",
          products: [
            {
              id: "L8nBrq8Ym4ARI1Kog4t",
              product_id: "-L8moRfPlDZZ2e-1ritQ",
              qty: "3"
            }
          ],
          total: 100,
          user: {
            address: "kaohsiung",
            email: "test@gmail.com",
            name: "test",
            tel: "0912346768"
          },
          num: 1
        },
        {
          create_at: 1523539519,
          id: "-L9u11NAE0m0SpSBUDIq",
          is_paid: false,
          message: "這是留言",
          payment_method: "credit_card",
          products: [
            {
              id: "L8nBrq8Ym4ARI1Kog4t",
              product_id: "-L8moRfPlDZZ2e-1ritQ",
              qty: "3"
            }
          ],
          user: {
            address: "kaohsiung",
            email: "test@gmail.com",
            name: "test",
            tel: "0912346768"
          },
          num: 2
        }
      ]
    };
  }
};
</script>