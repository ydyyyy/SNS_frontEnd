<template>
    <div class="me-ct-body" v-title :data-title="title">
      <el-container class="me-ct-container">
        <el-main>
          <div class="me-ct-title me-area">
            <img class="me-ct-picture" :src="author.avatar ? author.avatar : defaultAvatar" />
            <h3 class="me-ct-name">{{ this.author.nickname }}</h3>
            <span class="me-ct-meta">{{ this.activities.length }} 活动</span>
          </div>
  
          <div class="me-ct-activities">
            <scroll-page :loading="loading" :offset="offset" :no-data="noData" v-on:load="load">
              <activity-item v-for="activity in activities" :key="activity.id" v-bind="activity"></activity-item>
            </scroll-page>
          </div>
        </el-main>
      </el-container>
    </div>
  </template>

<script>
import ActivityItem from '@/components/activity/ActivityItem'
import ScrollPage from '@/components/scrollpage'
import { getUserActivities } from '@/api/activity'
import defaultAvatar from '@/assets/img/logo.png'

export default {
  name: 'UserActivities',
  created() {
    this.getUserActivities()
  },
  data() {
    return {
      defaultAvatar: defaultAvatar,
      author: {
        i: 1,
        account: "",
        password: "",
        avatar: "",
        email: "",
        phone: "",
        nickname: "",
        adminStatu: 0,
        createTime: "",
        updateTime: "",
        sex: 0,
        birth: "",
        address: "",
        position:"",
      },
      activities: [],
      loading: false,
      noData: false,
    }
  },
  computed: {
    title() {
      return `${this.author.nickname} - 参加过的活动 - For Fun`
    }
  },
  methods: {
    getUserActivities() {
      this.loading = true
      // let userId = this.$store.state.user.id // Assuming user ID is stored in Vuex
      getUserActivities().then(data => {
        if (data.data.length === 0) {
          this.$message({ type: 'warning', message: '你没组织过任何活动！', showClose: true });
          this.noData = true;
        } else {
          this.author = data.data.author;
          this.activities = data.data;
          this.author = data.data[0].author;
          console.log(data.data[0]);
          if (data.data.length < this.pageSize) {
            this.noData = true;
          }
        }
        this.loading = false;
      }).catch(error => {
        this.$message({ type: 'error', message: '活动加载失败', showClose: true });
        this.loading = false;
      });
    },
    loadMoreActivities() {
      if (this.noData) return
      this.page++
      this.getUserActivities()
    }
  },
  components: {
    'activity-item': ActivityItem,
    ScrollPage,
  }
}
</script>

<style>
.me-ct-body {
  margin: 60px auto 140px;
  min-width: 100%;
}

.el-main {
  padding: 0;
}

.me-ct-title {
  text-align: center;
  height: 150px;
  padding: 20px;
}

.me-ct-picture {
  width: 60px;
  height: 60px;
}

.me-ct-name {
  font-size: 28px;
}

.me-ct-meta {
  font-size: 12px;
  color: #969696;
}

.me-ct-activities {
  width: 640px;
  margin: 30px auto;
}
</style>
