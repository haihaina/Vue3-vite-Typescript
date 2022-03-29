<template>

  <!-- 左边类似面包屑 -->
  <div style="float: left;margin-top: 3px;">
<layout/>
  </div>

<!-- 右边 -->
  <div class="flex flex-wrap items-center" style="float: right;margin-top: 6px;">
    <el-dropdown @command="handleCommand">
        <img src="../../../assets/image/icon.jpg" class="headeimg" alt="">
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in dropData" :key="item.id" :command="item.name">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

  </div>


</template>

<script lang="ts" setup>
import {reactive} from 'vue';
import { useRouter } from 'vue-router'
import { ElMessage} from 'element-plus'
// 面包屑
import layout from '../../../layout/index.vue'
const dropData = reactive([
    {
    name:'个人中心',
    id:1,
  },
      {
    name:'首页',
    id:2,
  },
      {
    name:'项目地址',
    id:3,
  },
      {
    name:'退出登录',
    id:4,
  },
  
])
// 拿到用户选中的数据
const router = useRouter()
const handleCommand =(commit:string)=>{
    // console.log('eeee',commit)
    if(commit === '退出登录'){
      // 轻提示
      ElMessage({
        message:'退出成功',
        type:'success'
      })
      // 返回登录页
      router.push({name:'login'})

    }else if(commit === '个人中心'){
      router.push({
        path:'/',
        query:{
          name:commit,
          id:7
        }
      })
    }else if(commit ==='首页') {
          router.push({
        path:'/',
        query:{
          name:commit,
          id:1
        }
      })
    }else if(commit === '项目地址'){
     window.open("https://gitee.com/chongqing-joker-xue/vue3-vite-ts-project-template");
    }
}
</script>
<style lang="less" scoped>
.headeimg{
 width: 50px;
 height:50px;
 border-radius: 25px;
}
</style>
