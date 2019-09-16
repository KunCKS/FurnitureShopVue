<template>
  <section class="bg-">
    <div
      class="row introduce-section my-9 bg-gray-light no-gutters"
      :class="{'flex-row-reverse':flexRowReverse}"
    >
      <div class="col-6 p-5 d-flex flex-column justify-content-center">
        <h5 class="introduce-section-title">{{contentData.title}}</h5>
        <p class="introduce-section-content mt-3">{{contentData.content}}</p>
      </div>
      <div class="col-6 intro-img">
        <div class="bg-cover h-100" :style="contentData.imgUrl"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["contentData", "flexRowReverse"]
};
</script>