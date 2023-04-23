<template>
     <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId" :color-id.sync="filterColorId" />

      <section class="catalog">
        <ProductList :products="products" />
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>

    </div>
  </main>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';

export default {
    name: "MainPage",
    components: {ProductList, BasePagination, ProductFilter},
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      page: 1,
      productsPerPage: 3,

      productsData: null //Вывод списка товаров из API
    }
  },
  computed: {
    filteredProducts(){
      let filteredProducts = products;

      if(this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom);
      }
      if(this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo);
      }
      if(this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategoryId);
      }
      if(this.filterColorId) {
        filteredProducts = filteredProducts.filter(product => product.colorId.includes(this.filterColorId));
      }

      return filteredProducts;
    },
    products(){
     return this.productsData 
       ? this.productsData.items.map(product => {
         return {
          ...product,
          image: product.image.file.url
        }
       })
       : [];
    },
    countProducts(){
      return this.filteredProducts.length;
    }
  },
  //Вывод списка товаров из API
  methods: {
    loadProducts(){
      axios.get('https://vue-study.skillbox.cc/api/products')
        .then(response => this.productsData = response.data);
    }
  },
  created(){
    this.loadProducts();
  }
};
</script>