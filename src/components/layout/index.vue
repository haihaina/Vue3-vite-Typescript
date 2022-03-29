<template>
  <div class="common-layout">
    <el-container>
        <!-- 左侧边栏 -->
      <el-aside width="80px;height:100vh">
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
    background-color: #9a54a7;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #6a54a7;
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
