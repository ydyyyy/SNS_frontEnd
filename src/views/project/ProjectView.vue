<template>
  <div>
    <div class="me-view-body" v-title :data-title="title">
      <el-container class="me-view-container">
        <el-main>
          <div class="me-write-btn" style="margin-right: 10px;">
            <el-button type="success" round @click="publishShow">申请</el-button>
          </div>

          <div class="me-view-card">
            <h1 class="me-view-title">{{ project.title }}</h1>
            <div class="me-view-author">
              <a class="">
                <img class="me-view-picture" :src="project.author.avatar"></img>
              </a>
              <div class="me-view-info">
                <span>{{ project.nickname }}</span>
                <div class="me-view-meta">
                  <span>{{ project.createDate | format }}</span>
                </div>
              </div>
              <!-- 如果是作者 -->
              <el-button v-if="this.project.author.id == this.$store.state.id" @click="editProject()"
                style="position: absolute;left: 60%;" size="mini" round icon="el-icon-edit">编辑</el-button>
            </div>

            <div>
              价格区间：<span class="priceclass">{{ project.priceLower }}元-{{ project.priceUpper }}元</span>
            </div>

            <div class="me-view-tag">
              任务分类：
              <el-button @click="Category(project.category)" size="mini" type="primary" round plain>{{
                project.category }}</el-button>
            </div>
            <!-- 点击申请后 -->
            <el-dialog title="申请详情" :visible.sync="publishVisible" :close-on-click-modal="false" custom-class="me-dialog">
              <el-form ref="form" :model="applicantForm" label-width="120px">
                <!-- 预估价格 -->
                <el-form-item label="预估价格">
                  <el-input-number v-model="applicantForm.esprice" :min="0"></el-input-number>
                </el-form-item>

                <el-form-item label="个人简历">
                  <el-input type="textarea" v-model="applicantForm.resume" :rows="6">
                  </el-input>
                </el-form-item>

                <!-- 联系方式 -->
                <el-form-item label="联系方式">
                  <el-input type="textarea" v-model="applicantForm.contactInfo" placeholder="请输入联系方式"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="publishVisible = false">取 消</el-button>
                <el-button type="primary" @click="publish()">申请</el-button>
              </div>
            </el-dialog>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import CommmentItem from '@/components/comment/CommentItem'
import { viewProject } from '@/api/project'
import { getCommentsByArticle, publishComment } from '@/api/comment'
import { getUserInfo } from '@/api/login'
import default_avatar from '@/assets/img/default_avatar.png'
import { getProjectById } from '../../api/project';

export default {
  name: 'ProjectView',
  created() {
    this.getProject()
    this.publishVisible = false
  },
  watch: {
    '$route': 'getProject'
  },
  data() {
    return {
      project: {
        id: '',
        title: '',
        info: '',
        author: {},
        category: '',
        createDate: '',
        priceLower: '',
        priceUpper: '',
        applicant: [],
      },
      applicantForm: {
        esprice: '',
        preComDate: '',
        resume: '',
        contactInfo: '',
      },
      publishVisible: false,
    }
  },
  computed: {
    avatar() {
      let avatar = this.$store.state.avatar

      if (avatar.length > 0) {
        return avatar
      }
      return default_avatar
    },
    title() {
      return `${this.project.title} - 项目 - SNS 社交网络平台系统`
    }
  },
  methods: {
    Category(id) {
      this.$router.push({ path: `/category/${id}` })
    },
    editProject() {
      this.$router.push({ path: `/create/${this.project.id}` })
    },

    publishShow() {
      this.publishVisible = true;
    },

    getProject() {
      let that = this
      getProjectById(that.$route.params.id).then(data => {
        Object.assign(that.project, data.data)
      }).catch(error => {
        if (error !== 'error') {
          that.$message({ type: 'error', message: '文章加载失败', showClose: true })
        }
      })
    },
    getAuthor() {
      let that = this
      getUserInfo(that.project.id).then(data => {
        Object.assign(that.project.author, data.data)
      }).catch(error => {
        if (error !== 'error') {
          that.$message({ type: 'error', message: '作者加载失败', showClose: true })
        }
      })
    },
    // 发布评论打算修改为申请项目
    publishComment() {
      let that = this
      if (!that.comment.content) {
        return;
      }
      that.comment.article.id = that.article.id

      publishComment(that.comment).then(data => {
        that.$message({ type: 'success', message: '评论成功', showClose: true })
        that.comments.unshift(data.data)
        that.commentCountsIncrement()
        that.comment.content = ''
      }).catch(error => {
        if (error !== 'error') {
          that.$message({ type: 'error', message: '评论失败', showClose: true })
        }
      })
    },
    //打算改为通过作者获得申请人
    getCommentsByArticle() {
      let that = this
      getCommentsByArticle(that.article.id).then(data => {
        that.comments = data.data
      }).catch(error => {
        if (error !== 'error') {
          that.$message({ type: 'error', message: '评论加载失败', showClose: true })
        }
      })
    },
    commentCountsIncrement() {
      this.article.commentCounts += 1
    },
    publish() {
      let that = this;

      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          let project = {
            applicant: this.project.applicant,
            
          };

          this.publishVisible = false;

          let loading = this.$loading({
            lock: true,
            text: "提交申请中，请稍后...",
          });

          publishProject(project)
            .then(() => {
              loading.close();
              that.$message({
                message: "提交申请成功",
                type: "success",
                showClose: true,
              });
            })
            .catch((error) => {
              loading.close();
              that.$message({
                type: "error",
                message: error || "发布失败啦",
                showClose: true,
              });
            });
        } else {
          return false;
        }
      });
    },
  },
  components: {
    CommmentItem
  },
  //组件内的守卫 调整body的背景色
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundColor = '#fff';
    next();
  },
  beforeRouteLeave(to, from, next) {
    window.document.body.style.backgroundColor = '#f5f5f5';
    next();
  }
}
</script>

<style>
.me-view-body {
  margin: 100px auto 140px;
}

.me-view-container {
  width: 700px;
}

.el-main {
  overflow: hidden;
}

.me-view-title {
  font-size: 34px;
  font-weight: 700;
  line-height: 1.3;
}

.me-view-author {
  /*margin: 30px 0;*/
  margin-top: 30px;
  vertical-align: middle;
}

.me-view-picture {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #5fb878;
}

.me-view-info {
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;
}

.me-view-meta {
  font-size: 12px;
  color: #969696;
}

.me-view-end {
  margin-top: 20px;
}

.me-view-tag {
  margin-top: 20px;
  padding-left: 6px;
  border-left: 4px solid #c5cac3;
}

.me-view-tag-item {
  margin: 0 4px;
}

.me-view-comment {
  margin-top: 60px;
}

.me-view-comment-title {
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;
}

.me-view-comment-write {
  margin-top: 20px;
}

.me-view-comment-text {
  font-size: 16px;
}

.v-show-content {
  padding: 8px 25px 15px 0px !important;
}

.me-write-btn {
  position: absolute;
  right: 70px;
  top: 70px;
  z-index: 10;
}

.me-view-card {
  padding: 35px;
  padding-bottom: 20px;
  border-radius: 5px;
  margin-top: 30px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12), 0 2px 1px -1px rgba(0, 0, 0, 0.07), 0 1px 3px 0 rgba(0, 0, 0, 0.07);
}

.priceclass {
  color: red;
}

.me-dialog .el-dialog__header {
  color: #000;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.me-dialog .el-form-item__label {
  font-size: 14px;
  color: #000;
}

.me-dialog .el-input__inner {
  background: #f5f5f5;
}

</style>
