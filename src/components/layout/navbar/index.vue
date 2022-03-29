<template>
  <el-tree class="tree-class" :data="data" :props="defaultProps" node-key="id"  @node-click="handleNodeClick" />
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router';
// 引入vuex
import { useStore} from 'vuex';
import { key} from '../../../store'
interface Tree {
  label: string
  id:number,
  children?: Tree[]
}

const data: Tree[] = [
  {
    label: '首页',
    id:1,
  },
  {
    label: '组件',
    id:2,
    children: [
      {
        label: '拖拽组件',
        id:3,
      },
      {
        label: '搜索组件',
        id:4,
        children: [
          {
            label: '仿百度搜索组件',
            id:5,
          },
        ],
      },
    ],
  },
  {
    label: '文档',
    id:6
  },
  {
    label:'UI组件库',
    id:7
  },
  {
      label:'个人中心',
      id:8
  },
    {
      label:'gitee地址',
      id:9
  }
]
const defaultProps = {
  children: 'children',
  label: 'label',
}
const router = useRouter()
const store =  useStore(key)
// console.log('store',store)
const handleNodeClick = (data: Tree) => {
  // console.log(data)
  if('children' in data) {
       const {children} = data
    console.log('有孩子元素',children)
    // 结束
    return
  }
  const {id,label} = data
  // console.log(id,'label',label)
    const layouts = {
    user_name: label,
    id:id
  }
    let newlayoutData = JSON.parse(JSON.stringify(store.state)).layoutData
    // console.log('newlayoutData',newlayoutData)
    if(newlayoutData.length >=1){
      // 声明类型
     interface statetype {
       user_name:string,
       id:number
     }
      // 进来这里就是vuex中有数据
      let istriggered = 0
      newlayoutData.map((data:statetype) =>{
        if(data.id === id) {
          istriggered = 1
        }
      })
      if(istriggered === 0){
        // 如果进来说明不相等需要把layouts添加进newlayoutData
        newlayoutData.push(layouts)
          // 用户选中的内容需要拿到传值给对应的组件
          store.commit('setlayoutData',newlayoutData)
      }
    }else {
      // 如果进来说明就是没有直接添加
      store.commit('setlayoutData',[layouts])
    }
  // 拿到根据id,label跳转到不同组件
  router.push({
      path:'/home',
      query:{
          name:label,
            id,
      }
  })


}
</script>
<style scoped>
::v-deep .el-tree-node__content{
  height: 50px;
}
::v-deep .el-tree-node__content:hover{
  background-color: #bcaee2 !important;
}

</style>
<style lang='less' scoped>
  .tree-class{
    height: 100%;
    background: #c8aee2;
  }
</style>
