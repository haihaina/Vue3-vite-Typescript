## 安装

```
// 安装vite
1、npm init vite@latest

// 安装vite同时创建vite项目
2、npm init vite@latest demo-ui --template vue
```

## 引入vuex配置和使用

```
// 注意必须安装vuex4.0版本及以上
npm install vuex@next --save
#or
yarn add vuex@next --save
```

####  在src目录下创建store文件夹，新建文件index.ts, index.ts内容如下所示：

```javascript
import { InjectionKey } from 'vue'
import { useStore as baseUseStore, createStore, Store} from 'vuex'

// 为 store state 声明类型
export interface State {
    username: string,
    count: number
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

// 导出store模块
export const store = createStore<State>({
    state: {
        username: "测试store",
        count: 0
    },
    getters:{
        getName: state =>{
            return state.username
        }
    },
    mutations: {
        // 重置名称
        SET_NAME(state, params:string) {
            state.username = params
        }
    },
    actions:{}
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
    return baseUseStore(key)
}
```
#### 在根目录下新建vuex-d.ts文件，内容如下所示：

####  下载持久化插件
#### 在main.ts中注入store模块
``` javascript
import { createApp } from 'vue'
import App from './App.vue'
import {store,key } from './store'
createApp(App).use(store,key).mount('#app')
```
#### 引用测试vuex配置是否正确
```vue
import { InjectionKey } from 'vue'
import { useStore as baseUseStore, createStore, Store} from 'vuex'

// 为 store state 声明类型
export interface State {
    username: string,
    count: number
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

// 导出store模块
export const store = createStore<State>({
    state: {
        username: "测试store",
        count: 0
    },
    getters:{
        getName: state =>{
            return state.username
        }
    },
    mutations: {
        // 重置名称
        SET_NAME(state, params:string) {
            state.username = params
        }
    },
    actions:{}
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
    return baseUseStore(key)
}
```
## router配置
安装
```
// 注意：安装router必须是4.0及以上
npm install vue-router@4
```
##### 页面结构
###### layout/index.vue
```vue
<template>
   <Header>  <Header/>
    <router-view></router-view>
</template>
<script setup lang="ts">
    import Header from './header/index.vue';
</script>
```
###### layout/header/index.vue
```vue
<template>
    <div class="action">
        <h2 @click="handleClick(1)">首页</h2>
        <h2 @click="handleClick(0)">关于</h2>
    </div>
</template>
<script setup lang="ts">
    import { useRouter } from 'vue-router';
    const router = useRouter()

    const handleClick = (num: number)=>{
        if (num) {
            router.push({name: 'home'})
        }else router.push({name: 'about'})
    }
</script>
<style >
    .action{
        display: flex;
    }
    h2{
        padding: 0px 10px;
        cursor: pointer;
    }
    h2:hover{
        color: red;
    }
</style>
```
###### src/view/home/index.vue
```vue
<template>
    <h2>home</h2>
</template>
```
###### src/view/about/index.vue
```vue
<template>
    <h2>about</h2>
</template>
```

#### router.ts
```javascript
import { createRouter, createWebHashHistory } from "vue-router";
import LayOut from "../components/layout/index.vue";

const routes = [
    {
        path: '/',
        component: LayOut,
        redirect: '/home',
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
```
#### 在main.ts中注入router模块
```javascript
import { createApp } from 'vue'
import App from './App.vue'
// 引入vuex
import {store,key } from './store'
// 注入router
import router from './router'
createApp(App).use(store,key).use(router).mount('#app')
```
#### 使用路由 src/components/layout/index.vue
```vue
<template>
    <div class="action">
        <h2 @click="handleClick(1)">首页</h2>
        <h2 @click="handleClick(0)">关于</h2>
       <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
    import { useRouter } from 'vue-router';
    const router = useRouter()

    const handleClick = (num: number)=>{
        if (num) {
            router.push({name: 'home'})
        }else router.push({name: 'about'})
    }
</script>
<style >
    .action{
        display: flex;
    }
    h2{
        padding: 0px 10px;
        cursor: pointer;
    }
    h2:hover{
        color: red;
    }
</style>
```
## 引入element-plus
```
npm install element-plus --save
# or
yarn add element-plus

# 安装icon图标依赖库
npm install @element-plus/icons
# or
yarn add @element-plus/icons
```
#### 在vue文件中引用ui组件
```vue
<template>
    <el-icon :size="20" :color="'blue'">
        <edit />
    </el-icon>
</template>
<script setup lang="ts">
    import { Edit } from '@element-plus/icons'
</script>
```
#### 全局注册图标使用
```javascript
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
import {Edit,Search } from '@element-plus/icons';

createApp(App).use(store,key).use(router).use(ElementPlus).component('edit',Edit).component('search',Search).mount('#app')
```
## css预处理器安装 less安装
// 注意要使用scss，必须安装依赖，否则报错
在vite中不再需要安装less-loader，只需要安装less就好了
在安装less之前如果没有安装淘宝镜像的记得先安装淘宝镜像
我们可运行先下面这条命令来查看，yarn的下载依赖包的仓库地址是否已经安装淘宝镜像

