import request from "@/request";
// 已写好接口文档
export function getAllCategorysDetail() {
  return request({
    url: "/categorys/detail",
    method: "get",
  });
}
// 已写好接口文档
export function getCategoryDetail(id) {
  return request({
    url: `/categorys/detail/${id}`,
    method: "get",
  });
}
