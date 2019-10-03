<template>
  <div class="container news-section">
    <div class="row justify-content-center">
      <div class="col-sm-8 py-3">
        <div class="text-center h3 text-muted border-bottom py-3 promotion-title">
          <i class="fas fa-ticket-alt"></i> 優惠活動
        </div>
        <div class="row justify-content-center">
          <div class="col-10">
            <img class="w-100" src="../../../static/img/Promotion中文.jpg" alt />
          </div>
        </div>
      </div>
      <div class="col-sm-8 py-3">
        <div class="text-center h3 text-muted border-bottom py-3 promotion-title">
          <i class="far fa-question-circle"></i> 常見問題
        </div>
        <div class="accordion" id="accordionExample">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h2 class="mb-0">
                <button
                  class="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                >運送方式</button>
              </h2>
            </div>

            <div id="collapseOne" class="collapse" data-parent="#accordionExample">
              <div class="card-body">由於商品體積過大，故皆以合作的貨物物流進行配合運送，敬請耐心等待。</div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingTwo">
              <h2 class="mb-0">
                <button
                  class="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                >付款方式</button>
              </h2>
            </div>
            <div id="collapseTwo" class="collapse" data-parent="#accordionExample">
              <div class="card-body">目前提供信用卡付款及超商繳費兩種方式。</div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingThree">
              <h2 class="mb-0">
                <button
                  class="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                >會員優惠</button>
              </h2>
            </div>
            <div id="collapseThree" class="collapse" data-parent="#accordionExample">
              <div class="card-body">年度消費額度達到10萬元以上將升等為VIP會員，享有更優惠的價格，詳請請關注官網資訊！</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-8 py-3">
        <div class="text-center h3 text-muted border-bottom py-3 promotion-title" id="contact">
          <i class="fas fa-phone-volume"></i> 聯絡我們
        </div>
        <div class="text-center">
          <h5>門市位置</h5>
          <p>台北市台中區高雄路777777號</p>
          <h5>電話</h5>
          <p>(02)12345678</p>
          <h5>加入我們的團隊</h5>
          <p>(高雄) 儲備門市經理 Store Manager/Assistant Store Manager</p>
          <p>(台北) 門市銷售專員 Sales Executive</p>
        </div>
      </div>
    </div>
  </div>
</template>