<template>
    <el-card :body-style="{ padding: '8px 18px' }">
      <div slot="header" class="me-activityTags-header">
        <span>最热活动标签</span>
        <a @click="moreActivityTags" class="me-pull-right me-activityTags-more">查看全部</a>
      </div>
  
      <ul class="me-activityTags-list">
        <li class="me-activityTags-item" v-for="t in activityTags" :key="t.id">
          <!--type="primary"-->
          <el-button @click="activityTag(t.id)" size="mini" type="primary" round plain>{{t.tagname}}</el-button>
        </li>
      </ul>
    </el-card>
  
  </template>
  
  <script>
    export default {
      name: 'CardActivityTag',
      props: {
        activityTags: Array
      },
      data() {
        return {}
      },
      methods: {
        moreActivityTags() {
          this.$router.push('/activity/tag/all')
        },
        activityTag(id) {
          this.$router.push({path: `/activity/tag/${id}`})
        }
      }
    }
  </script>
  
  <style scoped>
  
    .me-activityTags-header {
      font-weight: 600;
    }
  
    .me-activityTags-more {
      font-size: 14px;
      color: #78b6f7;
    }
  
    .me-activityTags-list {
      list-style-type: none;
    }
  
    .me-activityTags-item {
      display: inline-block;
      padding: 4px;
      font-size: 14px;
      color: #5FB878;
    }
  
    .me-activityTags-item a:hover {
      text-decoration: underline;
    }
  </style>
  