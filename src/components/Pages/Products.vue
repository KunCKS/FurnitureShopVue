<template>
  <div>
    <products-header :productsHeaderData="productsHeaderData['sofa']"></products-header>
    <products-list></products-list>
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
      }
    };
  },
  components: {
    ProductsHeader,
    ProductsList
  }
};
</script>