import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "@/pages/MainPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import OrderPage from "@/pages/OrderPage";

// сообщаем Vue что собираемся использовать Vue-router
Vue.use(VueRouter);

// создаем массив, где будут храниться наши маршруты
const routes = [
    {name: 'main', component: MainPage, path: '/'},
    {name: 'product', component: ProductPage, path: '/product/:id'},
    {name: 'cart', component: CartPage, path: '/cart'},
    {name: 'order', component: OrderPage, path: '/order'},
    {name: 'notFound', component: NotFoundPage, path: '*'},
];

// создаем новый экземпляр роутера
const router = new VueRouter({
    routes
});

export default router;