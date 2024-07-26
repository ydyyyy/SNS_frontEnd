<template>
    <el-card :body-style="{ padding: '8px 18px' }">
      <div slot="header" class="me-category-header">
        <span>{{cardHeader}}</span>
      </div>
  
      <ul class="me-category-list">
        <li v-for="p in projects" @click="view(p.id)" :style="itemStyle" :key="p.id" class="me-category-item"><a>{{p.title}}</a>
        </li>
      </ul>
    </el-card>
  
  </template>
  
  <script>
  //修改为正确数据格式
    export default {
      name: 'CardProject',
      props: {
        cardHeader: {
          type: String,
          required: true
        },
        projects: {
          type: Array,
          required: true
        },
        itemStyle: Object
      },
      data() {
        return {}
      },
      methods: {
        view(id) {
          this.$router.push({path: `/project/view/${id}`})
        }
      }
    }
  </script>
  
  <style scoped>
    .me-category-header {
      font-weight: 600;
    }
  
    .me-category-list {
      list-style-type: none;
    }
  
    .me-category-item {
      padding: 4px;
      font-size: 14px;
      color: #5FB878;
    }
  
    .me-category-item a:hover {
      text-decoration: underline;
    }
  </style>
  