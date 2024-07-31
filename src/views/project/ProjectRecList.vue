<template>
    <div v-title data-title="SNS 社交网络平台系统">
      <el-container>
        <el-main class="me-articles">
          <rec-project-scroll-page></rec-project-scroll-page>
        </el-main>
        <el-aside>
          <card-me class="me-area"></card-me>
        </el-aside>
        
      </el-container>
    </div>
  </template>
  
  <script>
    import CardMe from '@/components/card/CardMe'
    import RecProjectScrollPage from '../common/RecProjectScrollPage.vue';
    import { getProjectByuser_id } from '@/api/project'
  
    export default {
      name: 'ProjectReList',
      props: {
        user_id: {
          type: String,
          required: true
        }
      },
      created() {
        this.getProjectByuser_id(this.user_id)
      },
      data() {
        return {
          myProjects: []
        }
      },
      methods: {
        getProjectByuser_id(user_id) {
          getProjectByuser_id(user_id).then(data => {
            this.myProjects = data.data
          }).catch(error => {
            if (error !== 'error') {
              this.$message({ type: 'error', message: '我接收的项目加载失败!', showClose: true })
            }
          })
        }
      },
      components: {
        RecProjectScrollPage,
        'card-me': CardMe
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
  