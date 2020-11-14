import { getProdById } from '@/api/detail'
import Vue from 'vue'
const product = {
  namespaced: true,
  state: {
    prodList: []
  },
  getters: {
    // 选中加入购物车的商品
    selectList(state) {
      let result = []
      state.prodList.forEach(obj => {
        obj.content.forEach(prod => {
          if (prod.count) {
            result.push(prod)
          }
        })
      })
      return result
    },
    // 计算购物车总数
    total(state, getter) {
      return getter.selectList.reduce((total, prod) => {
        return total + prod.count
      }, 0)
    },
    // 计算总价的方法
    totalPrice(state, getter) {
      return getter.selectList.reduce((price, prod) => {
        return price + prod.count * prod.price
      }, 0)
    }
  },
  mutations: {
    saveProdList(state, arr) {
      state.prodList = [...arr]
    },
    // 添加购物车
    addCart(state, { type, index }) {
      // 二维数组，要知道分类、索引
      let prod = state.prodList[type].content[index]
      if (prod.count) {
        Vue.set(prod, 'count', prod.count + 1)
      } else {
        Vue.set(prod, 'count', 1)
      }
    },
    // 减少购物车数量
    reduceCart(state, { type, index }) {
      let prod = state.prodList[type].content[index]
      if (prod.count) {
        Vue.set(prod, 'count', prod.count - 1)
      }
    },
    // 清空购物车列表
    clearCartList(state){
      state.prodList.forEach((item) =>{
        item.content.forEach(prod=>{
          if(prod.count){
            prod.count=0
          }
        })
      })
    }
  },
  actions: {
    // 请求点餐列表
    getProdList({ commit }, id) {
      return new Promise(resolve => {
        getProdById({ id }).then(res => {
          let list =res.data.goods
          // 获取商品的分类和索引
          list.forEach((item,type)=>{
            item.content.forEach((prod,index)=>{
              prod.type=type
              prod.index=index
            })
          })
          commit('saveProdList', list)
          resolve()
        })
      })
    }
  }
}
export default product
