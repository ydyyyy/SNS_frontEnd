import request from '@/request'

//已完成
export function getRecommend(query, page) {
  return request({
    url: '/recommend',
    method: 'get',
    params: {
      pageNumber: page.pageNumber,
      pageSize: page.pageSize,
      name: page.name,
      sort: page.sort,
      year: query.year,
      month: query.month,
      tagId: query.tagId,
      categoryId: query.categoryId
    }
  })
}
//已完成
export function getHotRecommend() {
  return request({
    url: '/recommend/hot',
    method: 'get'
  })
}
//已完成
export function getNewRecommend() {
  return request({
    url: '/recommend/new',
    method: 'get'
  })
}
//已完成
export function viewRecommend(id) {
  return request({
    url: `/recommend/view/${id}`,
    method: 'get'
  })
}

// 已完成
export function publishRecommend(article) {
  return request({
    url: '/recommend/publish',
    method: 'post',
    data: article
  })
}
// 已完成
export function listRecommendArchives() {
  return request({
    url: '/recommend/listArchives',
    method: 'get'
  })
}
// 已完成
export function getRecommendById(id) {
  return request({
    url: `/recommend/${id}`,
    method: 'get'
  })
}
// 后加-----------------------------------------------
export function agreeRecommend(id) {
  return request({
    url: `/recommend/agree/${id}`,
    method: "get",
  });
}
// 后加-----------------------------------------------
export function rejectRecommend(id) {
  return request({
    url: `/recommend/reject/${id}`,
    method: "get",
  });
}
// 后加-----------------------------------------------
export function getAuditRecommend() {
  return request({
    url: `/recommend/audit`,
    method: "get",
  });
}
