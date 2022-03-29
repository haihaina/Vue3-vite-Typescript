<template>
    <h2> {{newquery.name}}</h2>
        <div v-if="newquery.id ==7" @click="examineFn(7)" class="examineStyle">
            点击查看组件库
        </div>
        <div v-else-if="newquery.id ==8" @click="examineFn(8)"   class="examineStyle">
            点击查看个人博客
        </div>
         <div v-else-if="newquery.id ==9" @click="examineFn(9)"   class="examineStyle">
            点击查看gitee
        </div>
           <div v-else  class="examineStyle">
           功能开发中...
        </div>
        <echarts />
</template>
<script setup lang="ts"> 
import {reactive, ref} from 'vue'
import { useRouter,onBeforeRouteUpdate  } from 'vue-router'
import echarts from '../../components/echart/index.vue'
// 获取到默认参数
const router = useRouter()
const deful=  reactive({
    name:'首页',
    id:1
})
const newquery = ref(router.currentRoute.value.query.name?router.currentRoute.value.query:deful)
onBeforeRouteUpdate((to) => {
    //   console.log(to, "=====");
      newquery.value = to.query
       let querys = new Proxy(newquery.value,{});
    // console.log('newquery',newquery.value)
    console.log(querys.name,querys.id)
    
    });
const examineFn =((e:Number) =>{
    if(e === 7){
        window.open('http://broui.haihaina.cn/')
    }else if(e=== 8) {
        window.open('http://haihaina.cn/')
    }else {
        window.open('https://gitee.com/chongqing-joker-xue/vue3-vite-ts-project-template')
    }
    
})
</script>
<style lang="less" scoped>
.examineStyle{
    width: 50vw;
    margin: 0 auto;
    background: #9a54a7;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
}
</style>