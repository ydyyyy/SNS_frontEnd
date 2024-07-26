<template>
    <el-card class="me-area" :body-style="{ padding: '16px' }">
      <div class="me-project-header">
  
        <a @click="view(id)" class="me-project-title">{{title}}</a>
        <el-button v-if="weight > 0" class="me-project-icon" type="text">置顶</el-button>
        <span class="me-pull-right me-project-count">
              <i class="me-icon-comment"></i>&nbsp;{{commentCounts}}
          </span>
        <span class="me-pull-right me-project-count">
              <i class="el-icon-view"></i>&nbsp;{{viewCounts}}
          </span>
      </div>
  
      <div class="me-artile-description">
        {{summary}}
      </div>
      <div class="me-project-footer">
            <span class="me-project-author">
              <i class="me-icon-author"></i>&nbsp;{{author.nickname}}
          </span>
  
        <el-tag v-for="t in tags" :key="t.tagname" size="mini" type="success">{{t.tagname}}</el-tag>
  
        <span class="me-pull-right me-project-count">
              <i class="el-icon-time"></i>&nbsp;{{createDate | format}}
          </span>
  
      </div>
    </el-card>
  </template>
  
  <script>
    import { formatTime } from "../../utils/time";
    //修改为正确数据格式
    export default {
      name: 'ProjectItem',
      props: {
        id: Number,
        weight: Number,
        title: String,
        commentCounts: Number,
        viewCounts: Number,
        summary: String,
        author: Object,
        tags: Array,
        createDate: String
      },
      data() {
        return {}
      },
      methods: {
        view(id) {
          this.$router.push({path: `/blog/view/${id}`})//换为正确数据
        }
      }
    }
  </script>
  
  <style scoped>
  
    .me-project-header {
      /*padding: 10px 18px;*/
      padding-bottom: 10px;
    }
  
    .me-project-title {
      font-weight: 600;
    }
  
    .me-project-icon {
      padding: 3px 8px;
    }
  
    .me-project-count {
      color: #a6a6a6;
      padding-left: 14px;
      font-size: 13px;
    }
  
    .me-pull-right {
      float: right;
    }
  
    .me-artile-description {
      font-size: 13px;
      line-height: 24px;
      margin-bottom: 10px;
    }
  
    .me-project-author {
      color: #a6a6a6;
      padding-right: 18px;
      font-size: 13px;
    }
  
    .el-tag {
      margin-left: 6px;
    }
  
  </style>
  