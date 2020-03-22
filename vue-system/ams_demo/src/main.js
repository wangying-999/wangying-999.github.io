import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from "element-ui";


import 'element-ui/lib/theme-chalk/index.css';

import "./assets/css/index.scss";
import './assets/css/icon.css';



Vue.use(ElementUI, {
  size: 'small'
});

import VueResource from "vue-resource";
Vue.use(VueResource);

Vue.config.productionTip = false;

//使用钩子函数对路由进行权限跳转e 
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | ams-demo`;
  const role = localStorage.getItem('ms_username');
   if (!role && to.path !== '/register' && to.path !== '/login') {
    
   
        next('/login');
        
     
     
  } else if (to.meta.permission) {
      // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
      role === 'wyadmin' ? next() : next('/error');
  } else {
      // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    
          next();
      
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
