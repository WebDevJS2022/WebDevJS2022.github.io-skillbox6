<template>
  <component :is="currentPageComponent" :page-params="currentPageParams" @gotoPage="(pageName, pageParams) => gotoPage(pageName, pageParams)" />
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const routes = {  //список страниц, сюда добавляем новые страницы
  main: 'MainPage',
  product: 'ProductPage'
};

export default {
  name: "App",
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {} //для передачи параметров
    }
  },
  //метод, отвечающий за переключение страниц
  methods: {
    gotoPage(pageName, pageParams){
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    }
  },
  computed: {
    currentPageComponent(){
      return routes[this.currentPage] || 'NotFoundPage';
    }
  },
  components: {MainPage, ProductPage, NotFoundPage},
}
</script>
