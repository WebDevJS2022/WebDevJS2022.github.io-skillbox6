import Vue from 'vue'
import Vuex from 'vuex'
import products from '@/data/products';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex); //Сообщаем Vue, что будем использовать Vuex


export default new Vuex.Store({  // Создаем и Экспортируем новое хранилище Vuex.Store
    state: { // состояние товаров
      cartProducts: [
          {productId: 1, amount: 2}
      ],

      userAccessKey: null, //для хранения ключа пользователя

      cartProductsData: [] //информация о товарах в корзине
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
      },
      updateUserAccessKey(state, accessKey){
        state.userAccessKey = accessKey;
      },
      updateCartProductsData(state, items){
        state.cartProductsData = items;
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
    },
    actions: { //действия для получения информации о корзине (вместо мутаций,тк там все дб синхронно)
        loadCart(context){
            axios
              .get(API_BASE_URL + '/api/baskets', {
                params: {
                    userAccessKey: context.state.userAccessKey
                }
              })
              .then(response => {
                if(!context.state.userAccessKey){
                    localStorage.setItem('userAccessKey', response.data.user.accessKey);
                    context.commit('updateUserAccessKey', response.data.user.accessKey);
                }
                
                context.commit('updateCartProductsData', response.data.items);
              })
        }
    }
  }); 