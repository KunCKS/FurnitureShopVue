<template>
  <div>
    <!-- <side-cart></side-cart> -->
    <products-header :productsHeaderData="productsHeaderData[`${headerTarget}`]"></products-header>
    <products-list></products-list>
    <a href="#" id="scrollTop" class="scroll-top" @click.prevent="scrollTop">
      <i class="fas fa-angle-double-up"></i>
    </a>
  </div>
</template>

<script>
import $ from "jquery";
import ProductsHeader from "../ProductsHeader";
// import ProductsSideBar from "../ProductsSideBar";
import ProductsList from "../ProductsList";
// import SideCart from "../SideCart";
export default {
  data() {
    return {
      productsHeaderData: {
        全系列: {
          title: "全系列",
          content:
            "如果您正尋找設計師沙發的最新設計，無需再躊躇。我們剛剛推出這些令人興奮的設計——現代家居的絕配。",
          bgColor: "#fbfbfb"
        },
        沙發: {
          title: "新款沙發",
          content:
            "如果您正尋找設計師沙發的最新設計，無需再躊躇。我們剛剛推出這些令人興奮的設計——現代家居的絕配。",
          bgColor: "#fbfbfb"
        },
        椅子: {
          title: "新款椅子",
          content:
            "如果您正尋找設計師沙發的最新設計，無需再躊躇。我們剛剛推出這些令人興奮的設計——現代家居的絕配。"
        },
        收納系列: {
          title: "新款收納系列",
          content:
            "如果您正尋找設計師沙發的最新設計，無需再躊躇。我們剛剛推出這些令人興奮的設計——現代家居的絕配。"
        },
        桌子: {
          title: "新款桌子",
          content:
            "如果您正尋找設計師沙發的最新設計，無需再躊躇。我們剛剛推出這些令人興奮的設計——現代家居的絕配。"
        }
      }
    };
  },
  methods: {
    scrollTop() {
      $("html,body").animate(
        {
          scrollTop: 0
        },
        700
      );
    }
  },
  components: {
    ProductsHeader,
    ProductsList
    // SideCart
  },
  computed: {
    headerTarget() {
      if (!this.$route.params.category) {
        return "全系列";
      }
      return this.$route.params.category;
    }
  },
  created() {
    $(window).scroll(() => {
      if ($(window).scrollTop() > 90) {
        $("#scrollTop").addClass("shown");
      } else {
        $("#scrollTop").removeClass("shown");
      }
      // console.log($(window).scrollTop());
    });
  }
};
</script>