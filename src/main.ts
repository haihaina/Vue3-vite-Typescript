import { createApp } from 'vue';
import App from './App.vue';
// 引入vuex
import {store,key } from './store';
// 注入router
import router from './router';
// 引入饿了么
import ElementPlus from 'element-plus';
// 引入饿了么样式
import 'element-plus/dist/index.css'
// 全局注册图标
import {Edit,Search,CloseBold } from '@element-plus/icons';

createApp(App).use(store,key).use(router).use(ElementPlus).component('edit',Edit).component('search',Search).component('CloseBold',CloseBold).mount('#app')
