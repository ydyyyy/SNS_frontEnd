<template>
  <el-card class="me-area" :body-style="{ padding: '16px' }">
    <div class="me-article-header">
      <a @click="view(id)" class="me-article-title">{{ title }}</a>
      <el-button v-if="weight > 0" class="me-article-icon" type="text"
        >置顶</el-button
      >
      <span class="me-pull-right me-article-count">
        <i class="me-icon-comment"></i>&nbsp;{{ commentCounts }}
      </span>
      <span class="me-pull-right me-article-count">
        <i class="el-icon-view"></i>&nbsp;{{ viewCounts }}
      </span>
    </div>

    <div class="me-artile-description">
      {{ summary }}
      <el-tag v-for="t in tags" :key="t.tagname" size="mini" type="success">{{
        t.tagname
      }}</el-tag>
    </div>
    <div class="me-article-footer">
      <span class="me-article-author">
        <i class="me-icon-author"></i>&nbsp;{{ author.nickname }}
      </span>
      <span class="me-article-kk" @click="handleClick">
        <i class="el-icon-star-off"></i>&nbsp;请他内推
      </span>

      <span class="me-pull-right me-article-count">
        <i class="el-icon-time"></i>&nbsp;{{ createDate | format }}
      </span>
      <!-- 弹窗 -->
      <!-- 弹窗 -->
      <el-dialog :visible.sync="dialogVisible"  width="500px">
        <div class="dialog-content">
          <p class="highlight">请 TA 内推</p>
          <p>发送简历至邮箱：{{ author.email }}</p>
          <p>邮件主题：姓名+毕业院校+手机号码</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import { formatTime } from "../../utils/time";

export default {
  name: "RecommendItem",
  props: {
    id: Number,
    weight: Number,
    title: String,
    commentCounts: Number,
    viewCounts: Number,
    summary: String,
    author: Object,
    tags: Array,
    createDate: String,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    view(id) {
      this.$router.push({ path: `/recommend/view/${id}` });
    },
    handleClick() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    console.log(this.author, "authorqqqqqq");
  },
};
</script>

<style scoped>
.me-article-header {
  /*padding: 10px 18px;*/
  padding-bottom: 10px;
}

.me-article-title {
  font-weight: 600;
}

.me-article-icon {
  padding: 3px 8px;
}

.me-article-count {
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

.me-article-author {
  color: #a6a6a6;
  padding-right: 18px;
  font-size: 13px;
}

.el-tag {
  margin-left: 6px;
}
.me-article-kk {
  font-size: 15px;
  color: #27c074;
  cursor: pointer;
  transition: color 0.3s, font-size 0.3s;
}

.me-article-kk:hover {
  font-size: 16px;
}
.dialog-content {
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
}

.highlight {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.dialog-footer {
  text-align: right;
}
</style>
