<template>
    <main class="content container" v-if="$store.state.cartLoading">Загрузка корзины...</main>
    <main class="content container" v-else-if="$store.state.cartLoadingFailed">Не удалось загрузить корзину</main>
    <main class="content container" v-else>
        <div class="content__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <router-link class="breadcrumbs__link" href="index.html" :to="{name: 'main'}">
                        Каталог
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
                        Корзина
                    </router-link>
                </li>
            </ul>

            <h1 class="content__title">
                Корзина
            </h1>
            <span class="content__info">
                {{ $store.state.cartProducts.length }} товара
            </span>
        </div>

        <section class="cart">
            <form class="cart__form form" action="#" method="POST">
                <div class="cart__field">
                    <ul class="cart__list">

                        <CartItem v-for="item in products" :key="item.productId" :item="item"/>
                        
                    </ul>
                </div>

                <div class="cart__block">
                    <p class="cart__desc">
                        Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
                    </p>
                    <p class="cart__price">
                        Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
                    </p>

                    <router-link v-if="products.length > 0" tag="button" class="cart__button button button--primery" type="submit" :to="{name: 'order'}">
                        Оформить заказ
                    </router-link>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';

export default {
    components: {CartItem},
    filters: {numberFormat},
    computed: {
        ...mapGetters({products: 'cartDetailProducts', totalPrice: 'cartTotalPrice'}), //totalPrice для обшей стоимости товара
    }
}
</script>