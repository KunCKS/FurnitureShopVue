<template>
  <section>
    <div
      class="row introduce-section my-md-9 no-gutters"
      :class="{'flex-row-reverse':flexRowReverse}"
      :style="`background-color:${contentData.bgColor}`"
    >
      <div class="col-md-6 intro-img">
        <div class="bg-cover h-100" :style="`background-image:url('${contentData.imgUrl}')`"></div>
      </div>
      <div class="col-md-6 p-5 d-flex flex-column justify-content-center">
        <h5 class="introduce-section-title">{{contentData.title}}</h5>
        <p class="introduce-section-content mt-3">{{contentData.content}}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["contentData", "flexRowReverse"]
};
//這邊將文字內容及img資源綁定為物件包的內容，要使用時建立規定的物件內容即可呈現
//另外綁定一個flexRowReverse參數（boolean值），用來選擇要不要反轉順序
//以下為物件格式
//  {
//   title: "自訂標題"",
//   content: "自訂內容",
//   imgUrl: "填入網址",
//   bgColor: "填入色碼"
//  }
</script>