<template>
  <!-- 登录页 -->
   <div class="login-container">
    <el-form
      ref="formRef"
      class="login-form"
      :model="loginForm"
    >
      <el-form-item />
      <div
        class="login-title"
        style="font-size: 18px; font-weight: 550; padding-bottom: 20px"
      >
        账号登录
      </div>
      <el-form-item 
        prop="account"
        :rules="[
              { required: true, message: '请输入用户名' },
          ]"
      >
        <el-input
          v-model="loginForm.account"
          placeholder="请输入用户名"
    
        />
      </el-form-item>
      <el-form-item 
              prop="password"
          :rules="[
              { required: true, message: '请输入密码' },
          ]"
      >
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item>
        <div style="display: flex; width: 100%;justify-content: center;">
            <div >
            账号:admin ;
          </div>

          <div>
            密码:123456
        </div>
        </div>
  
        <el-button
          class="login-btn"
          type="primary"
          @click="login(formRef)"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import {ElMessage} from 'element-plus';
import { useRouter } from 'vue-router';
import type { ElForm } from 'element-plus'
    const loginForm = reactive({
      account: '',
      password: ''
    })
    const router = useRouter()
    // ts校验
    interface logintype {
      account:string|number,
      password:string|number
    }
    const formRef = ref<FormInstance>()
    type FormInstance = InstanceType<typeof ElForm>
    const login = (formEl:FormInstance | undefined) => {
        if (!formEl) return
      formEl.validate((valid) => {
    if (valid) {
    const z:logintype = { account: loginForm.account, password: loginForm.password }
    // console.log(z)
    if(z.account ==='admin' && z.password === '123456'){
          //  跳转到首页
          // 提示
          ElMessage({
            message: '登录成功',
            type: 'success'
          })
          router.push({name:'home',query:{
            name:'首页',
            id:1
          }
          })
    }else {
         ElMessage({
            message: '密码错误',
            type: 'error'
          })
    }
    } else {
      return false
    }
  })

    }
</script>
<style lang="less" scoped>

.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9a54a7;
  .login-form {
    background-color: #c8aee2;
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
      background-color: #9a54a7 !important;
      border: #9a54a7;
    }
  }
}
</style>