```js
yarn config get registry
```
 ##### 淘宝镜像
 ```js
 yarn config set registry https://registry.npm.taobao.org -g
或
npm config set registry https://registry.npm.taobao.org
 ```
```js
npm i less -D
```
## 配置vite.config.ts
这里主要配置vite服务器的打包保存地址，打包分解，端口号，是否自动打开浏览器，远程请求地址代理目标，目录别名，全局样式配置等。
```javascript
import { defineConfig,loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// import { loadEnv } from 'vite';
// nodejs写法，获取项目目录
import path from 'path';
// https://vitejs.dev/config/
export default({ command, mode }) => {
    return defineConfig({
        plugins: [vue()],
        server:{
            host: '127.0.0.1',
            port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
            strictPort: true, // 端口被占用直接退出
            https: false,
            open: true,// 在开发服务器启动时自动在浏览器中打开应用程序
            proxy: {
                // 字符串简写写法
                // '/foo': '',
                // 选项写法
                '/api': {
                    target: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
            },
            hmr:{
                overlay: true // 屏蔽服务器报错
            }
        },
        resolve:{
            alias:{
                '@': path.resolve(__dirname,'./src')
            }
        },
        css:{
            // css预处理器
            preprocessorOptions: {
                // 引入 var.scss 这样就可以在全局中使用 var.less中预定义的变量了
                // 给导入的路径最后加上 ;
                less: {
                    additionalData: '@import "@/assets/styles/global.less";'
                }
            }
        },
        build:{
            chunkSizeWarningLimit: 1500, // 分块打包，分解块，将大块分解成更小的块
            rollupOptions: {
                output:{
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                }
            }
        }
    })   
}

```
#### path 爆红 
```js
npm install @types/node --save-dev
```
## tsconfig.json 配置
这是typescript的识别配置文件，也是ts向js转化的中间站，这里配置了许多关于ts的文件类型和策略方法。
```json
{
    "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"],
    "baseUrl": ".",
    "paths": {
        "@/*":["src/*"]
    }
  },
  	"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

## shims-vue.d.ts配置, 声明vue文件全局模块
这里是配置声明，比如css，vue等文件，ts不能识别，需要配置声明模块类型。
```javascript
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
```
## .env.环境变量配置和读取
环境变量建议放到项目根目录下, 方便vite.config.ts文件读取和使用
```
.env.production // 生产环境配置文件
.env.development // 开发环境配置文件
```
```
# 开发环境 / #生产环境
VITE_APP_TITLE = "海海呐"
VITE_APP_PORT = 3001

# 请求接口
```
VITE_APP_BASE_URL = "http://haihaina.cn"

//env.d.ts文件内进行 环境变量智能提示配置
interface ImportMetaEnv {
     VITE_APP_TITLE: string,
     VITE_APP_PORT: string,
     VITE_APP_BASE_URL: string
}
```
## vite.config.ts 读取配置文件
```javascript
import { defineConfig,loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// import { loadEnv } from 'vite';
// nodejs写法，获取项目目录
import path from 'path';
// https://vitejs.dev/config/
export default({ command, mode }) => {
    return defineConfig({
        plugins: [vue()],
        server:{
            host: '127.0.0.1',
            port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
            strictPort: true, // 端口被占用直接退出
            https: false,
            open: true,// 在开发服务器启动时自动在浏览器中打开应用程序
            proxy: {
                // 字符串简写写法
                // '/foo': '',
                // 选项写法
                '/api': {
                    target: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
            },
            hmr:{
                overlay: true // 屏蔽服务器报错
            }
        },
        resolve:{
            alias:{
                '@': path.resolve(__dirname,'./src')
            }
        },
        css:{
            // css预处理器
            preprocessorOptions: {
                // 引入 var.scss 这样就可以在全局中使用 var.less中预定义的变量了
                // 给导入的路径最后加上 ;
                less: {
                    additionalData: '@import "@/assets/styles/global.less";'
                }
            }
        },
        build:{
            chunkSizeWarningLimit: 1500, // 分块打包，分解块，将大块分解成更小的块
            rollupOptions: {
                output:{
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                }
            }
        }
    })   
}

```
###  其他文件读取环境变量
```vue
<template>
    首页内容展示
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
// 读取环境变量
const mode = import.meta.env;
onMounted(()=>{
    console.log(mode,555);
})
</script>
```

