<template>
<div style="display: flex; align-items: center;">
<!-- 这里就是类似面包屑 -->
<div v-for="data in layoutData" :key="data.id" class="layoutClass">
<span style="margin-right: 5px;"  @click="layoutFn(data)">
{{data.user_name}} 
</span> 
<span @click="deleteFn(data)">
        <el-icon :size="12"><close-bold /></el-icon>
</span>


</div>
</div>

</template>
<script lang="ts" setup>
import {computed,onMounted } from 'vue';
import {useStore} from 'vuex';
import { key} from '@/store';
import { useRouter,useRoute} from 'vue-router';

    const store = useStore(key)
    const router =useRouter()
    const route = useRoute()
    // console.log('刷新页面',router)
       onMounted(() => {
    //   console.log('mounted!', route.query, route)
      let z = {
          user_name:route.query.name,
          id:Number(route.query.id)
      }
       store.commit('setlayoutData',[z])
    })
const layoutData = computed(()=>{
    return JSON.parse(JSON.stringify(store.state)).layoutData
})
interface deletetype {
    user_name:string,
    id:number
}
const layoutFn = (data:deletetype) =>{
    router.push({
        path:'/home',
        query:{
            name:data.user_name,
            id:data.id
        }
    })
}
const deleteFn = (data:deletetype)=>{
    // 删除当前数据
    layoutData.value.map((layouts:deletetype,i:number)=>{
            if(layouts.id === data.id){
                // 如果id相等就删除
                layoutData.value.splice(i,1)
            }
    })
    store.commit('setlayoutData',layoutData.value)
}
</script>
<style lang="less" scoped>
.layoutClass{
display: flex;
height: 45px;
line-height: 45px;
margin-right: 10px; 
padding: 5px;
background: #fff;
cursor: pointer;
border-radius: 7px;
}
</style>