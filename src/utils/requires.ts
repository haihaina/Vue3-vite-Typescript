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