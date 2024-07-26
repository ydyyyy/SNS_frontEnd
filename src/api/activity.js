import request from '@/request'


export function getActivities(query, page) {
  return request({
    url: '/activities',
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

export function getHotActivities() {
  return request({
    url: '/activities/hot',
    method: 'get'
  })
}

export function getNewActivities() {
  return request({
    url: '/activities/new',
    method: 'get'
  })
}

export function viewActivity(id) {
  return request({
    url: `/activities/view/${id}`,
    method: 'get'
  })
}

export function getActivitiesByCategory(id) {
  return request({
    url: `/activities/category/${id}`,
    method: 'get'
  })
}

export function getActivitiesByTag(id) {
  return request({
    url: `/activities/tag/${id}`,
    method: 'get'
  })
}


export function publishActivity(article) {
  return request({
    url: '/activities/publish',
    method: 'post',
    data: article
  })
}

export function listArchives() {
  return request({
    url: '/activities/listArchives',
    method: 'get'
  })
}

export function getActivityById(id) {
  return request({
    url: `/activities/${id}`,
    method: 'get'
  })
}
