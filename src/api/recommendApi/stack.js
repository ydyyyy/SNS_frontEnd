import request from '@/request'
// 已写好接口文档
export function getAllStackDetail() {
  return request({
    url: '/stack/detail',
    method: 'get',
  })
}
// 已写好接口文档
export function getHotStack() {
  return request({
    url: '/stack/hot',
    method: 'get',
  })
}

//已写好接口文档
export function getStackDetail(id) {
  return request({
    url: `/stack/detail/${id}`,
    method: 'get',
  })
}
