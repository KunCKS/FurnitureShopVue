<template>
  <div id="app">
    <side-bar></side-bar>
    <div class="sidebarPadding-revise">
      <div class="container">
        <nav-bar class="bg-white navBar-padding-revise negative-row-margin"></nav-bar>
      </div>
      <router-view />
    </div>
    <footer class="sidebarPadding-revise">
      <footer-content></footer-content>
    </footer>
  </div>
</template>

<script>
import sideBar from "./components/SideBar";
import navBar from "./components/NavBar";
import footerContent from "./components/FooterContent";
export default {
  name: "App",
  components: {
    sideBar,
    navBar,
    footerContent
  }
};
</script>

<style lang="scss">
@import "./assets/all";
</style>
