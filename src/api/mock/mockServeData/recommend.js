import Mock from "mockjs";
import { getNewRecommend } from "../../recommendApi/recommend";
export default {
  // 技术栈分类
  getHotstack: (config) => {
    return {
      code: 0,
      data: [
        {
          avatar: "/category/front.png",
          id: 1,
          tagname: "前端",
        },
        {
          avatar: "/category/back.png",
          id: 2,
          tagname: "后端",
        },
        {
          avatar: "/category/lift.jpg",
          id: 3,
          tagname: "生活",
        },
        {
          avatar: "/category/database.png",
          id: 4,
          tagname: "数据库",
        },
        {
          avatar: "/category/language.png",
          id: 5,
          tagname: "编程语言",
        }
      ],
      msg: "成功(mock)",
    };
  },
  getAllstackDetail: (config) => {
    return {
      code: 0,
      data: [
        {
          articles: 0,
          avatar: "/category/front.png",
          id: 1,
          tagname: "前端",
        },
        {
          articles: 0,
          avatar: "/category/back.png",
          id: 2,
          tagname: "后端",
        },
        {
          articles: 2,
          avatar: "/category/lift.jpg",
          id: 3,
          tagname: "生活",
        },
        {
          articles: 0,
          avatar: "/category/database.png",
          id: 4,
          tagname: "数据库",
        },
        {
          articles: 3,
          avatar: "/category/language.png",
          id: 5,
          tagname: "编程语言",
        }
      ],
      msg: "成功(mock)",
    };
  },
  getstackDetail: (config) => {
    return {
      "code": 0,
      "data": {
        articles: 0,
        avatar: "/category/front.png",
        id: 1,
        tagname: "前端",
      },
      "msg": "成功(mock)"
    }
  },
  // 公司分类
  getAllIndustryDetail: (config) => {
    return {
      "code": 0,
      "data": [
        {
          "articles": 4,
          "avatar": "/company/baidu.jpeg",
          "categoryname": "百度",
          "description": "",
          "id": 1
        },
        {
          "articles": 0,
          "avatar": "/company/tengxun.jpeg",
          "categoryname": "腾讯",
          "description": "",
          "id": 2
        },
        {
          "articles": 3,
          "avatar": "/company/jingdong.jpeg",
          "categoryname": "京东",
          "description": "",
          "id": 3
        },
        {
          "articles": 1,
          "avatar": "/company/meituan.png",
          "categoryname": "美团",
          "description": "",
          "id": 4
        },
        {
          "articles": 0,
          "avatar": "/company/Rxing.png",
          "categoryname": "R星",
          "description": "",
          "id": 5
        },
        {
          "articles": 0,
          "avatar": "/company/weiruan.png",
          "categoryname": "微软",
          "description": "",
          "id": 6
        },
        {
          "articles": 0,
          "avatar": "/company/xiaomi.jpeg",
          "categoryname": "小米",
          "description": "",
          "id": 7
        },
        {
          "articles": 0,
          "avatar": "/company/zhongruan.png",
          "categoryname": "中软",
          "description": "",
          "id": 8
        },
        {
          "articles": 0,
          "avatar": "/company/zijie.jpeg",
          "categoryname": "字节",
          "description": "",
          "id": 8
        }
      ],
      "msg": "成功"
    }
  },
  getIndustryDetail: (config) => {
    return {
      "code": 0,
      "data": {
        "articles": 4,
        "avatar": "/category/front.png",
        "categoryname": "前端",
        "description": "",
        "id": 1
      },
      "msg": "成功"
    }
  },
  // 评论
  getCommentsByRecommend: (config) => {
    return {
      "code":0,
      "data":[
        {
          "author":{
            "avatar":"/static/user/user_4.png",
            "id":16,
            "nickname":"yyy"
          },
          "childrens":[],
          "content":"222",
          "createDate":"2024.07.28 15:06",
          "id":64,
          "level":"0"
        },
        {
          "author":{
            "avatar":"/static/user/user_4.png",
            "id":16,
            "nickname":"yyy"
          },
          "childrens":[],
          "content":"11111",
          "createDate":"2024.07.28 15:02",
          "id":62,
          "level":"0"
        },
        {
          "author":{
            "avatar":"/static/user/user_4.png",
            "id":16,
            "nickname":"yyy"
          },
          "childrens":[
            {
              "author":{
                "avatar":"/static/user/user_4.png",
                "id":16,
                "nickname":"yyy"
              },
              "childrens":[],
              "content":"nope",
              "createDate":"2024.07.28 15:00",
              "id":59,
              "level":"1"
            },
            {
              "author":{
                "avatar":"/static/user/user_4.png",
                "id":16,
                "nickname":"yyy"
              },
              "childrens":[],
              "content":"nope",
              "createDate":"2024.07.28 15:00",
              "id":60,
              "level":"1"
            },
            {
              "author":{
                "avatar":"/static/user/user_4.png",
                "id":16,
                "nickname":"yyy"
              },
              "childrens":[],
              "content":"nope",
              "createDate":"2024.07.28 15:01",
              "id":61,
              "level":"1"
            },
            {
              "author":{
                "avatar":"/static/user/user_4.png",
                "id":16,
                "nickname":"yyy"
              },
              "childrens":[],
              "content":"haha",
              "createDate":"2024.07.28 15:04",
              "id":63,
              "level":"2",
              "toUser":{
                "avatar":"/static/user/user_4.png",
                "id":16,
                "nickname":"yyy"
              }
            }
          ],
          "content":"recial,do you love me",
          "createDate":"2024.07.26 15:30",
          "id":58,
          "level":"0"
        }
      ],
      "msg":"成功"
    }
  },
  //评论有一个未完成
  // 文章
  getRecommend: (config) => {
    return {
      "code": 0,
      "data": [
        {
          "author": {
            "nickname": "yyy"
          },
          "commentCounts": 0,
          "createDate": "2024.07.26 10:04",
          "id": 29,
          "summary": "测试一个图片",
          "tags": [
            {
              "tagname": "Html"
            },
            {
              "tagname": "Css"
            }
          ],
          "title": "测试一个图片",
          "viewCounts": 2,
          "weight": 0
        },
        {
          "author": {
            "nickname": "yyy"
          },
          "commentCounts": 0,
          "createDate": "2024.07.25 11:07",
          "id": 28,
          "summary": "nihao",
          "tags": [
            {
              "tagname": "Vue"
            }
          ],
          "title": "nihao",
          "viewCounts": 8,
          "weight": 0
        },
        {
          "author": {
            "nickname": "史明辉"
          },
          "commentCounts": 0,
          "createDate": "2018.02.01 14:47",
          "id": 10,
          "summary": "本节将介绍如何在项目中使用 Element。",
          "tags": [
            {
              "tagname": "Vue"
            },
            {
              "tagname": "Css"
            },
            {
              "tagname": "Html"
            },
            {
              "tagname": "JavaScript"
            }
          ],
          "title": "Element相关",
          "viewCounts": 6,
          "weight": 0
        },
        {
          "author": {
            "nickname": "史明辉"
          },
          "commentCounts": 0,
          "createDate": "2018.02.01 14:37",
          "id": 9,
          "summary": "Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。",
          "tags": [
            {
              "tagname": "Vue"
            }
          ],
          "title": "Vue.js 是什么",
          "viewCounts": 3,
          "weight": 0
        },
        {
          "author": {
            "nickname": "史明辉"
          },
          "commentCounts": 4,
          "createDate": "2018.01.31 13:16",
          "id": 1,
          "summary": "Vue构建前台页面过程1Vue构建前台页面过程2Vue构建前台页面过程3Vue构建前台页面过程4Vue构建前台页面过程5Vue构建前台页面过程6Vue构建前台页面过程7Vue构建前台页面过程8",
          "tags": [
            {
              "tagname": "Vue"
            },
            {
              "tagname": "Html"
            },
            {
              "tagname": "Css"
            }
          ],
          "title": "Vue构建前台页面Vue构建前台页面Vue构建前台页面Vue构建前台页面",
          "viewCounts": 59,
          "weight": 0
        }
      ],
      "msg": "成功"
    }
  },
  getHotRecommend: (config) => {
    return {
      "code": 0,
      "data": [
          {
              "id": 1,
              "title": "Vue构建前台页面Vue构建前台页面Vue构建前台页面Vue构建前台页面"
          },
          {
              "id": 28,
              "title": "nihao"
          },
          {
              "id": 10,
              "title": "Element相关"
          },
          {
              "id": 9,
              "title": "Vue.js 是什么"
          },
          {
              "id": 29,
              "title": "测试一个图片"
          }
      ],
      "msg": "成功"
  }
  },
  getNewRecommend: (config) => {
    return {
      "code": 0,
      "data": [
          {
              "id": 29,
              "title": "测试一个图片"
          },
          {
              "id": 28,
              "title": "nihao"
          },
          {
              "id": 10,
              "title": "Element相关"
          },
          {
              "id": 9,
              "title": "Vue.js 是什么"
          },
          {
              "id": 1,
              "title": "Vue构建前台页面Vue构建前台页面Vue构建前台页面Vue构建前台页面"
          }
      ],
      "msg": "成功"
  }
  },
  viewRecommend: (config) => {
    return {
      "code":0,
      "data":{
        "author":{
          "avatar":"/static/user/user_4.png",
          "id":16,
          "nickname":"yyy"
        },
        "body":{
          "content":"# kk\n## do you love me",
          "id":45
        },
        "category":{
          "avatar":"/category/lift.jpg",
          "categoryname":"生活",
          "description":"",
          "id":3
        },
        "commentCounts":7,
        "createDate":"2024.07.26 12:55",
        "id":32,
        "summary":"summarry",
        "tags":[
          {
            "id":6,
            "tagname":"JavaScript"
          }
        ],
        "title":"dd",
        "viewCounts":70,
        "weight":0
      },
      "msg":"成功"
    }
  },
  publishRecommend: (config) => {
    return  {
      "code": 0,
      "data": {
          "articleId": 32
      },
      "msg": "成功"
  }
  },
  listRecommendArchives: (config) => {
    return {
      "code": 0,
      "data": [
          {
              "commentCounts": 0,
              "count": 1,
              "month": 1,
              "summary": "",
              "title": "",
              "viewCounts": 0,
              "weight": 0,
              "year": 2018
          },
          {
              "commentCounts": 0,
              "count": 2,
              "month": 2,
              "summary": "",
              "title": "",
              "viewCounts": 0,
              "weight": 0,
              "year": 2018
          },
          {
              "commentCounts": 0,
              "count": 5,
              "month": 7,
              "summary": "",
              "title": "",
              "viewCounts": 0,
              "weight": 0,
              "year": 2024
          }
      ],
      "msg": "成功"
  }
  },
  getRecommendById: (config) => {
    return {
      "code": 0,
      "data": {
          "author": {
              "account": "yyy",
              "admin": false,
              "avatar": "/static/user/user_4.png",
              "deleted": false,
              "email": "",
              "id": 16,
              "mobilePhoneNumber": "",
              "nickname": "yyy",
              "password": "953ed798d440fda8959b588be09a850f",
              "salt": "f92d87cb87c7bc0f0b4367dabac64359",
              "status": "normal"
          },
          "body": {
              "content": "# kk\n## do you love me",
              "id": 45
          },
          "category": {
              "avatar": "/category/lift.jpg",
              "categoryname": "生活",
              "description": "",
              "id": 3
          },
          "commentCounts": 0,
          "createDate": "2024.07.26 12:55",
          "id": 32,
          "summary": "summarry",
          "tags": [
              {
                  "avatar": "/tag/js.png",
                  "id": 6,
                  "tagname": "JavaScript"
              }
          ],
          "title": "dd",
          "viewCounts": 33,
          "weight": 0
      },
      "msg": "成功"
  }
  }
}