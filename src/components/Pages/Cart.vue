<template>
  <div class="container pt-md-3 pb-md-5">
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
      <div class="col-md-8">
        <div class="h4 text-center">購 物 車 清 單</div>
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm border-0">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td>
                <div
                  class="bg-cover"
                  style="background-image:url('https://images.unsplash.com/photo-1532588213355-52317771cce6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80');width: 42px;height:42px"
                ></div>
              </td>
              <td class="align-middle">
                <div class="text-success">已套用優惠券</div>
              </td>
              <td class="align-middle"></td>
              <td class="align-middle text-right"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-4">
        <div class="h5 text-center">購 物 車 合 計</div>
        <div>總計</div>
        <div>折扣價</div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="請輸入優惠碼" />
          <div class="input-group-append">
            <button class="btn btn-outline-primary" type="button" id="button-addon2">套用優惠碼</button>
          </div>
        </div>
        <a href="#" class="btn btn-outline-success btn-block mt-4">前往結帳</a>
      </div>
    </div>
  </div>
</template>