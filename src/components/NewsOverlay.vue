<template>
  <div class="news-overlay d-none justify-content-center align-items-center" id="news-overlay">
    <div class="news-card">
      <img :src="`${imgUrl}`" alt class="news-card-img rounded" />
      <button class="btn news-card-cancel" @click="delOverlay">
        <span aria-hidden="true" class="text-white">&times;</span>
      </button>
    </div>
  </div>
</template>
<script>
import couponImg from "@/assets/Coupon50.jpg";
import $ from "jquery";
export default {
  data() {
    return {
      imgUrl: couponImg
    };
  },
  methods: {
    delOverlay() {
      $("#news-overlay").removeClass("d-flex");
      $("#news-overlay").addClass("d-none");
      //由於d-flex與d-none在bootstrap css 中皆設定為!important所以這邊用移除添加的方式來做顯示切換
    }
  },
  created() {
    setTimeout(() => {
      $("#news-overlay").removeClass("d-none");
      $("#news-overlay").addClass("d-flex");
    }, 1500);
    //設定在頁面載入1.5秒後讓overlay顯示
  }
};
</script>