<template>
  <div class="container">
    <div class="row justify-content-center my-4">
      <div class="col-12">
        <div class="form-row">
          <div class="col-12 col-sm">
            <div class="alert alert-light text-center alert-rounded" role="alert">1.輸入訂單資料</div>
          </div>
          <div class="col-12 col-sm">
            <div class="alert alert-primary text-center alert-rounded" role="alert">2.金流付款</div>
          </div>
          <div class="col-12 col-sm">
            <div class="alert alert-light text-center alert-rounded" role="alert">3.完成</div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row border p-4 shadow justify-content-center">
          <div class="col-12">
            <table class="table">
              <tbody>
                <tr>
                  <th class="border-0" width="120">Email</th>
                  <td class="border-0">jfkfkfk@dsfjkdsf.com</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>歐吉桑</td>
                </tr>
                <tr>
                  <th>收件人電話</th>
                  <td>0912345678</td>
                </tr>
                <tr>
                  <th>收件人地址</th>
                  <td>高雄發大財</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <span>尚未付款</span>
                    <span>付款完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-5">
            <div class="text-right">
              <button class="btn btn-danger btn-block">確認付款去</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>