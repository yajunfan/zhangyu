// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import $ from '../src/js/jquery.min'
import 'vant/lib/vant-css/index.css'
import './css/reset.css'
import { Area,AddressEdit ,Button ,Card,CellGroup,ContactCard, ContactList, ContactEdit, Col,Dialog,Field ,Icon ,Popup, Row ,Tab, Tabs ,Toast ,
  Search ,Step, Steps,Switch ,SwitchCell ,Sku ,Uploader ,SubmitBar} from 'vant'
Vue.use(Area).use(AddressEdit).use(Button).use(Card).use(CellGroup).use(ContactCard).use(ContactList).use(ContactEdit).use(Col).use(Dialog)
.use(Field).use(Icon).use(Popup).use(Row).use(Tab).use(Tabs).use(Toast).use(Search).use(Switch).use(SwitchCell).use(Step).use(Steps).use(Sku)
.use(Uploader).use(SubmitBar);
Dialog.resetDefaultOptions={
  className:"tc"
}
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
//   next();
// })
