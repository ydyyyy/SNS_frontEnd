<template>
    <scroll-page :loading="loading" :offset="offset" :no-data="noData">
      <recommend-item v-for="a in articles" :key="a.id" v-bind="a"></recommend-item>
    </scroll-page>
  </template>
  
  <script>
    import RecommendItem from '@/components/recommend/RecommendItem'
    import ScrollPage from '@/components/scrollpage'
    import {getRecommend} from '@/api/recommendApi/recommend'
  
    export default {
      name: "RecommendScrollPage",
      props: {
        offset: {
          type: Number,
          default: 100
        },
        page: {
          type: Object,
          default() {
            return {}
          }
        },
        query: {
          type: Object,
          default() {
            return {}
          }
        }
      },
      watch: {
        'query': {
          handler() {
            this.noData = false
            this.articles = []
            this.innerPage.pageNumber = 1
            this.getRecommend()
          },
          deep: true
        },
        'page': {
          handler() {
            this.noData = false
            this.articles = []
            this.innerPage = this.page
            this.getRecommend()
          },
          deep: true
        }
      },
      created() {
        this.getRecommend()
      },
      data() {
        return {
          loading: false,
          noData: false,
          innerPage: {
            pageSize: 5,
            pageNumber: 1,
            name: 'a.createDate',
            sort: 'desc'
          },
          articles: []
        }
      },
      methods: {
        load() {
          this.getRecommend()
        },
        getRecommend() {
          let that = this
          that.loading = true
  
          getRecommend(that.query, that.innerPage).then(data => {
            console.log(data,"]]]]]]]]]]]]]]")
            let newArticles = data.data
            if (newArticles && newArticles.length > 0) {
              that.innerPage.pageNumber += 1
              that.articles = that.articles.concat(newArticles)
              console.log(that.articles, "]]]]]]]]]]]]]]")
            } else {
              that.noData = true
            }
  
          }).catch(error => {
            if (error !== 'error') {
              that.$message({type: 'error', message: '文章加载失败!', showClose: true})
            }
          }).finally(() => {
            that.loading = false
          })
  
        }
      },
      components: {
        'recommend-item': RecommendItem,
        'scroll-page': ScrollPage,
      }
  
    }
  </script>
  
  <style scoped>
    .el-card {
      border-radius: 0;
    }
  
    .el-card:not(:first-child) {
      margin-top: 10px;
  
    }
  </style>
  