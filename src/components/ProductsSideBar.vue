<template>
  <ul class="products-side-bar navbar-nav p-0 sticky-top mt-md-2" id="accordionProducts">
    <li class="nav-item">
      <div class="card border-0">
        <div class="card-header p-0 border-0 bg-white" id="productsHeadingOne">
          <h5 class="mb-0">
            <button
              class="btn btn-link dropdown-toggle"
              data-toggle="collapse"
              data-target="#ProductsCollapseOne"
            >沙發</button>
          </h5>
        </div>
        <div id="ProductsCollapseOne" class="collapse" data-parent="#accordionProducts">
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
        <div class="card-header p-0 border-0 bg-white" id="productsHeadingTwo">
          <h5 class="mb-0">
            <button
              class="btn btn-link dropdown-toggle"
              data-toggle="collapse"
              data-target="#ProductsCollapseTwo"
            >桌子</button>
          </h5>
        </div>
        <div
          id="ProductsCollapseTwo"
          class="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordionProducts"
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
        <div class="card-header p-0 border-0 bg-white" id="productsHeadingThree">
          <h5 class="mb-0">
            <button
              class="btn btn-link dropdown-toggle"
              data-toggle="collapse"
              data-target="#ProductsCollapseThree"
            >櫃子</button>
          </h5>
        </div>
        <div id="ProductsCollapseThree" class="collapse" data-parent="#accordionProducts">
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
        <div class="card-header p-0 border-0 bg-white" id="productsHeadingFour">
          <h5 class="mb-0">
            <button
              class="btn btn-link dropdown-toggle"
              data-toggle="collapse"
              data-target="#ProductsCollapseFour"
            >椅子</button>
          </h5>
        </div>
        <div id="ProductsCollapseFour" class="collapse" data-parent="#accordionProducts">
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
</template>
<style lang="scss" scope>
.sticky-top {
  top: 1.5rem;
}
//自定義sticky高度
</style>