## src/uitls/requires.ts 配置
###  下载axios
```
npm install axios -s
```
### 下载qs
```
npm i qs
```
### src/uitls/requires.ts
```javascript
// 引入axios
import axios from "axios";
import Qs from 'qs';
// 创建axios实例
const service:any =axios.create({
    baseURL:'http://api.haihaina.cn', // 接口地址
    timeout:10000, // 超时时间
})
// 请求拦截器
service.interceptors.request.use(
    (config:any) =>{
        // 成功
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        config.headers['X-Requested-With'] = 'XMLHttpRequest'
        // 设置token
        // const token:any = $store.getters['token']
        config.data = Qs.stringify(config.data)
        console.log('config',config)
        return config
    },
    (error:any) =>{
        return Promise.reject(error)
    }
)
// 响应拦截器
service.interceptors.response.use(
    // 成功
    (res:any) => {
        if(res.status === 200){
            // 成功
            return Promise.resolve(res.data)
        }else {
            return Promise.reject(res)
        }
    },
    // 失败
    (err:any) =>{
        const status = err.response.status
        if(status === 401){
            //登录过期
        }
        return Promise.reject(status)
    }
)
export default service
```

## src/view/login.vue   login页
``` vue
<template>
  <!-- 登录页 -->
   <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      :model="loginForm"
      :rules="rules"
      :inline="false"
      size="normal"
    >
      <el-form-item />
      <div
        class="login-title"
        style="font-size: 18px; font-weight: 550; padding-bottom: 20px"
      >
        账号登录
      </div>
      <el-form-item >
        <el-input
          v-model="loginForm.account"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item >
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
        />
        <el-button type="text">忘记密码</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="login"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import {ElMessage} from 'element-plus';
import { useRouter } from 'vue-router';
    const loginForm = reactive({
      account: 'admin',
      password: '123456'
    })
    const rules = {
      account: [
        {
          required: true,
          trigger: 'change',
          message: '请输入用户名'
        }
      ],
      password: [
        {
          required: true,
          trigger: 'change',
          message: '请输入密码'
        }
      ]
    }
    const router = useRouter()
    const login = () => {
      console.log('点击保存', loginForm, loginForm.account)
      const z:any = { account: loginForm.account, password: loginForm.password }
      console.log('zzzzz', z)
    //  跳转到首页
          // 提示
          ElMessage({
            message: '登录成功',
            type: 'success'
          })
          router.push({name:'home'})
    }
</script>
<style lang="less" scoped>

.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  .login-form {
    background-color: #fff;
    height: 380px;
    width: 400px;
    box-shadow: 0 0 25px #cac6c6;
    border-radius: 10px;
    padding: 20px 70px;
    .login-title {
      font-size: 25px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>

```

## 创建头部组件 src/components/layout/header/index.vue
``` vue
<template>
头部
</template>
```
## 创建头部组件 src/components/layout/navbar/index.vue
```vue
<template>
<!-- 侧边栏 -->
侧边栏
</template>
```
## 修改layout src/components/layout/index.vue
```vue
<template>
  <div class="common-layout">
    <el-container>
        <!-- 左侧边栏 -->
      <el-aside width="100px">
          <navbar />
      </el-aside>
      <!-- 右边 -->
      <el-container>
          <!-- 头部 -->
        <el-header>
           <headers />
        </el-header>
        <!-- 内容 -->
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
// 头部
import headers from './header/index.vue'
// 侧边栏
import navbar from './navbar/index.vue'
</script>

<style lang="less">
.common-layout {
    height: 98vh;
  .el-header{
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #d3dce6;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 160px;
  }
  .el-container{
      height: 100%;
  }
}
</style>

```

## 导航栏（面包屑）

