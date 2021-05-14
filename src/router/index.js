import Vue from 'vue'
import VueRouter from 'vue-router'

import Hello from '../components/HelloWorld.vue'
Vue.use(VueRouter)

const routes = [

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/hello',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/sign',
    name:'sign',
    component:()=>import('../components/sign'),
  },
  {
    path: '/renyuan',
    name:'renyuan',
    component:()=>import('../components/renyuan.vue'),
  },
  {
    path: '/shijian',
    name:'shijian',
    component:()=>import('../components/shijian'),
  },
  {
    path: '/wuzi',
    name:'wuzi',
    component:()=>import('../components/wuzi'),
  },
  {
    path: '/city',
    name:'city',
    component:()=>import('../components/city'),
  },
  {
    path: '/jiebaowh',
    name:'jiebaowh',
    component:()=>import('../components/jiebaowh'),
  },
  {
    path: '/qiye',
    name:'qiye',
    component:()=>import('../components/qiye'),
  },
  {
    path: '/liucheng',
    name:'liucheng',
    component:()=>import('../components/liucheng'),
  },
  {
    path: '/jiebaoglzh',
    name:'jiebaoglzh',
    component:()=>import('../components/jiebaoglzh'),
  },
  {
    path: '/jinji',
    name:'jinji',
    component:()=>import('../components/jinji'),
  },
  {
    path: '/jiebaoglzj',
    name:'jiebaoglzj',
    component:()=>import('../components/jiebaoglzj'),
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
