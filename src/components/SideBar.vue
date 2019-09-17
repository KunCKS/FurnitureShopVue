<template>
  <div class="sideNav" id="sideNav">
    <a
      href="#"
      class="menuBtn position-fixed d-md-block d-none"
      @click.prevent="flyoutShown"
      id="menuBtn"
    >
      <div class="btnBar"></div>
      <div class="btnBar"></div>
      <div class="btnBar"></div>
    </a>
    <div class="side-bar d-md-block d-none">
      <!-- <a href="#" class="menuBtn position-fixed" @click.prevent="flyoutShown" id="menuBtn">
        <div class="btnBar"></div>
        <div class="btnBar"></div>
        <div class="btnBar"></div>
      </a>-->
      <h3 class="side-bar-title m-0">ASIN DESIGN SENCE 2019</h3>
    </div>
    <nav class="flyout negative-row-margin">
      <div class="flyout-content">
        <ul class="navbar-nav p-0" id="accordion">
          <li class="nav-item">
            <div class="card border-0">
              <div class="card-header p-0 border-0 bg-white" id="headingOne">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                  >沙發</button>
                </h5>
              </div>

              <div
                id="collapseOne"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                      <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Dropdown</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Disabled</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <div class="card border-0">
              <div class="card-header p-0 border-0 bg-white" id="headingTwo">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                  >桌子</button>
                </h5>
              </div>

              <div
                id="collapseTwo"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                      <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Dropdown</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Disabled</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <div class="card border-0">
              <div class="card-header p-0 border-0 bg-white" id="headingThree">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                  >櫃子</button>
                </h5>
              </div>

              <div id="collapseThree" class="collapse" data-parent="#accordion">
                <div class="card-body">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                      <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Dropdown</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Disabled</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <div class="card border-0">
              <div class="card-header p-0 border-0 bg-white" id="headingFour">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle"
                    data-toggle="collapse"
                    data-target="#collapseFour"
                  >椅子</button>
                </h5>
              </div>

              <div id="collapseFour" class="collapse" data-parent="#accordion">
                <div class="card-body">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                      <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Dropdown</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Disabled</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="flyout-content-footer">ASIN DESIGN SENCE 2019</div>
      </div>
    </nav>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  methods: {
    flyoutShown() {
      $("#menuBtn").toggleClass("menuBtn-shown");
      $("#sideNav").toggleClass("shown");
    }
  }
};
</script>

<style lang="scss" scope>
.menuBtn {
  left: calc((4.5rem - 24px) / 2);
  //這邊帶入sidebar寬度及btn寬度來計算左側padding的距離
  top: 2rem;
}
</style>