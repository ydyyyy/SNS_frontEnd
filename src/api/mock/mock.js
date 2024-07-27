import Mock from "mockjs";

import recommend from "./mockServeData/recommend";

// 公司分类请求
Mock.mock('http://localhost:8888/company/hot', recommend.getHotCompany)
Mock.mock('http://localhost:8888/company/detail', recommend.getAllCompanyDetail)
Mock.mock(/http:\/\/localhost:8888\/company\/detail\/\w+/, 'get', recommend.getCompanyDetail);

// 行业分类请求
Mock.mock('http://localhost:8888/industry/detail', recommend.getAllIndustryDetail)
Mock.mock(/http:\/\/localhost:8888\/industry\/detail\/\w+/, 'get', recommend.getIndustryDetail);

// 评论请求
Mock.mock(/http:\/\/localhost:8888\/comments\/recommend\/\w+/, 'get', recommend.getCommentsByRecommend);

// 文章请求
Mock.mock('http://localhost:8888/recommend/hot', recommend.getHotRecommend)
Mock.mock('http://localhost:8888/recommend/new', recommend.getNewRecommend)
Mock.mock('http://localhost:8888/recommend/publish', recommend.publishRecommend)
Mock.mock('http://localhost:8888/recommend/listArchives', recommend.listRecommendArchives)
Mock.mock(/http:\/\/localhost:8888\/recommend\/view\/\w+/, 'get', recommend.viewRecommend);
Mock.mock(/http:\/\/localhost:8888\/recommend\/\w+/, 'get', recommend.getRecommendById);
Mock.mock(/http:\/\/localhost:8888\/recommend.*/, 'get', recommend.getRecommend);



