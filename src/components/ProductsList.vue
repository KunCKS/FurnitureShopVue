<template>
  <div class="row no-gutters">
    <div class="col-md-6" v-for="item in productsData" :key="item.id">
      <div class="products-card text-center border border-white">
        <div
          class="bg-cover products-card-img"
          :style="`background-image:url('${item.imageUrl}');min-height: 400px`"
        ></div>
        <div class="products-card-footer text-muted border-0 row no-gutters">
          <div class="col-md-8">
            <div class="products-card-title">{{item.title}}</div>
          </div>
          <div class="col-md-4">
            <div class="products-card-originPrice text-right">原價 {{item.origin_price}}</div>
            <div class="products-card-price text-right">特價 {{item.price}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["productsData"]
};
</script>