<template>
  <el-card class="me-area" :body-style="{ padding: '16px' }">
    <div class="me-project-header">

      <a @click="view(pid)" class="me-project-title">{{ title }}</a>
      <el-button class="me-project-icon" type="text">置顶</el-button>
      <span class="me-pull-right me-project-count">
        价格区间：{{ priceLower }}-{{ priceUpper }}
      </span>
    </div>

    <div class="me-artile-description">
      {{ info }}
    </div>
    <div class="me-project-footer">
      <span class="me-project-author">
        <i class="me-icon-author"></i>&nbsp;{{ nickname }}
      </span>

      <el-tag  size="mini" type="success" v-if="this.category == 1">Java</el-tag>
      <el-tag  size="mini" type="success" v-if="this.category == 2">Python</el-tag>

      <span class="me-pull-right me-project-count">
        <i class="el-icon-time"></i>&nbsp;{{ deadline | format }}
      </span>

    </div>
  </el-card>
</template>

<script>
//修改为正确数据格式
export default {
  name: 'ProjectItem',
  props: {
    pid: Number,
    title: String,
    info: String,
    uid: Number,
    category: Number,
    priceLower: Number,
    priceUpper: Number,
    createDate: String,
    nickname:String,
    tel:String,
    deadline:String
  },
  data() {
    return {}
  },
  methods: {
    view(id) {
      this.$router.push({ path: `/project/view/${id}` })
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