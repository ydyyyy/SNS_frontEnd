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

      <el-tag size="mini" type="success" v-if="category == 1">Java</el-tag>
      <el-tag size="mini" type="success" v-if="category == 2">Python</el-tag>
      
      <el-tag size="mini" type="success" v-if="applied == 0">我的项目</el-tag>
      <el-tag size="mini" type="success" v-if="applied == 1">可申请</el-tag>
      <el-tag size="mini" type="success" v-if="applied == 2">已申请</el-tag>
      <el-tag size="mini" type="success" v-if="applied == 3">申请成功</el-tag>
      <el-tag size="mini" type="success" v-if="applied == 4">已申请，申请失败</el-tag>
      <el-tag size="mini" type="success" v-if="applied == -1">项目过期</el-tag>
      <span class="me-pull-right me-project-count">
        <i class="el-icon-time"></i>&nbsp;{{ deadline | format }}
      </span>

      <div class="me-view-tag"></div>
    </div>
  </el-card>
</template>

<script>
import { getUserInfo } from '@/api/login';

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
    nickname: String,
    tel: String,
    deadline: String,
    applied: Number,
    receiver: Number,
    applications: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      user: {
        id: '',
        account: '',
        nickname: '',
      },
    }
  },
  methods: {
    view(id) {
      this.$router.push({ path: `/project/view/${id}` });
    },
    getUser() {
      let that = this;
      getUserInfo(that.pid).then(data => {
        Object.assign(that.user, data.data);
        console.log("author:", this.user); // 添加调试信息
        that.checkIfAuthor();
      }).catch(error => {
        if (error !== 'error') {
          that.$message({ type: 'error', message: '作者加载失败', showClose: true });
        }
      });
    },
    checkIfAuthor() {
      if (this.uid === this.user.id) {
        this.applied = 0;
      } else {
        const isUserInApplications = this.applications && this.applications.some(application => application.id === this.user.id);
        const currentDate = new Date().getTime();
        const deadlineDate = new Date(this.deadline).getTime();

        if (isUserInApplications) {
          this.applied = 1;
        } else if (currentDate > deadlineDate) {
          this.applied = -1;
        } else {
          if (this.receiver >= 0) {
            if (this.receiver == this.user.id) {
              this.applied = 3;
            } else {
              this.applied = 4;
            }
          } else {
            this.applied = 2;
          }
        }
      }
    },
  },
  mounted() {
    this.getUser();
  },
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
