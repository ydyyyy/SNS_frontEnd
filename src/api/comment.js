import request from '@/request'


export function getCommentsByArticle(id) {
  return request({
    url: `/comments/article/${id}`,
    method: 'get'
  })
}

export function getCommentsByActivity(id) {
  return request({
    url: `/comments/activity/${id}`,
    method: 'get'
  })
}

export function publishComment(comment) {
  return request({
    url: '/comments/create/change',
    method: 'post',
    data: comment
  })
}

export function publishActivityComment(comment) {
  return request({
    url: '/activity/comments/create/change',
    method: 'post',
    data: {
      activityId: comment.activityId,
      content: comment.content,
      parentId: comment.parentId,
      toUid: comment.toUid
    }
  });
}

