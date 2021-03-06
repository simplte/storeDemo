import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import Home from '@/views/home.vue';
import Vuex from '@/views/vuex.vue';
import index from '@/views/index.vue';

const routes: Array<RouteRecordRaw> = [
    {path:'/',name:'elIndex',component: index},
    {path: '/vuex', name: 'Vuex', component: Vuex},
    { path: '/axios', name: 'Axios', component: () => import('@/views/axios.vue')}, // 懒加载组件
    { path: '/city', name: 'city', component: () => import('@/views/city.vue')} ,
    { path: '/msite', name: 'msite', component: () => import('@/views/msite.vue')}, 
    { path: '/shop', name: 'shop', component: () => import('@/views/shop.vue')}, 
    { path: '/testApi', name: 'testApi', component: () => import('@/views/testApi.vue')}, 
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router;