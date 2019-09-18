<template>
  <div>
    <div class="row no-gutters mt-md-2">
      <div class="col-md-6" v-for="item in productsData" :key="item.id">
        <div class="products-card text-center border border-white">
          <div
            class="bg-cover products-card-img"
            :style="`background-image:url('${item.imageUrl}');min-height: 400px`"
          ></div>
          <div class="products-card-footer text-muted border-0 row no-gutters">
            <div class="col-md-8 d-flex align-items-center">
              <div class="pl-3 products-card-title">{{item.title}}</div>
            </div>
            <div class="col-md-4 py-3">
              <div class="products-card-originPrice text-right pr-3">原價 {{item.origin_price}}</div>
              <div class="products-card-price text-right pr-3">特價 {{item.price}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pagination></pagination>
    <div class="row py-md-8 py-2 no-gutters">
      <div class="col-11 border-top mx-auto d-md-block d-none"></div>
    </div>
  </div>
</template>

<script>
import Pagination from "./Pagination";
export default {
  props: ["productsData"],
  components: {
    Pagination
  }
};
</script>