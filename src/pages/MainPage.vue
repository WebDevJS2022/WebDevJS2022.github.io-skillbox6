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
      return this.productsData ? this.productsData.pagination.total : 0; //пагинация из API
    }
  },
  //Вывод списка товаров из API + пагинация
  methods: {
    loadProducts(){
      axios
      .get(`https://vue-study.skillbox.cc/api/products`, {
        params: {
          page: this.page, //номер страницы
          limit: this.productsPerPage, //количество элементов
          categoryId: this.filterCategoryId, 
          minPrice: this.filterPriceFrom,
          maxPrice: this.filterPriceTo,
          colorId: this.filterColorId,
        }
      })
        .then(response => this.productsData = response.data);
    }
  },
  //пагинация из API 
  watch: {
    page(){
      this.loadProducts();
    },
    filterPriceFrom(){
      this.loadProducts();
    },
    filterPriceTo(){
      this.loadProducts();
    },
    filterCategoryId(){
      this.loadProducts();
    },
    filterColorId(){
      this.loadProducts();
    },
  },
  created(){
    this.loadProducts();
  }
};
</script>