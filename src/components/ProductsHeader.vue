<template>
  <div class="text-center py-6 px-4" :style="`background-color: ${productsHeaderData.bgColor}`">
    <h1 class="h2 mb-4">{{productsHeaderData.title}}</h1>
    <p>{{productsHeaderData.content}}</p>
  </div>
</template>

<script>
export default {
  props: ["productsHeaderData"]
};
</script>