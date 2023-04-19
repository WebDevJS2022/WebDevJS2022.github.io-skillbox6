<template>
  <MainPage v-if="currentPage === 'main'" />
  <ProductPage v-else-if="currentPage === 'product'" />
  <NotFoundPage v-else/>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

export default {
  name: "App",
  data() {
    return {
      currentPage: 'main'
    }
  },
  components: {MainPage, ProductPage, NotFoundPage},
}
</script>
