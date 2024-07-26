import request from "@/request";

// 已写好接口文档
export function getCommentsByArticle(id) {
  return request({
    url: `/comments/article/${id}`,
    method: "get",
  });
}
// 已写好接口文档
export function publishComment(comment) {
  return request({
    url: "/comments/create/change",
    method: "post",
    data: comment,
  });
}
