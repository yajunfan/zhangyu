import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);





const state = {
  count: 1,
  list:[],

}

const mutations = {
  changeCount(state, num) {
    console.log(num)
    state.count = num;
  },
  changeObj(state,obj){
    state.list=obj;
  }
 



}

export default new Vuex.Store({
  state,
  mutations,

  // actions,
})
