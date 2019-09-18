<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">分賴</th>
        <th>名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="80">是否啟用</th>
        <th width="150">編輯</th>
      </thead>
      <tbody>
        <tr v-for="items in products" :key="items.id">
          <td>{{items.category}}</td>
          <td>{{items.title}}</td>
          <td class="text-right">{{items.origin_price|currency}}</td>
          <td class="text-right">{{items.price|currency}}</td>
          <td>
            <span v-if="items.is_enabled == 1" class="text-success">啟用</span>
            <span>未啟用</span>
          </td>
          <td>
            <a class="btn btn-outline-primary" href="#" @click.prevent="openModal(false,items)">編輯</a>
            <a
              class="btn btn-outline-danger"
              href="#"
              @click.prevent="openModal(false,items,true)"
            >刪除</a>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pagination="pagination" @gopage="getProducts"></pagination>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
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
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imgUrl"
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
                    class="form-control"
                    ref="files"
                    @change="upload"
                  />
                </div>
                <img :src="tempProduct.imgUrl" class="img-fluid" alt />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
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
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
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
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.descripttion"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
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
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 {{tempProduct.title}}
            <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
//在main.js中引入bootstrap時，雖然有安裝jQuery及propers，但他們只是bootstrap的相依套件而已，並沒有載入到裡面來，
// 所以這邊要自己引入到元件內＄才有定義
import pagination from "../Pagination";
export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      upLoading: false,
      pagination: {}
    };
  },
  methods: {
    getProducts(page = 1) {
      console.log(page);
      let vm = this;
      vm.isLoading = true;
      console.log("確認有執行");
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      vm.$http.get(api).then(response => {
        console.log(response);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item, isDel) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else if (!isNew && isDel) {
        this.tempProduct = Object.assign({}, item);
        $("#delProductModal").modal("show");
        return;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    updateProduct() {
      console.log("執行updateProduct");
      let vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let method = "post";
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        method = "put";
        console.log("執行!vm.isNew");
      }
      vm.$http[method](api, { data: vm.tempProduct }).then(response => {
        console.log("已將資料送往後端", response.data);
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProducts();
          console.log(response.data.message);
        } else {
          $("#productModal").modal("hide");
          vm.getProducts();
          alert("更新產品失敗，請檢查");
        }
      });
    },
    deleteProduct() {
      console.log("執行deleteProduct");
      let vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      vm.$http.delete(api).then(response => {
        console.log("已將欲刪除資料送往後端", response.data);
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getProducts();
          console.log(response.data.message);
        } else {
          $("#delProductModal").modal("hide");
          vm.getProducts();
          alert("刪除產品失敗，請檢查");
        }
      });
    },
    upload() {
      console.log(this);
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
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
          console.log(response.data, response, "上傳");
          vm.upLoading = false;
          if (response.data.success) {
            // vm.tempProduct.imgUrl = response.data.imageUrl;
            // console.log(vm.tempProduct);
            vm.$set(vm.tempProduct, "imgUrl", response.data.imageUrl);
            console.log(vm.tempProduct);
          } else {
            vm.$bus.$emit("message:push", response.data.message, "danger");
          }
        });
    }
  },
  created() {
    this.getProducts();
  },
  components: {
    pagination
  }
};
</script>
