<template>
  <div class="container pt-md-3 pb-md-5">
    <div class="row border-top">
      <form class="col-md-8 mt-md-3">
        <div class="form-row mb-3">
          <div class="col-12 h5 mb-3 text-center">訂單資訊</div>
          <div class="col-md-6">
            <label for="username">收件人姓名</label>
            <input type="text" class="form-control" name="name" id="username" placeholder="輸入姓名" />
            <!-- <span class="text-danger" v-if="errors.has('name')">姓名欄位不得留空</span> -->
          </div>
          <div class="col-md-6">
            <label for="usertel">收件人電話</label>
            <input type="tel" class="form-control" id="usertel" name="tel" placeholder="請輸入電話" />
            <!-- <span class="text-danger" v-if="errors.has('tel')">電話欄位不得留空</span> -->
          </div>
        </div>

        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            placeholder="請輸入 Email"
          />
          <!-- <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span> -->
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="text"
            class="form-control"
            name="address"
            id="useraddress"
            placeholder="請輸入地址"
          />
          <!-- <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span> -->
        </div>

        <div class="form-group">
          <label for="comment">
            備註
            <small class="text-muted">(選填)</small>
          </label>
          <textarea name id="comment" class="form-control" cols="30" rows="4"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-light btn-block">送出訂單</button>
        </div>
      </form>
      <div class="col-md-4 mt-md-3">
        <ul class="list-group list-group-flush">
          <li class="list-group-item px-3">
            <div class="cart-item d-flex justify-content-between align-items-center">
              <a href="#" class="btn mr-2">
                <i class="fas fa-trash-alt"></i>
              </a>
              <div
                class="bg-cover mr-2"
                style="background-image:url('https://images.unsplash.com/photo-1532588213355-52317771cce6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80');width: 42px;height:42px"
              ></div>
              <div class="cart-item-content">
                <p class="cart-item-title mb-0">超級無敵好用的櫃子，設計得不錯吧</p>
                <p class="cart-item-unit mb-0">1/張</p>
              </div>
              <div class="cart-item-price text-right">30000</div>
            </div>
          </li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Morbi leo risus</li>
          <li class="list-group-item">Porta ac consectetur ac</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
        <div>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="請輸入優惠碼" />
            <div class="input-group-append">
              <button class="btn btn-outline-primary" type="button" id="button-addon2">送出</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>