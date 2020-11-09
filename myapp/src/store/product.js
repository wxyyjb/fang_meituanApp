import { getProdById } from '@/api/detail'
const product = {
  namespaced: true,
  state: {
    prodList: []
  },
  getters: {},
  mutations: {
    saveProdList(state, arr) {
      state.prodList = [...arr]
    }
  },
  actions: {
    // 请求点餐列表
    getProdList({ commit }, id) {
      return new Promise(resolve => {
        getProdById({id}).then(res => {
          commit('saveProdList', res.data.goods)
          resolve()
        })
      })
      
    }
  }
}
export default product
