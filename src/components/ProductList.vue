<template>
    <ul class="catalog__list">
          <ProductItem v-for="(product, index) in products" :key="index" :product="product"></ProductItem>
        </ul>
</template>

<script>
import ProductItem from './ProductItem';

export default {
    name: 'ProductList',
    components: {ProductItem},
    props: ['products'],
}
</script>