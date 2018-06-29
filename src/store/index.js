import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);





const state = {
  token:"", 
  modeltypeid:"",  //模板类型的id
  modeltypename:"",//模板类型的名称
  modelid:"",  //选择的模板的id
  bookinfo:{}, //保存成功的制作相册的下一步时保存的图书信息
  vgiftuserlist:[], //礼品卡使用的数量
  vgiftflag:true, // 礼品卡的入口 false-个人中心   true -- 确认支付
  vaddressenterflag:false, //地址管理的入口 false-确认支付   true -- 个人中心
  vaddress:"",  //最后收货地址


}

const mutations = {
  //token值的保留
  changeToken(state, value){
    state.token = value;
  },
  //模板类型的id
  changeModelTypeId(state, value){
    state.modeltypeid = value;
  },
  //模板类型的name
  changeModelTypeName(state, value){
    state.modeltypename = value;
  },
  //选择的模板的id
  changeModelId(state, value){
    state.modelid = value;
  },
  //保存成功的制作相册的下一步时保存的图书信息
  changeObj(state,value){
    state.bookinfo=value;
  },
   //礼品卡使用的数量
  changeGiftlist(state,value){
    state.vgiftuserlist=value;
  },
  //礼品卡的入口
  changeGift(state,value){
    state.vgiftflag=value;
  },
   //地址管理的入口
   changeEnter(state,value){
    state.vaddressenterflag=value;
  },
  //收获地址
  changeaddress(state,value){
    state.vaddress=value;
  },
}

export default new Vuex.Store({
  state,
  mutations,
})
