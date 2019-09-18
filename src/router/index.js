import Vue from "vue";
import Router from "vue-router";
// import Index from "@/components/Pages/Index";
import Home from "@/components/Pages/Home";
import Products from "@/components/Pages/Products";
import Cart from "@/components/Pages/Cart";
import CustomerOrder from "@/components/Pages/CustomerOrder";
import CustomerCheckout from "@/components/Pages/CustomerCheckout";
import NoPath from "@/components/Pages/noPath";
import Orders from "@/components/Pages/Orders";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "/nopath"
    },
    {
      path: "/",
      name: "home",
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
    },
    {
      path: "/customerorder",
      name: "customerorder",
      component: CustomerOrder
    },
    {
      path: "/customercheckout",
      name: "customercheckout",
      component: CustomerCheckout
    },
    {
      path: "/nopath",
      name: "nopath",
      component: NoPath
    }
    // {
    //   path: "/orders",
    //   name: "orders",
    //   component: Orders
    // }
  ]
});
