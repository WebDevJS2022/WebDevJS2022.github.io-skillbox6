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

        <div v-if="productsLoading" class="loading">Загрузка товаров...<transition><img src="../img/Spinner-3.gif"></transition></div>
        <div v-if="productsLoadingFailed" class="loading">Произошла ошибка при загрузке товаров
          <transition><img src="../img/Spinner-3.gif"></transition>
          <button @click.prevent="loadProducts">Попробовать еще раз</button>
        </div>

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
import {API_BASE_URL} from "@/config";

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

      productsData: null, //Вывод списка товаров из API

      productsLoading: false, //обработка загрузки
      productsLoadingFailed: false, //отвечает за статус произошла загрузка или нет
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
      this.productsLoading = true; //в начале загрузки сообщаем что загрузка идет
      this.productsLoadingFailed = false; //в начале загрузки очищаем от свойства productsLoadingFailed,тк оно сообщает об ошибке
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
      .get(API_BASE_URL + `/api/products`, {
        params: {
          page: this.page, //номер страницы
          limit: this.productsPerPage, //количество элементов
          categoryId: this.filterCategoryId, 
          minPrice: this.filterPriceFrom,
          maxPrice: this.filterPriceTo,
          colorId: this.filterColorId,
        }
      })
        .then(response => this.productsData = response.data)
        .catch(() => this.productsLoadingFailed = true) //отлавливаем любую ошибку и выводим свойство productsLoadingFailed 
        .then(() => this.productsLoading = false); //когда загрузка произошла и данные получены, убираем свойство productsLoading
      }, 1000); //загрузка длится 1 секунду
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

<style>
.loading {
  margin: auto;
}
</style>