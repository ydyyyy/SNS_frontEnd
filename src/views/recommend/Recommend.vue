<template>
    <div v-title data-title="ForFun Find Yourself">
      <el-container>
  
        <el-main class="me-articles">
  
          <recommend-scroll-page></recommend-scroll-page>
  
        </el-main>
  
        <el-aside>
  
          <card-company :tags="hotTags"></card-company>
  
          <card-recommend cardHeader="最热内推" :articles="hotArticles"></card-recommend>
  
          <card-rec-archive cardHeader="内推归档" :archives="archives"></card-rec-archive>
  
          <card-recommend cardHeader="最新内推" :articles="newArticles"></card-recommend>
  
        </el-aside>
  
      </el-container>
    </div>
  </template>
  
  <script>
    import CardRecommend from '@/components/card/cardRecommend/CardRecommend'
    import CardRecArchive from '@/components/card/cardRecommend/CardRecArchive'
    import CardCompany from '@/components/card/cardRecommend/CardCompany'
    import RecommendScrollPage from '@/views/common/RecommendScrollPage'
  
    import {getRecommend, getHotRecommend, getNewRecommend} from '@/api/recommendApi/recommend'
    import {getHotCompany} from '@/api/recommendApi/company'
    import {listRecommendArchives} from '@/api/recommendApi/recommend'
  
    export default {
      name: 'Blog',
      created() {
        this.getHotRecommend()
        this.getNewRecommend()
        this.getHotCompany()
        this.listRecommendArchives()
      },
      data() {
        return {
          hotTags: [],
          hotArticles: [],
          newArticles: [],
          archives: []
        }
      },
      methods: {
        getHotRecommend() {
          let that = this
          getHotRecommend().then(data => {
            that.hotArticles = data.data
          }).catch(error => {
            if (error !== 'error') {
              that.$message({type: 'error', message: '最热文章加载失败!', showClose: true})
            }
  
          })
  
        },
        getNewRecommend() {
          let that = this
          getNewRecommend().then(data => {
            console.log(data, '我是getNewRecommend获取到的数据')
            that.newArticles = data.data
          }).catch(error => {
            if (error !== 'error') {
              that.$message({type: 'error', message: '最新文章加载失败!', showClose: true})
            }
  
          })
  
        },
        getHotCompany() {
          let that = this
          getHotCompany().then(data => {
            console.log(data, '我是getHotCompany获取到的数据')
            that.hotTags = data.data
          }).catch(error => {
            if (error !== 'error') {
              that.$message({type: 'error', message: '最热标签加载失败!', showClose: true})
            }
  
          })
        },
        listRecommendArchives() {
          listRecommendArchives().then((data => {
            console.log(data, '我是listRecommendArchives获取到的文章归档数据')
            this.archives = data.data
          })).catch(error => {
            if (error !== 'error') {
              that.$message({type: 'error', message: '文章归档加载失败!', showClose: true})
            }
          })
        }
  
      },
      components: {
        'card-recommend': CardRecommend,
        'card-company': CardCompany,
        RecommendScrollPage,
        CardRecArchive
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
  