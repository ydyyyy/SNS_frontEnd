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
          "avatar": "/company/jingdong.png",
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
      "code": 0,
      "data": [
          {
              "author": {
                  "avatar": "/static/user/user_4.png",
                  "id": 16,
                  "nickname": "yyy"
              },
              "childrens": [
                  {
                      "author": {
                          "avatar": "/static/user/user_4.png",
                          "id": 16,
                          "nickname": "yyy"
                      },
                      "childrens": [],
                      "content": "你不要骂人",
                      "createDate": "2024.07.26 15:13",
                      "id": 56,
                      "level": "1"
                  },
                  {
                      "author": {
                          "avatar": "/static/user/user_4.png",
                          "id": 16,
                          "nickname": "yyy"
                      },
                      "childrens": [],
                      "content": "就骂",
                      "createDate": "2024.07.26 15:17",
                      "id": 57,
                      "level": "2",
                      "toUser": {
                          "avatar": "/static/user/user_4.png",
                          "id": 16,
                          "nickname": "yyy"
                      }
                  }
              ],
              "content": "sb\n",
              "createDate": "2024.07.26 14:34",
              "id": 55,
              "level": "0"
          }
      ],
      "msg": "成功"
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
      "code": 0,
      "data": {
          "author": {
              "avatar": "/user/admin.png",
              "id": 1,
              "nickname": "史明辉"
          },
          "body": {
              "content": "## 2018-01-04\n\n```\n# 使用vue的Webpack模板生成脚手架\n```\n\n## 2018-01-05\n\n```\n# 引入ElementUI\n\n# babel-plugin-component自定义主题\n# 首页\n# 登陆页\n# 注册页面\n# 日志页\n```\n## 2018-01-07\n\n```\n# 调整底部栏始终固定在底部\n# 日志页 添加时间轴\n# 首页的文章列表\n```\n## 2018-01-08\n\n```\n# 使用组件-博客作者tab页 \n# 添加第三方图标\n```\n\n## 2018-01-09\n\n```\n# 调整顶部导航栏：激活文字颜色，click点击\n# 组件-最新文章tab页\n\n# 最新文章、最热文章使用相同组件\n# 底部栏设计\n# 页面与两边边距改为100\n```\n\n## 2018-01-10\n\n```\n# 写博客 引入mavonEditor编辑器\n# 顶部导航栏都放入一个Menu中\n# 写文章页面\n#　mavonEditor局部引入\n\n#　页面的中间区域固定宽度，自动居中\n# 发布和取消\n# 发布dialog\n\n```\n## 2018-01-11\n\n```\n# 文章组件用守卫来改变body背景色\n# 调整登陆和注册页面，使其居中\n\n#子页面调整根元素为div\n#文章详情页\n\n```\n## 2018-01-12\n\n```\n# 文章详情页  内容  评论等\n\n```\n## 2018-01-13\n\n```\n## 重新调整页面结构\t\n#顶部和底部 抽成  BaseHeader BaseFooter 组件\n#BlogView为单独页，以前是Home的子路由\n\n```\n## 2018-01-15\n\n``` \n# 文章分类去掉子级\n# 将首页的文章列表抽成 ArticleItem组件\n# 增加文章的评论展示\n# 增加文章分类、标签页\n\n```\n\n## 2018-01-15  2\n\n``` \n# 回到顶部去掉过渡动画（影响顶部导航栏）\n# 顶部导航栏 增加登录后菜单\n# 首页增加 最热标签\n# 增加 文章分类 标签的详情页\n# 将文章详情页、 文章分类标签页 改为Home的子路由（以前单独页）\n# Home组件增加路由判断：更正导航栏的状态、条件显示底部栏\n\n```\n\n## 2018-01-16\n\n``` \n# 将写文章的顶部Header合并到BaseHeader中\n# 图片都放到了static目录下\n\n```\n\n## 2018-01-24\n\n``` \n# 将自定义的theme放到assets下\n# 加入axios\n# 加入vuex\n# 实现登录\n# 实现退出\n\n```\n\n## 2018-01-25\n\n``` \n# 实现注册逻辑\n# 写文章功能实现\n# 写文章时支持插入图片\n\n```\n## 2018-01-26\n\n``` \n# 引入lodash工具类\n# 优化写文章的工具栏：滚动时固定顶部\n# 写文章 后台获取文章分类和标签\n\n# 首页的文章列表\n\n```\n\n## 2018-01-27\n\n``` \n# 修改首页文章列表的样式\n# 首页加载文章功能\n# 文章查看功能\n# 文章分类和标签功能列表\n\n```\n\n## 2018-01-28\n\n``` \n# 文章分类和标签详情\n\n```\n\n## 2018-01-29\n\n``` \n# 文章分类和标签的文章数\n# 首页最热文章\n# 首页最新文章\n# 首页最热标签\n\n```\n## 2018-01-30\n\n``` \n# BaseHeader放回views中\n# 修改Axios后置拦截，全局处理错误\n# 将登录 退出 和头像 放到一起\n\n```",
              "id": 1
          },
          "category": {
              "avatar": "/category/front.png",
              "categoryname": "前端",
              "description": "",
              "id": 1
          },
          "commentCounts": 4,
          "createDate": "2018.01.31 13:16",
          "id": 1,
          "summary": "Vue构建前台页面过程1Vue构建前台页面过程2Vue构建前台页面过程3Vue构建前台页面过程4Vue构建前台页面过程5Vue构建前台页面过程6Vue构建前台页面过程7Vue构建前台页面过程8",
          "tags": [
              {
                  "id": 7,
                  "tagname": "Vue"
              },
              {
                  "id": 5,
                  "tagname": "Html"
              },
              {
                  "id": 8,
                  "tagname": "Css"
              }
          ],
          "title": "Vue构建前台页面Vue构建前台页面Vue构建前台页面Vue构建前台页面",
          "viewCounts": 72,
          "weight": 0
      },
      "msg": "成功"
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