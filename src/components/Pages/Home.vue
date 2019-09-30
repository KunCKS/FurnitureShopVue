<template>
  <div>
    <news-overlay></news-overlay>
    <h1 class="m-0 text-hide">ASin Design</h1>
    <div style="position:relative">
      <div class="scrollDownIcon">
        <i class="fas fa-angle-down icon"></i>
        scroll
      </div>
      <carousel
        :per-page="1"
        :navigate-to="someLocalProperty"
        :mouse-drag="true"
        :autoplay="true"
        :autoplayTimeout="2500"
        :loop="true"
        :autoplayHoverPause="false"
        :speed="1000"
        paginationPosition="bottom-overlay"
        paginationActiveColor="#ffffff"
        paginationColor="#e0e0e0"
        @page-change="titleAnimate"
      >
        <slide v-for="(item,index) in slideContent" :key="index">
          <div class="carousel-img" :style="`background-image:url('${item.imgUrl}')`">
            <div class="slide-title d-flex align-items-end">
              <p :id="`title-${index}`" class="pl-md-9 pb-md-9 pl-5 pb-5 mb-0">{{item.title}}</p>
            </div>
          </div>
        </slide>
      </carousel>
    </div>
    <home-products></home-products>
    <introduce-section :contentData="contentDataTop"></introduce-section>
    <introduce-section :contentData="contentDataMid" :flexRowReverse="true"></introduce-section>
    <img-wall></img-wall>
    <div class="container-fluid my-4">
      <div class="row">
        <div class="col-md-6 col-12">
          <div class="card-designer px-lg-5 px-md-4">
            <div class="card-head">
              <div
                class="img ml-auto"
                style="background-image:url('https://images.unsplash.com/photo-1566810039093-63307ce3f6b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80')"
              ></div>
            </div>
            <div class="card-body-content">
              <div class="name">
                <h4 class="px-3">Ećo</h4>
                <span class="px-3">DESIGNER</span>
              </div>
              <p class="content">
                <span
                  class="px-3"
                >設計師 Ećo 著眼于自然形態、簡潔線條和舒適性，流暢的曲線，營造了悠閒氣氛，並為空間注入一股活潑的氣息，打造出無論從哪個角度看都美貌不減，而且無比舒適的傢俱。</span>
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="card-designer px-lg-5 px-md-4">
            <div class="card-head">
              <div
                class="img ml-auto"
                style="background-image:url('https://images.unsplash.com/photo-1495078065017-564723e7e3e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80')"
              ></div>
            </div>
            <div class="card-body-content">
              <div class="name">
                <h4 class="pl-3">Ȏlḍ</h4>
                <span class="pl-3">DESIGNER</span>
              </div>
              <div class="content">
                <span
                  class="px-3"
                >設計師 Ećo 著眼于自然形態、簡潔線條和舒適性，流暢的曲線，營造了悠閒氣氛，並為空間注入一股活潑的氣息，打造出無論從哪個角度看都美貌不減，而且無比舒適的傢俱。</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <introduce-designer-section :contentData="contentDataBtm"></introduce-designer-section> -->
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
import homeProducts from "../home-products";
import $ from "jquery";
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
      },
      //contentData物件內容參考IntroduceSection元件檔內容說明
      slideContent: {
        0: {
          imgUrl:
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80",
          title: "Ećo Series"
        },
        1: {
          imgUrl:
            "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1228&q=80",
          title: "Ȏlḍ Series"
        },
        2: {
          imgUrl:
            "https://images.unsplash.com/photo-1507149833265-60c372daea22?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80",
          title: "ḾetälGråy Series"
        }
        //slide的 v-for 資料
      }
    };
  },
  methods: {
    titleAnimate(e) {
      $(`#title-${e}`).addClass("fadeOut");
      if (e == 0) {
        $("#title-2").removeClass("fadeOut");
        return;
      }
      $(`#title-${e - 1}`).removeClass("fadeOut");
    }
  },
  components: {
    Carousel,
    Slide,
    IntroduceSection,
    IntroduceDesignerSection,
    introduceCompanySection,
    imgWall,
    NewsOverlay,
    homeProducts
  }
};
</script>