import request from '@/request'
// 已写好接口文档
export function getAllTagsDetail() {
  return request({
    url: '/tags/detail',
    method: 'get',
  })
}
// 已写好接口文档
export function getHotTags() {
  return request({
    url: '/tags/hot',
    method: 'get',
  })
}
//已写好接口文档
export function getTagDetail(id) {
  return request({
    url: `/tags/detail/${id}`,
    method: 'get',
  })
}
