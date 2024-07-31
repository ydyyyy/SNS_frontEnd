<template>
    <div v-title data-title="ForFun Find Yourself">
      <el-container>
  
        <el-main class="me-articles">
  
          <recommend-scroll-page-mine></recommend-scroll-page-mine>
  
        </el-main>
  
  
      </el-container>
    </div>
  </template>
  
  <script>
    import RecommendScrollPageMine from '@/views/common/RecommendScrollPageMine'
  
  
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
        RecommendScrollPageMine,
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
  