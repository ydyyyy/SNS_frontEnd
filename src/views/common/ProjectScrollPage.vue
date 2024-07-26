<template>
    <scroll-page :loading="loading" :offset="offset" :no-data="noData" v-on:load="load">
      <project-item v-for="p in projects" :key="p.id" v-bind="p"></project-item>
    </scroll-page>
  </template>
  
  <script>
    import ProjectItem from '@/components/project/ProjectItem'
    import ScrollPage from '@/components/scrollpage'
    import {getProjects} from '@/api/project'
  
    export default {
      name: "ProjectScrollPage",
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
      watch: {//检测下列数据是否变化
        'query': {
          handler() {
            this.noData = false
            this.projects = []
            this.innerPage.pageNumber = 1
            this.getProjects()
          },
          deep: true
        },
        'page': {
          handler() {
            this.noData = false
            this.projects = []
            this.innerPage = this.page
            this.getProjects()
          },
          deep: true
        }
      },
      created() {
        this.getProjects()
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
          projects: []
        }
      },
      methods: {
        load() {
          this.getProjects()
        },
        getProjects() {
          let that = this
          that.loading = true
  
          getProjects(that.query, that.innerPage).then(data => {
  
            let newProjects = data.data
            if (newProjects && newProjects.length > 0) {
              that.innerPage.pageNumber += 1
              that.projects = that.projects.concat(newProjects)
            } else {
              that.noData = true
            }
  
          }).catch(error => {
            if (error !== 'error') {
              that.$message({type: 'error', message: '任务加载失败!', showClose: true})
            }
          }).finally(() => {
            that.loading = false
          })
  
        }
      },
      components: {
        'project-item': ProjectItem,
        'scroll-page': ScrollPage
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
  