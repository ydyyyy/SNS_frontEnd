<template>
    <div v-title data-title="SNS 社交网络平台系统">
      <el-container>
        <el-main class="me-articles">
          <project-scroll-page></project-scroll-page>
          
        </el-main>
        <el-aside>
          <card-project cardHeader="我发布的项目" :projects="myProjects"></card-project>
        </el-aside>
        <ProjectReList></ProjectReList>
      </el-container>
    </div>
  </template>
  
  <script>
    import CardProject from '@/components/card/CardProject'
    import ArticleScrollPage from '@/views/common/ArticleScrollPage'
    import PelProjectScrollPage from '@/views/common/RelProjectScrollPage'
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
              this.$message({ type: 'error', message: '我发布的项目加载失败!', showClose: true })
            }
          })
        }
      },
      components: {
        PelProjectScrollPage,
        'card-project': CardProject
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
  