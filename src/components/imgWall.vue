<template>
  <div class="container-fluid">
    <div class="row no-gutters">
      <div
        class="col-3 img-wall border border-secondary"
        v-for="(item,index) in imgWallLink"
        :key="index"
      >
        <a :href="imgWallLink[index]" class="w-100">
          <img :src="`/static/images/furniture-1-${index}.jpg`" alt class="img-wall-img w-100" />
        </a>
        <div class="img-wall-overlay"></div>
      </div>
      <!-- <div class="col-3">
        <a href="#" class="img-wall-overlay">
          <img :src="imgUrl" alt />
        </a>
      </div>
      <div class="col-3">
        <a href="#" class="img-wall-overlay">
          <img :src="imgUrl" alt />
        </a>
      </div>
      <div class="col-3">
        <a href="#" class="img-wall-overlay">
          <img :src="imgUrl" alt />
        </a>
      </div>
      <div class="col-3">
        <a href="#" class="img-wall-overlay">
          <img :src="imgUrl" alt />
        </a>
      </div>
      <div class="col-3">
        <a href="#" class="img-wall-overlay">
          <img :src="imgUrl" alt />
        </a>
      </div>
      <div class="col-3">
        <a href="#" class="img-wall-overlay">
          <img :src="imgUrl" alt />
        </a>
      </div>
      <div class="col-3">
        <a href="#" class="img-wall-overlay">
          <img :src="imgUrl" alt />
        </a>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgTest: "@/assets/furniture-1.jpg",
      // imgUrl:{
      //   0:"",
      //   1:"",
      //   2:"",
      //   3:"",
      //   4:"",
      //   5:"",
      //   6:"",
      //   7:"",
      // },
      imgWallLink: {
        0: "#",
        1: "#",
        2: "#",
        3: "#",
        4: "#",
        5: "#",
        6: "#",
        7: "#"
      }
    };
  }
};
</script>