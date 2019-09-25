<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right py-3">
      <button
        class="btn btn-large btn-secondary"
        data-toggle="modal"
        data-target="#productModal"
        @click="openModal(true)"
      >新建產品</button>
    </div>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col" width="100">系列</th>
          <th scope="col" width="100">種類</th>
          <th scope="col">產品名稱</th>
          <th scope="col" width="110">原價</th>
          <th scope="col" width="110">售價</th>
          <th scope="col" width="100">是否啟用</th>
          <th scope="col" width="130">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{item.category_series}}</td>
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price|currency}}</td>
          <td class="text-right">{{item.price|currency}}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">已啟用</span>
            <span class="text-danger" v-if="!item.is_enabled">未啟用</span>
          </td>
          <td>
            <button class="btn btn-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-danger btn-sm" @click="openModal(false,item,true)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pagination="pagination" @gopage="getProductsData"></pagination>
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew">新增產品</span>
              <span v-if="!isNew">編輯產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="upLoading"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    @change="upload"
                    class="form-control"
                    ref="files"
                  />
                </div>
                <img :src="tempProduct.imageUrl" class="img-fluid" alt />
                <div class="form-group mt-2" v-if="tempProduct.image">
                  <label for="imageName">檔名</label>
                  <input
                    class="form-control"
                    name="imageName"
                    id="imageName"
                    v-model="tempProduct.image"
                  />
                </div>
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label for="category-series">分類-系列</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category-series"
                      v-model="tempProduct.category_series"
                      placeholder="請輸入分類-系列"
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="category">分類-類型</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類-類型"
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="update">
              <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="delProductModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 {{tempProduct.title}} 商品
            <strong class="text-danger">(刪除後將無法恢復)</strong>。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delProduct(tempProduct.id)">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../DashboardPagination";
//在main.js中引入bootstrap時，雖然有安裝jQuery及propers，但他們只是bootstrap的相依套件而已，並沒有載入到裡面來，
// 所以這邊要自己引入到元件內＄才有定義
export default {
  data() {
    return {
      products: [],
      tempProduct: {
        // title: "",
        // category:"",
        // origin_price: "",
        // price: "",
        // unit: "",
        // image: "",
        // description: "",
        // content: "",
        // is_enabled: 1,
        // imageUrl: ""
      },
      pagination: {},
      isLoading: false,
      isNew: false,
      upLoading: false
    };
  },
  components: {
    Pagination
  },
  methods: {
    getProductsData(page = 1) {
      let vm = this;
      vm.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      vm.$http.get(api).then(response => {
        console.log("後台取得資料：", response);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
      //將現有的分頁資料利用props傳到元件中，再利用emit將點擊時觸發的資料回傳到此頁面中，這樣就可以利用資料重新AJAX得到新的一筆分頁資料
      //函式中先預設變數帶入1
    },
    update() {
      let vm = this;
      vm.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let method = "post";
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        method = "put";
      }
      vm.$http[method](api, { data: vm.tempProduct }).then(response => {
        console.log("建立新產品：", response);
        this.getProductsData(vm.pagination.current_page);
        vm.isLoading = false;
        $("#productModal").modal("hide");
      });
      //這邊依照isNew變數來辦判斷要帶入的api及使用的 XHR方法
    },
    upload() {
      const vm = this;
      // console.log(vm.$refs.files.files[0].name);
      vm.tempProduct.image = vm.$refs.files.files[0].name;
      const uploadedFile = vm.$refs.files.files[0];
      vm.upLoading = true;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          // console.log(response.data, response, "上傳");
          vm.upLoading = false;
          console.log(response.data, vm.$bus);
          if (response.data.success) {
            // vm.tempProduct.imageUrl = response.data.imageUrl;
            // console.log(vm.tempProduct);
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
            // console.log(vm.tempProduct);
            vm.$bus.$emit("message:push", "上傳成功", "success");
          } else {
            vm.$bus.$emit("message:push", response.data.message, "danger");
          }
        });
    },
    openModal(isNew, item, isDel) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else if (!isNew && isDel) {
        this.tempProduct = Object.assign({}, item);
        $("#delProductModal").modal("show");
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
        $("#productModal").modal("show");
      }
      //由於使用同一個modal，所以我們在這邊建立三個變數來去判斷要呈現的modal資料，依綁定時帶入的變數來去決定呈現的結果
      //因為傳參考的特性，再將資料丟到tempProduct時記得建立成新的物件
    },
    delProduct(id) {
      let vm = this;
      vm.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${id}`;
      vm.$http.delete(api).then(response => {
        console.log("刪除產品：", response);
        this.getProductsData();
        vm.isLoading = false;
        $("#delProductModal").modal("hide");
      });
    }
    // addFileName() {
    //   // console.log($("#customFile").val());
    //   let fileVal = $("#customFile").val();
    //   // console.log(fileVal.lastIndexOf("\\"));
    //   let index = fileVal.lastIndexOf("\\");
    //   // console.log(fileVal.substring(index + 1));
    //   this.tempProduct.image = fileVal.substring(index + 1);
    //   //利用change事件來添加檔名到變數中，這邊利用lastIndexOf帶入'\\'找到字串的index，然後利用index帶入substring()來return字串
    // }
    //忘記有ref屬性啦！！這邊不使用勒！
  },
  created() {
    this.getProductsData();
  }
};
</script>
