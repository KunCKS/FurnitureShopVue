<template>
  <div>
    <news-overlay></news-overlay>
    <h1 class="m-0 text-hide">ASin Design</h1>
    <carousel
      :per-page="1"
      :navigate-to="someLocalProperty"
      :mouse-drag="true"
      :autoplay="true"
      :loop="true"
      paginationPosition="bottom-overlay"
      paginationActiveColor="#ffffff"
      paginationColor="#e0e0e0"
    >
      <slide>
        <div
          class="bg-cover carousel-img"
          style="background-image:url('https://images.unsplash.com/photo-1519643381401-22c77e60520e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80');"
        ></div>
      </slide>
      <slide>
        <div
          class="bg-cover carousel-img"
          style="background-image:url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');"
        ></div>
      </slide>
      <slide>
        <div
          class="bg-cover carousel-img"
          style="background-image:url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1273&q=80');"
        ></div>
      </slide>
    </carousel>
    <introduce-section :contentData="contentDataTop"></introduce-section>
    <introduce-section :contentData="contentDataMid" :flexRowReverse="true"></introduce-section>
    <img-wall></img-wall>
    <introduce-designer-section :contentData="contentDataBtm"></introduce-designer-section>
    <introduce-company-section></introduce-company-section>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import IntroduceSection from "../IntroduceSection";
import IntroduceDesignerSection from "../IntroduceDesignerSection";
import introduceCompanySection from "../IntroduceCompanySection";
import imgWall from "../imgWall";
import NewsOverlay from "../NewsOverlay";
export default {
  data() {
    return {
      someLocalProperty: [],
      contentDataTop: {
        title: "用心設計 —",
        content:
          "我們明白你最需要的功能，我們用心傾聽每個使用者的回饋，打造最好的設計。",
        imgUrl:
          "https://images.unsplash.com/photo-1501516069922-a9982bd6f3bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
        bgColor: "#f4f3ee"
      },
      contentDataMid: {
        title: "找尋靈感 —",
        content:
          "從我們如數家珍的文化、設計和激情中獲得靈感，找到屬於您自己的家居詮釋之道。瞭解創造與維護理想家居空間的指南與潮流。不在於追求完美的空間。而在於適合生活的一個家。",
        imgUrl:
          "https://images.unsplash.com/photo-1543589365-3cc63c87243f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
        bgColor: "#e9eaec"
      },
      contentDataBtm: {
        title: "認識我們的設計師",
        content:
          "我們產品的設計理念來自於全世界最負盛譽的設計師。他們都有著多年行業頂尖專業經驗。但或許更重要的是我們對於偉大設計的共同解讀：經過精心思量的雅致產品，能夠反映我們所處的時代，並提升我們的生活品質。",
        imgUrl:
          "https://images.unsplash.com/photo-1566810039093-63307ce3f6b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
        bgColor: "#f1f1f1"
      }
      //contentData物件內容參考IntroduceSection元件檔內容說明
    };
  },
  components: {
    Carousel,
    Slide,
    IntroduceSection,
    IntroduceDesignerSection,
    introduceCompanySection,
    imgWall,
    NewsOverlay
  }
};
</script>