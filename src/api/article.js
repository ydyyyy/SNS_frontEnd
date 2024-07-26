import request from '@/request'

//已完成
export function getArticles(query, page) {
  return request({
    url: '/articles',
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
export function getHotArtices() {
  return request({
    url: '/articles/hot',
    method: 'get'
  })
}
//已完成
export function getNewArtices() {
  return request({
    url: '/articles/new',
    method: 'get'
  })
}
//已完成
export function viewArticle(id) {
  return request({
    url: `/articles/view/${id}`,
    method: 'get'
  })
}
// 用不上
export function getArticlesByCategory(id) {
  return request({
    url: `/articles/category/${id}`,
    method: 'get'
  })
}
// 用不上
export function getArticlesByTag(id) {
  return request({
    url: `/articles/tag/${id}`,
    method: 'get'
  })
}

// 已完成
export function publishArticle(article) {
  return request({
    url: '/articles/publish',
    method: 'post',
    data: article
  })
}
// 已完成
export function listArchives() {
  return request({
    url: '/articles/listArchives',
    method: 'get'
  })
}
// 已完成
export function getArticleById(id) {
  return request({
    url: `/articles/${id}`,
    method: 'get'
  })
}
