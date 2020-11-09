import request from '@/utils/request'
// 获取商品分类
export function getCategory(data) {
  return request({
    url: '/get_type',
    data
  })
}
// 获取商家
export function getStore(data) {
  return request({
    url: '/get_store',
    data
  })
}
