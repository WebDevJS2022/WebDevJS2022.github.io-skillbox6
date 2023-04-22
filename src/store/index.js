import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //Сообщаем Vue, что будем использовать Vuex

export default new Vuex.Store({  // Создаем и Экспортируем новое хранилище Vuex.Store
  state: {
    cartProducts: [
        {productId: 1, amount: 2}
    ]
  }
}); 