<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link class="navbar-brand col-sm-3 col-md-2 mr-0" to="/admin">ASin DESIGN</router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    signout() {
      let vm = this;
      let api = `${process.env.APIPATH}/logout`;
      vm.$http.post(api).then(response => {
        if (!response.data.success) {
          console.log("登出訊息:", response.data);
          vm.$bus.$emit("message:push", response.data.message, "danger");
        } else {
          vm.$router.push("/home");
        }
      });
    }
  }
};
</script>