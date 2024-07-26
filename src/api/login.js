import request from '@/request'
//已完成
export function login(account, password) {
  const data = {
    account,
    password
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
//已完成
export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
//已完成
export function getUserInfo() {
  return request({
    url: '/users/currentUser',
    method: 'get'
  })
}
//已完成
export function register(account, nickname, password) {
  const data = {
    account,
    nickname,
    password
  }
  return request({
    url: '/register',
    method: 'post',
    data
  })
}
