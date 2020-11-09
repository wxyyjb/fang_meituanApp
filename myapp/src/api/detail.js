import request from '@/utils/request'
// 获取商家详情
export function getStoreById(data) {
  return request({
    url: '/get_store_id',
    data
  })
}

// 获取点餐页信息
export function getProdById(data) {
  return request({
    url: '/get_nav',
    data
  })
}