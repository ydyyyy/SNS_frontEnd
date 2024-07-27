import request from '@/request'
// 已写好接口文档
export function getAllCompanyDetail() {
  return request({
    url: '/company/detail',
    method: 'get',
  })
}
// 已写好接口文档
export function getHotCompany() {
  return request({
    url: '/company/hot',
    method: 'get',
  })
}

//已写好接口文档
export function getCompanyDetail(id) {
  return request({
    url: `/company/detail/${id}`,
    method: 'get',
  })
}
