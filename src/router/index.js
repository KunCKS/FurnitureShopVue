import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Pages/Index";
import Home from "@/components/Pages/Home";
import Products from "@/components/Pages/Products";
import Cart from "@/components/Pages/Cart";
import CustomerOrder from "@/components/Pages/CustomerOrder";
import CustomerCheckout from "@/components/Pages/CustomerCheckout";
import Login from "@/components/Pages/Login";
import Dashboard from "@/components/Pages/Dashboard";
import DashBoardProducts from "@/components/Pages/DashBoardProducts";
import DashboardOrders from "@/components/Pages/DashboardOrders";
import Coupons from "@/components/Pages/Coupons";
import NoPath from "@/components/Pages/noPath";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "/home"
    },
    {
      path: "/",
      name: "index",
      component: Index,
      children: [
        {
          path: "home",
          name: "Home",
          component: Home
        },
        {
          path: "products",
          name: "Products",
          component: Products
        },
        {
          path: "cart",
          name: "Cart",
          component: Cart
        },
        {
          path: "customerorder",
          name: "CustomerOrder",
          component: CustomerOrder
        },
        {
          path: "customercheckout",
          name: "CustomerCheckout",
          component: CustomerCheckout
        },
        {
          path: "login",
          name: "Login",
          component: Login
        }
      ]
    },
    {
      name: "管理頁面",
      path: "/admin",
      component: Dashboard,
      children: [
        {
          name: "產品頁面",
          path: "products",
          component: DashBoardProducts,
          meta: { requiresAuth: true }
        },
        {
          name: "優惠券頁面",
          path: "coupons",
          component: Coupons
          // meta: { requiresAuth: true }
        },
        {
          name: "訂單頁面",
          path: "dashboardorders",
          component: DashboardOrders
          // meta: { requiresAuth: true }
        }
      ]
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
