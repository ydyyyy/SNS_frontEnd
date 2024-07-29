<template>
    <div v-title data-title="ForFun Find Yourself">
      <el-container>
  
        <el-main class="me-articles">
  
          <recommend-scroll-page></recommend-scroll-page>
  
        </el-main>
  
  
      </el-container>
    </div>
  </template>
  
  <script>
     import CardRecommend from '@/components/card/cardRecommend/CardRecommend'
    import RecommendScrollPage from '@/views/common/RecommendScrollPage'
  
    import {getAuditRecommend} from '@/api/recommendApi/recommend'
  
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
        'card-recommend': CardRecommend,
        RecommendScrollPage,
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
  