<template>
  <div>
    <div class="me-view-body" v-title :data-title="title">
      <el-container class="me-view-container">
        <el-main>
          <div class="me-write-btn" style="margin-right: 10px;">
            <el-button type="success" v-if="project.uid != user.id" round @click="publishShow">申请</el-button>
          </div>

          <div class="me-view-card">
            <h1 class="me-view-title">{{ project.title }}</h1>
            <div class="me-view-author">
              <a class="">
                <img class="me-view-picture" :src="avatar"></img>
              </a>
              <div class="me-view-info">
                <span>{{ project.nickname }}</span>
                <div class="me-view-meta">
                  <span>{{ project.createDate | format }}</span>
                </div>
              </div>

              <!-- 如果是作者 -->
              <el-button v-if="project.uid == user.id" @click="editProject()" style="position: absolute;left: 60%;"
                size="mini" round icon="el-icon-edit">编辑</el-button>
            </div>

            <div>
              价格区间：<span class="priceclass">{{ project.priceLower }}元-{{ project.priceUpper }}元</span>
            </div>

            <div class="me-view-tag">
              需求详情：
              {{ project.info }}
            </div>

            <div class="me-view-tag">
              任务分类：
              <el-button size="mini" type="primary" round plain v-if="this.project.category == 1">Java</el-button>
              <el-button size="mini" type="primary" round plain v-if="this.project.category == 2">Python</el-button>
            </div>
            <div class="me-view-tag">
              截止日期：
              {{ project.deadline }}
            </div>
            <div class="me-view-tag">
              项目状态：
              <el-button size="mini" type="primary" round plain v-if="this.project.applied == 0">我的项目</el-button>
              <el-button size="mini" type="primary" round plain v-if="this.project.applied == 1">可申请</el-button>
              <el-button size="mini" type="primary" round plain v-if="this.project.applied == 2">已申请</el-button>
              <el-button size="mini" type="primary" round plain v-if="this.project.applied == 3">申请成功</el-button>
              <el-button size="mini" type="primary" round plain v-if="this.project.applied == 4">已申请，申请失败</el-button>
              <el-button size="mini" type="primary" round plain v-if="this.project.applied == -1">项目过期</el-button>
            </div>

            <!-- 如果是作者显示申请者名单 -->
            <div v-if="project.uid === user.id && project.receiver == -1">
              <h2>申请者名单</h2>
              <ul>
                <li v-for="applicant in project.applications" :key="applicant.id">
                  <div>用户名：{{ applicant.nickname }}</div>
                  <div>预估价格: {{ applicant.bid }}</div>
                  <div>邮箱: {{ applicant.email }}</div>
                  <div>个人简历: {{ applicant.resume }}</div>
                  <el-button type="primary" @click="setRecipient(applicant.id)">设为接收人</el-button>
                </li>
              </ul>
            </div>
            <div v-if="project.uid === user.id && project.receiver != -1">
              <h2>接收人</h2>
              <li v-for="applicant in project.applications" :key="applicant.id">
                <div v-if="applicant.uid === project.receiver">
                  <div>用户名：{{ applicant.nickname }}</div>
                  <div>预估价格: {{ applicant.bid }}</div>
                  <div>邮箱: {{ applicant.email }}</div>
                  <div>个人简历: {{ applicant.resume }}</div>
                </div>
              </li>
            </div>
            <!-- 点击申请后 -->
            <el-dialog title="申请详情" :visible.sync="publishVisible" :close-on-click-modal="false"
              custom-class="me-dialog">
              <el-form ref="form" :model="applicantForm" label-width="120px">
                <!-- 预估价格 -->
                <el-form-item label="预估价格">
                  <el-input-number v-model="applicantForm.esprice" :min="0"></el-input-number>
                </el-form-item>

                <el-form-item label="预估时间">
                  <el-date-picker v-model="applicantForm.preComDate" type="date" placeholder="选择日期"
                    value-format="yyyy-MM-dd" style="width: 100%;">
                  </el-date-picker>
                </el-form-item>

                <el-form-item label="个人简历">
                  <el-input type="textarea" v-model="applicantForm.resume" :rows="6">
                  </el-input>
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
import { getUserInfo } from '@/api/login'
import default_avatar from '@/assets/img/default_avatar.png'
import { getProjectById, postapply, postprojectchoose } from '../../api/project';

