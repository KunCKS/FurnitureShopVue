<template>
  <div class="container pt-md-3 pb-md-5" style="min-height:calc(100vh - 83.38px - 205.6px)">
    <div class="row">
      <div class="col-12">
        <div class="form-row">
          <div class="col-12 col-sm">
            <div class="alert alert-primary text-center alert-rounded" role="alert">1.輸入訂單資料</div>
          </div>
          <div class="col-12 col-sm">
            <div class="alert alert-light text-center alert-rounded" role="alert">2.金流付款</div>
          </div>
          <div class="col-12 col-sm">
            <div class="alert alert-light text-center alert-rounded" role="alert">3.完成</div>
          </div>
        </div>
      </div>
      <form class="col-md-8 mt-md-3 px-4">
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
      <div class="col-md-4 border shadow">
        <div class="h5 text-center mt-3">您的訂單</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Morbi leo risus</li>
          <li class="list-group-item">Porta ac consectetur ac</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
        <a href="#" class="btn btn-outline-success btn-block mt-4">前往付款</a>
      </div>
    </div>
  </div>
</template>