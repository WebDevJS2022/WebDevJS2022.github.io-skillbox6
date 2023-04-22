import Vue from 'vue'
import Vuex from 'vuex'
import products from '@/data/products';

Vue.use(Vuex); //Сообщаем Vue, что будем использовать Vuex


export default new Vuex.Store({  // Создаем и Экспортируем новое хранилище Vuex.Store
    state: { // состояние товаров
      cartProducts: [
          {productId: 1, amount: 2}
      ]
    },
    mutations: {
      addProductToCart(state, {productId, amount}){
          const item = state.cartProducts.find(item => item.productId === productId);
          if(item){
              item.amount += amount;
          }else{
              state.cartProducts.push({
                  productId,
                  amount,
              });
          }
      },
      updateCartProductAmount(state, {productId, amount}){ //добавление товара в корзину
          const item = state.cartProducts.find(item => item.productId === productId);
  
          if(item){
              item.amount = amount;
          }
      },
      deleteCartProduct(state, productId){ //удаление товара из корзины
          state.cartProducts = state.cartProducts.filter(item => item.productId !== productId);
      }
    },
    getters: {
      cartDetailProducts(state){ //подробная информация о товарах
          return state.cartProducts.map(item => {
              return {
                  ...item,
                  product: products.find(p => p.id === item.productId)
              }
          });
      },
      cartTotalPrice(state, getters){ //общая стоимость покупки
          return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
      }
    }
  }); 