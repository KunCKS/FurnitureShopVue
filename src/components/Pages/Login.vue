<template>
  <div class="container" style="min-height:calc(100vh - 83.38px - 205.6px)">
    <div class="row justify-content-center py-9">
      <div class="col-md-6">
        <form class="form-signin" @submit.prevent="login">
          <h1 class="h3 mb-3 font-weight-normal text-center">會員(管理員)登入</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            v-model="loginData.email"
            required
            autofocus
          />
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            v-model="loginData.password"
            required
          />
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
          <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2019</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      let vm = this;
      let api = `${process.env.APIPATH}/admin/signin`;
      let data = {
        username: vm.loginData.email,
        password: vm.loginData.password
      };
      vm.$http.post(api, data).then(response => {
        // console.log("登入訊息：", response.data.message);
        if (response.data.success) {
          vm.$bus.$emit("signIn");
          vm.$router.push("/admin");
        } else {
          vm.$bus.$emit("message:push", response.data.message, "danger");
          // console.log("emit danger");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-radius: 0.25rem;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-radius: 0.25rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>