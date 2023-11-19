import { createRouter, createWebHashHistory } from 'vue-router'
import Catalog from "@/views/Catalog.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Cart from "@/views/Cart.vue";
import Home from "@/views/Home.vue";

const router = createRouter({
  history:createWebHashHistory(),
  routes: [
    {
      path: '/json',
      name: 'Json'
    },
    {
      path: '/Products',
      name: 'Catalog',
      component: Catalog
    },
    {
      path: '/product/:id',
      name: 'ProductView',
      component: ProductDetail
    },
    {
      path: '/cart',
      name: 'CartView',
      component: Cart
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})

export default router