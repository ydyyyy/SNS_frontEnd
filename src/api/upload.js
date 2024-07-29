import request from '@/request'
// 已写好接口文档
export function upload(formdata) {
  return request({
    headers: {'Content-Type': 'multipart/form-data'},
    url: '/upload',
    method: 'post',
    data: formdata
  })
};

// 更新用户图片
export function uploadAvatar(formdata) {
  return request({
    headers: {'Content-Type': 'multipart/form-data'},
    url: '/users/updateAvatar',
    method: 'post',
    data: formdata
  })
}