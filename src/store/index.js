import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex); //Сообщаем Vue, что будем использовать Vuex


export default new Vuex.Store({  // Создаем и Экспортируем новое хранилище Vuex.Store
    state: { // состояние товаров
      cartProducts: [],

      userAccessKey: null, //для хранения ключа пользователя

      cartProductsData: [], //информация о товарах в корзине

      cartLoading: false,
      cartLoadingFailed: false,
    },
    mutations: {
        resetCart(state){ //сброс данных корзины
            state.cartProducts = [];
            state.cartProductsData = [];
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
      },
      syncCartProducts(state){ //объединение прошлых данных Корзины с данными из API
        state.cartProducts = state.cartProductsData.map(item => {
            return{
                productId: item.product.id,
                amount: item.quantity
            }
        });
      }
    },
    getters: {
      cartDetailProducts(state){ //подробная информация о товарах
          return state.cartProducts.map(item => {
            const product = state.cartProductsData.find(p => p.product.id === item.productId).product;

              return {
                  ...item,
                  product: {
                    ...product,
                    image: product.image.file.url
                  }
              }
          });
      },
      cartTotalPrice(state, getters){ //общая стоимость покупки
          return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
      }
    },
    actions: { //действия для получения информации о корзине (вместо мутаций,тк там все дб синхронно)
        loadCart(context){
            context.state.cartLoading = true;
            context.state.cartLoadingFailed = false;

            clearTimeout(this.loadCartTimer);
            context.state.loadCartTimer = setTimeout(() => {
                return  axios
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
                  
                  context.commit('updateCartProductsData', response.data.items); //сначала прилетают данные из API
                  context.commit('syncCartProducts'); //затем проводим синхронизацию
                })
                .catch(() => context.state.cartLoadingFailed = true)
                .then(() => context.state.cartLoading = false);
            }, 2000)
        },
        addProductToCart(context, {productId, amount}){ //Добавить товар в корзину
            return (new Promise(resolve => setTimeout(resolve, 2000)))  //Timeout - задержка вызова на 2 сек
                .then(() => {
                    return axios
                        .post(API_BASE_URL + '/api/baskets/products', {
                            productId: productId,
                            quantity: amount
                        }, {
                            params: {
                                userAccessKey: context.state.userAccessKey
                            }
                        })
                        .then(response => {
                            context.commit('updateCartProductsData', response.data.items); //сначала прилетают данные из API
                            context.commit('syncCartProducts'); //затем проводим синхронизацию
                        })
                })
        },
        updateCartProductAmount(context, {productId, amount}){ //Изменить количество товаров в корзине
            context.commit('updateCartProductAmount', {productId, amount})

            if(amount < 1) {
                return;
            }

            return axios
            .put(API_BASE_URL + '/api/baskets/products', {
                productId: productId,
                quantity: amount
            }, {
                params: {
                    userAccessKey: context.state.userAccessKey
                }
            })
            .then(response => {
                context.commit('updateCartProductsData', response.data.items); //сначала прилетают данные из API
            })
            .catch(() => {
                context.commit('syncCartProducts');
            })
        },
        deleteProductToCart(context, productId) { //удаление товаров из корзины
            return axios
            .delete(API_BASE_URL + '/api/baskets/products', {
                data: {
                    productId: productId,
                },
                params: {
                    userAccessKey: context.state.userAccessKey,
                }
            })
            .then(response => {
                context.commit('updateCartProductsData', response.data.items); //сначала прилетают данные из API
                context.commit('syncCartProducts');
            })
        } 
    }
  }); 