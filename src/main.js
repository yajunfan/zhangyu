// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Row, Col,Tab, Tabs ,Search , Swipe , SwipeItem ,Uploader ,Icon   } from 'vant'
Vue.use(Button).use(Row).use(Col).use(Tab).use(Tabs).use(Search).use(Swipe).use(SwipeItem).use(Uploader).use(Icon);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
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