export default {
  name: 'ProjectView',
  created() {
    this.getProject();
    this.getUser();
    this.printid();
    this.publishVisible = false;

  },
  watch: {
    '$route': 'getProject'
  },
  data() {
    return {
      project: {
        pid: '',
        uid: '',
        title: '',
        info: '',
        nickname: '',
        category: '',
        priceLower: '',
        priceUpper: '',
        applications: [],
        applied: '', //状态
        receiver: '', //接收人
        avatar: '',
        deadline: '',
      },
      user: {
        id: '',
        account: '',
        nickname: '',
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
      let avatar = this.project.avatar

      if (avatar.length > 0) {
        return avatar
      }
      return default_avatar
    },
    title() {
      return `${this.project.title} - 项目 - SNS 社交网络平台系统`;
    }
  },
  methods: {
    editProject() {
      this.$router.push({ path: `/project/create/${this.project.pid}` });
      // this.$router.push({ path: `/project/create` });
    },
    publishShow() {
      this.publishVisible = true;
    },
    getProject() {
      let that = this;
      getProjectById(that.$route.params.id).then(data => {
        console.log("project:", data.data); // 添加调试信息
        Object.assign(that.project, data.data.data);
      }).catch(error => {
        if (error !== 'error') {
          that.$message({ type: 'error', message: '项目加载失败', showClose: true });
        }
      });
    },
    getUser() {
      let that = this;
      getUserInfo(that.project.pid).then(data => {
        Object.assign(that.user, data.data);
        console.log("author:", this.user); // 添加调试信息
      }).catch(error => {
        if (error !== 'error') {
          that.$message({ type: 'error', message: '作者加载失败', showClose: true });
        }
      });
      checkIfAuthor()
    },
    setRecipient(applicantId) {
      let that = this;

      postprojectchoose(that.project.pid, applicantId)
        .then(data => {
          that.$message({ type: 'success', message: '接收人设置成功', showClose: true });
        })
        .catch(error => {
          if (error !== 'error') {
            that.$message({ type: 'error', message: '接收人设置失败', showClose: true });
          }
        });
    },
    publish() {
      if (this.project.applied == 2 || this.project.applied == 3 || this.project.applied == 4 || this.project.applied == -1) {
        this.$message({
          type: 'warning',
          message: '您已申请过该项目',
          showClose: true,
        });
        return; // 跳出方法
      }

      this.$refs.form.validate((valid) => {
        if (valid) {
          let that = this;
          let newapplicant = {
            bid: this.applicantForm.esprice,
            resume: this.applicantForm.resume,
            time: this.applicantForm.preComDate
          };
          console.log("newapplicant:", newapplicant); // 添加调试信息
          this.publishVisible = false;

          let loading = this.$loading({
            lock: true,
            text: "提交申请中，请稍后...",
          });

          postapply(this.project.pid, newapplicant)
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
    printid() {
      console.log("myid" + this.$store.state.id);
      console.log("author:", this.user.id, this.user.nickname); // 添加调试信息
      console.log("project:", this.project.pid, this.project.title); // 添加调试信息
    },
    check() {
      if (this.project.uid === this.user.id) {
        this.project.applied = 0
      }
      else {
        const isUserInApplications = this.project.applications.some(application => application.id === this.user.id);
        const currentDate = new Date().getTime();
        const deadlineDate = new Date(this.project.deadline).getTime();

        if (isUserInApplications) {
          this.project.applied = 1;
        }
        else if (currentDate > deadlineDate) {
          this.project.applied = -1;
        }
        else {
          if (this.project.receiver >= 0) {
            if (this.project.receiver == this.user.id) {
              this.project.applied = 3;
            }
            else {
              this.project.applied = 4;
            }
          }
          else {
            this.project.applied = 2;
          }
        }
      }
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
