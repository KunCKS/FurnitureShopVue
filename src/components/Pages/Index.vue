<template>
  <div>
    <Alert></Alert>
    <side-bar></side-bar>
    <div class="pl-md-8">
      <div class="container">
        <nav-bar class="bg-white navBar-padding-revise negative-row-margin"></nav-bar>
      </div>
      <router-view />
    </div>
    <footer class="pl-md-8">
      <footer-content></footer-content>
    </footer>
  </div>
</template>

<script>
import Alert from "../Alert";
import sideBar from "../SideBar";
import navBar from "../NavBar";
import footerContent from "../FooterContent";
export default {
  components: {
    sideBar,
    navBar,
    footerContent,
    Alert
  }
};
</script>