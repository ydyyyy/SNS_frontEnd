import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:8888', // 确保这个 URL 与 Spring Boot 应用程序匹配
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Oauth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsiaWQiOjMsImFjY291bnQiOiJsaHgifSwiZXhwIjoxNzIyMzY2MjQzfQ.-uAqQNKIsSJgxdPcCHxpKyIgGpmKTJrSNcg-e10ZEpQ'
  },
});

export function getProjects(query = {}, innerPage = {}) {
  return request({
    url: '/projects',
    method: 'get',
    params: {
      ...query,
      ...innerPage
    }
  }).catch(error => {
    console.error("API 调用失败:", error);
    if (error.response) {
      console.error("状态码:", error.response.status);
      console.error("响应数据:", error.response.data);
    }
    throw error; // 重新抛出错误以便在调用方处理
  });
}



  export function getProjectById(id) {
    return request({
      url: `/projects/${id}`,
      method: 'get'
    })
  }
  export function getProjectByuser_id(user_id) {
    return request({
      url: `/projects/user/${user_id}`,
      method: 'get'
    })
  }
  export function getProjectByapplicant_id(applicant_id){
    return request({
        url: `/projects/applicant/${applicant_id}`,
        method: 'get'
      })
  }
  export function viewProject(id){
    return request({
        url: `/projects/view/${id}`,
        method: 'get'
      })
  }
  export function getProjectsByCategory(id){
    return request({
        url: `/projects/Category/${id}`,
        method: 'get'
      })
  }

  export function publishProject(project) {
    return request({
      url: '/projects/create',
      method: 'post',
      data: project
    })
  }
