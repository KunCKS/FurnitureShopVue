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
import ProductPage from "@/components/Pages/ProductPage";
import Promotion from "@/components/Pages/Promotion";
// import NoPath from "@/components/Pages/noPath";
Vue.use(Router);

export default new Router({
  //主頁在index下，利用children做其他頁面的切換
  //管理頁面在admin下
  routes: [
    {
      path: "*",
      redirect: "/home"
    },
    {
      path: "/",
      redirect: "/home",
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
          path: "products/:category/:series",
          name: "FilterProducts",
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
          path: "customercheckout/:id",
          name: "CustomerCheckout",
          component: CustomerCheckout
        },
        {
          path: "login",
          name: "Login",
          component: Login
        },
        {
          path: "product/:id",
          name: "Product",
          component: ProductPage
        },
        {
          path: "promotion",
          name: "Promotion",
          component: Promotion
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
          component: Coupons,
          meta: { requiresAuth: true }
        },
        {
          name: "訂單頁面",
          path: "dashboardorders",
          component: DashboardOrders,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
});
