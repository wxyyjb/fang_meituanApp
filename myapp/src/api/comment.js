import request from '@/utils/request'
// 获取商家评论
export function getComment(data) {
  return request({
    url: '/get_info',
    data
  })
}