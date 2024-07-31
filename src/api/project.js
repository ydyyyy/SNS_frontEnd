import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:8888', // 确保这个 URL 与 Spring Boot 应用程序匹配
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Oauth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsiaWQiOjIsImFjY291bnQiOiIxMTEifSwiZXhwIjoxNzIyNDUyNTAzfQ.8VJAJV6wbOcdEYyys-A9qGFtDs6h8yEzb-N1nzccPsc'
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

  export function postapply(pid,applicantForm){
    return request({
        url: `/projects/${pid}/apply`,
        method: 'post',
        data: applicantForm
      })
  }
  export function postprojectchoose(pid,uid){
    return request({
        url: `/projects/${pid}/choose/${uid}`,
        method: 'post'
      })
  }
  export function getProjectapply() {
    return request({
      url: `/projects/applied`,
      method: 'get'
    })
  }
  export function getProjectcreated() {
    return request({
      url: `/projects/created`,
      method: 'get'
    })
  }
  export function getProjectreceived() {
    return request({
      url: `/projects/received`,
      method: 'get'
    })
  }