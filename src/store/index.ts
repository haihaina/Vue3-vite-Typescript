import { InjectionKey } from 'vue'
/**
 * 引入 InjectionKey 并将其传入 useStore 使用过的任何地方，
 * 很快就会成为一项重复性的工作。为了简化问题，可以定义自己
 * 的组合式函数来检索类型化的 store 
 */
// 未简化useStore版
// import { createStore, Store } from 'vuex'
// 简化useStore版
import { useStore as baseUseStore, createStore, Store} from 'vuex'

// 为 store state 声明类型
export interface State {
    username: string,
    count: number,
    layoutData: any,
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

// 导出store模块
export const store = createStore<State>({
    state: {
        username: "测试store",
        count: 0,
        layoutData:[] // 路由展示的内容
    },
    getters:{
        getName: state =>{
            return state.username
        },
    },
    mutations: {
        // 重置名称
        SET_NAME(state, params:string) {
            state.username = params
        },
        // 改变路由数据
        setlayoutData(state,params:any) {
            // console.log('改变路由数据',params)
            state.layoutData = params
        }
    },
    actions:{}
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
    return baseUseStore(key)
}