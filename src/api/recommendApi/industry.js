import request from "@/request";
// 已写好接口文档
export function getAllIndustryDetail() {
  return request({
    url: "/industry/detail",
    method: "get",
  });
}
// 已写好接口文档
export function getIndustryDetail(id) {
  return request({
    url: `/industry/detail/${id}`,
    method: "get",
  });
}
