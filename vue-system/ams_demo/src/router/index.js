import Vue from "vue"
import VueRouter from "vue-router" 
Vue.use(VueRouter);


import Login from "@/views/login.vue";
import Register from "@/views/register.vue";
import Home from "@/components/common/Home.vue";
import error from "@/views/404.vue";

const routes=[
  {
    path:"/",
    redirect:{
      name:"login"
    }
  },
  {
    path:"/home",
    redirect:{
      name:"sfpage"
    }
  },

  {
    path:"/error",
    name:"error",
    component:error,
    meta: { title: '404' }
  },
  {
    path:"/register",
    name:"register",
    component:Register,
    meta: { title: '注册' }
  },
  {
    path:"/login",
    name:"login",
    component:Login,
    meta: { title: '登录' }
  },

  {
  path:"/home",
  name:"home",
  component:Home,
  children:[
  {
      path: '/sfpage',
      component: () => import(/* webpackChunkName: "dashboard" */ '../views/sfpage.vue'),
      meta: { title: '系统首页' },
      name:"sfpage"
  },
    {
      path: '/sysmessage',
      component: () => import(/* webpackChunkName: "dashboard" */ '../views/sysmessage.vue'),
      meta: { title: '系统消息' },
      name:"sysmessage"
  },
  {
    path: '/cgpassword',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/cgpassword.vue'),
    meta: { title: '修改密码' },
    name:"cgpassword"
  },
  {
    path: '/personal',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/personal.vue'),
    meta: { title: '个人中心' },
    name:"personal"
  },
  {
    path: '/ismodel',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/ismodel.vue'),
    meta: { title: '仪器型号' },
    name:"ismodel"
  },

  {
    path: '/ismoney',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/ismoney.vue'),
    meta: { title: '仪器金额' },
    name:"ismoney"
  },

  {
    path: '/isplace',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/isplace.vue'),
    meta: { title: '仪器放置' },
    name:"isplace"
  },

  {
    path: '/isuse',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/isuse.vue'),
    meta: { title: '仪器使用' },
    name:"isuse"
  },
  {
    path: '/author',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/author.vue'),
    meta: { title: '关注作者' },
    name:"author"
  },


]
  },

  {
    path:"**",
    redirect:{
      name:"error"
    }
  }
]

const router=new VueRouter({
  routes,
  mode:"hash"
})

export default router;
