<template>
    <div v-title data-title="ForFun Find Yourself">
      <el-container>
  
        <el-main class="me-articles">
  
          <article-scroll-page></article-scroll-page>
  
        </el-main>
  
  
      </el-container>
    </div>
  </template>
  
  <script>
    import CardArticle from '@/components/card/CardArticle'
    import ArticleScrollPage from '@/views/common/ArticleScrollPage'
  
    import {getArticles} from '@/api/article'
  
    export default {
      name: 'Blog',
      created() {
      },
      data() {
        return {
        }
      },
      methods: {
    },
      components: {
        'card-article': CardArticle,
        ArticleScrollPage,
      }
    }
  </script>
  
  <style scoped>
  
    .el-container {
      width: 960px;
    }
  
  
    .el-main {
      padding: 0px;
      line-height: 16px;
    }
  
    .el-card {
      border-radius: 0;
    }
  
    .el-card:not(:first-child) {
      margin-top: 20px;
    }
  </style>
  