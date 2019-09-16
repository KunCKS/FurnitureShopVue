<template>
  <div>
    <carousel
      :per-page="1"
      :navigate-to="someLocalProperty"
      :mouse-drag="true"
      :autoplay="true"
      :loop="true"
      paginationPosition="bottom-overlay"
      paginationActiveColor="#ffffff"
      paginationColor="#e0e0e0"
      class
    >
      <slide>
        <div
          class="bg-cover"
          style="background-image:url('https://images.unsplash.com/photo-1519643381401-22c77e60520e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80');height: 80vh"
        ></div>
      </slide>
      <slide>
        <div
          class="bg-cover"
          style="background-image:url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');height: 80vh"
        ></div>
      </slide>
      <slide>
        <div
          class="bg-cover"
          style="background-image:url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1273&q=80');height: 80vh"
        ></div>
      </slide>
    </carousel>
    <introduce-section :contentData="contentDataTop"></introduce-section>
    <introduce-section :contentData="contentDataBtm" :flexRowReverse="true"></introduce-section>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import IntroduceSection from "../IntroduceSection";
export default {
  data() {
    return {
      someLocalProperty: [],
      contentDataTop: {
        title: "用心設計 —",
        content:
          "我們明白你最需要的功能，我們用心傾聽每個使用者的回饋，打造最好的設計。",
        imgUrl:
          "background-image:url('https://images.unsplash.com/photo-1501516069922-a9982bd6f3bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')"
      },
      contentDataBtm: {
        title: "找尋靈感 —",
        content:
          "從我們如數家珍的文化、設計和激情中獲得靈感，找到屬於您自己的家居詮釋之道。瞭解創造與維護理想家居空間的指南與潮流。不在於追求完美的空間。而在於適合生活的一個家。",
        imgUrl:
          "background-image:url('https://images.unsplash.com/photo-1543589365-3cc63c87243f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80')"
      }
    };
  },
  components: {
    Carousel,
    Slide,
    IntroduceSection
  }
};
</script>