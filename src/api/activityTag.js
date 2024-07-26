import request from '@/request'

export function getAllTags() {
  return request({
    url: '/activityTags',
    method: 'get',
  })
}

export function getAllTagsDetail() {
  return request({
    url: '/activityTags/detail',
    method: 'get',
  })
}

export function getOningTags() {
  return request({
    url: '/activityTags/oning',
    method: 'get',
  })
}

export function getTag(id) {
  return request({
    url: `/activityTags/${id}`,
    method: 'get',
  })
}

export function getTagDetail(id) {
  return request({
    url: `/activityTags/detail/${id}`,
    method: 'get',
  })
}
