<template>
    <div v-title data-title="SNS 社交网络平台系统">
      <el-container>
  
        <el-main class="me-articles">
  
          <project-scroll-page></project-scroll-page>
  
        </el-main>

  
      </el-container>
    </div>
  </template>
  
  <script>
    import CardMe from '@/components/card/CardMe'
    import ProjectScrollPage from '@/views/common/ProjectScrollPage'
    //导入项目列表
  
    export default {
      name: 'Project',
      created() {
      },
      data() {
        return {
          projects: []
        }
      },
      methods: {
      },
      components: {
        'card-me': CardMe,
        ProjectScrollPage,
      }
    }
  </script>
  
  <style scoped>
  
    .el-container {
      width: 960px;
    }
  
    .el-aside {
      margin-left: 20px;
      width: 260px;
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
  