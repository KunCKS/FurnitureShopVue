<template>
  <div>
    <div class="container-fluid">
      <Navbar></Navbar>
      <Alert></Alert>
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../DashboardSidebar";
import Navbar from "../DashboardNavbar";
// import Alert from "./AlertMessage";
export default {
  components: {
    Navbar,
    Sidebar
    // Alert
  }
};
</script>

<style lang="scss">
@import url("../../assets/components/_dashboard.scss");
</style>