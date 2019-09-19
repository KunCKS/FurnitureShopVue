<template>
  <div>
    <products-header :productsHeaderData="productsHeaderData['sofa']"></products-header>
    <div class="row no-gutters">
      <div class="col-md-2">
        <products-side-bar></products-side-bar>
      </div>
      <div class="col-md-10">
        <products-list :productsData="productsData"></products-list>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsHeader from "../ProductsHeader";
import ProductsSideBar from "../ProductsSideBar";
import ProductsList from "../ProductsList";
export default {
  data() {
    return {
      productsHeaderData: {
        sofa: {
          title: "新款沙發",
          content:
            "如果您正尋找設計師沙發的最新設計，無需再躊躇。我們剛剛推出這些令人興奮的設計——現代家居的絕配。",
          bgColor: "#fbfbfb"
        },
        chair: {
          title: "新款椅子",
          content:
            "如果您正尋找設計師沙發的最新設計，無需再躊躇。我們剛剛推出這些令人興奮的設計——現代家居的絕配。"
        }
      },
      productsData: [
        {
          category: "衣服3",
          content: "這是內容",
          description: "Sit down please 名設計師設計",
          id: "-L9tH8jxVb2Ka_DYPwng",
          imageUrl:
            "https://images.unsplash.com/photo-1532588213355-52317771cce6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          is_enabled: 1,
          num: 1,
          origin_price: 100,
          price: 600,
          title: "[賣]動物園造型衣服3",
          unit: "個"
        },
        {
          category: "衣服3",
          content: "這是內容",
          description: "Sit down please 名設計師設計",
          id: "-L9tH8jxVb2Ka_DYPwng",
          imageUrl:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
          is_enabled: 1,
          num: 1,
          origin_price: 100,
          price: 600,
          title: "[賣]動物園造型衣服3",
          unit: "個"
        },
        {
          category: "衣服3",
          content: "這是內容",
          description: "Sit down please 名設計師設計",
          id: "-L9tH8jxVb2Ka_DYPwng",
          imageUrl:
            "https://images.unsplash.com/photo-1487015307662-6ce6210680f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=632&q=80",
          is_enabled: 1,
          num: 1,
          origin_price: 100,
          price: 600,
          title: "[賣]動物園造型衣服3",
          unit: "個"
        },
        {
          category: "衣服3",
          content: "這是內容",
          description: "Sit down please 名設計師設計",
          id: "-L9tH8jxVb2Ka_DYPwng",
          imageUrl:
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          is_enabled: 1,
          num: 1,
          origin_price: 100,
          price: 600,
          title: "[賣]動物園造型衣服3",
          unit: "個"
        },
        {
          category: "衣服3",
          content: "這是內容",
          description: "Sit down please 名設計師設計",
          id: "-L9tH8jxVb2Ka_DYPwng",
          imageUrl:
            "https://images.unsplash.com/photo-1461418559055-6f020c5a91e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          is_enabled: 1,
          num: 1,
          origin_price: 100,
          price: 600,
          title: "[賣]動物園造型衣服3",
          unit: "個"
        }
      ]
      //這邊每個 data package 外層都有一個變數來儲存，以供資料綁定時選擇需要的內容
    };
  },
  components: {
    ProductsHeader,
    ProductsSideBar,
    ProductsList
  }
};
</script>