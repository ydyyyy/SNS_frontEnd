<template>
    <div class="me-ct-body" v-title :data-title="title">
      <el-container class="me-ct-container">
        <el-main>
          <div class="me-ct-title me-area">
            <img class="me-ct-picture" :src="user.avatar ? user.avatar : defaultAvatar" />
            <h3 class="me-ct-name">{{ user.username }}</h3>
            <span class="me-ct-meta">{{ user.activities.length }} 活动</span>
          </div>
  
          <div class="me-ct-activities">
            <ScrollPage :loading="loading" :noData="noData" :offset="10" @load="loadMoreActivities">
              <activity-item v-for="activity in user.activities" :key="activity.id" :activity="activity"></activity-item>
            </ScrollPage>
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
      user: {
        username: '',
        avatar: '',
        activities: []
      },
      loading: false,
      noData: false,
      page: 1,
      pageSize: 10
    }
  },
  computed: {
    title() {
      return `${this.user.username} - 参加过的活动 - For Fun`
    }
  },
  methods: {
    getUserActivities() {
      this.loading = true
      let userId = this.$store.state.user.id // Assuming user ID is stored in Vuex
      getUserActivities(userId, this.page, this.pageSize).then(data => {
        this.user = { ...this.$store.state.user, activities: data.data }
        if (data.data.length < this.pageSize) {
          this.noData = true
        }
        this.loading = false
      }).catch(error => {
        if (error !== 'error') {
          this.$message({ type: 'error', message: '活动加载失败', showClose: true })
        }
        this.loading = false
      })
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
