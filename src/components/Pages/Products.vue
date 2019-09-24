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
      productsData: []
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