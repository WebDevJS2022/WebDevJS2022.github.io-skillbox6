<template>
        <ul class="cart__orders">
            <li class="cart__order">
                <h3>{{ item.product.title }}</h3>
                <b>{{ item.product.price }} ₽</b>
                <span>Артикул: {{ item.product.id }}</span>
            </li>
        </ul>
</template>

<script>
export default {
    props: ['item'],
}
</script>