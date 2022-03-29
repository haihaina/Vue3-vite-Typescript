import { createRouter, createWebHashHistory } from "vue-router";
import LayOut from "../components/layout/index.vue";

const routes = [
    {
        path: '/',
        component: LayOut,
        redirect: '/login',
        children:[
            {
                path: '/home',
                name: 'home',
                component: ()=> import("../view/home/index.vue"),
                meta:{
                    title: '首页',
                    icon: ''
                }
            },
            {
                path: '/about',
                name: 'about',
                component: ()=> import("../view/about/index.vue"),
                meta:{
                    title: '关于',
                    icon: ''
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: ()=> import("../view/login.vue"),
        meta:{
            title: '登录',
            icon: ''
        }
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router