import request from '@/request'


export function getActivitiesFinished(query, page) {
  return request({
    url: '/activitiesFinished',
    method: 'get',
    params: {
      pageNumber: page.pageNumber,
      pageSize: page.pageSize,
      name: page.name,
      sort: page.sort,
      year: query.year,
      month: query.month,
      ActivityTagId: query.ActivityTagId,
      ActivityCategoryId: query.ActivityCategoryId
    }
  })
}

export function getActivitiesUnFinished(query, page) {
  return request({
    url: '/activitiesUnFinished',
    method: 'get',
    params: {
      pageNumber: page.pageNumber,
      pageSize: page.pageSize,
      name: page.name,
      sort: page.sort,
      year: query.year,
      month: query.month,
      ActivityTagId: query.ActivityTagId,
      ActivityCategoryId: query.ActivityCategoryId
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


export function publishActivity(activity) {
  return request({
    url: '/activities/publish',
    method: 'post',
    data: activity
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

// 获取用户参加过的所有活动
export function getUserActivities(userId) {
  return request({
    url: `/activities/user/${userId}`,
    method: 'get'
  });
}