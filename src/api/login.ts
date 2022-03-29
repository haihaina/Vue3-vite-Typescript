import  request  from "@/utils/requires";
export function logins(data:object){
    return request({
        url: '/db/index/login',
        method: 'post',
        data
    })
}