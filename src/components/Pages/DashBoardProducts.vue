<template>
  <div>
    <div class="text-right py-3">
      <button class="btn btn-large btn-secondary">新建產品</button>
    </div>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col" width="80">分類</th>
          <th scope="col">產品名稱</th>
          <th scope="col" width="110">原價</th>
          <th scope="col" width="110">售價</th>
          <th scope="col" width="100">是否啟用</th>
          <th scope="col" width="130">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price|currency}}</td>
          <td class="text-right">{{item.price|currency}}</td>
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
//在main.js中引入bootstrap時，雖然有安裝jQuery及propers，但他們只是bootstrap的相依套件而已，並沒有載入到裡面來，
// 所以這邊要自己引入到元件內＄才有定義
export default {
  data() {
    return {
      products: [
        {
          category: "衣服2",
          content: "這是內容",
          description: "Sit down please 名設計師設計",
          id: "-L9tH8jxVb2Ka_DYPwng",
          image: "test.testtest",
          is_enabled: 1,
          origin_price: 100,
          price: 600,
          title: "[賣]動物園造型衣服3",
          unit: "個",
          num: 1,
          imageUrl: "<<firebase storage url>>"
        },
        {
          category: "衣服2",
          content: "這是內容",
          description: "Sit down please 名設計師設計",
          id: "-L9tH8jxVb2Ka_DYPwng",
          image: "test.testtest",
          is_enabled: 1,
          origin_price: 100,
          price: 600,
          title: "[賣]動物園造型衣服3",
          unit: "個",
          num: 1,
          imageUrl: "<<firebase storage url>>"
        }
      ]
    };
  }
};
</script>
