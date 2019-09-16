import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Pages/Home";
import Products from "@/components/Pages/Products";
import Cart from "@/components/Pages/Cart";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/products",
      name: "products",
      component: Products
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart
    }
  ]
});
