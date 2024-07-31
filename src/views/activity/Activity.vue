<template>
  <div v-title data-title="ForFun Find Yourself">
    <el-container>
      <span>正在进行的活动：</span>
      <el-main class="me-activities">
        <activity-un-finished-scroll-page></activity-un-finished-scroll-page>
      </el-main>
      <el-aside>
        <card-activity-tag :activityTags="hotTags"></card-activity-tag>
        <card-activity cardHeader="最热活动" :activities="hotActivities"></card-activity>
        <card-activity cardHeader="最新活动" :activities="newActivities"></card-activity>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import CardActivityMe from '@/components/card/CardActivityMe'
import CardActivity from '@/components/card/CardActivity'
import CardArchive from '@/components/card/CardArchive'
import CardActivityTag from '@/components/card/CardActivityTag'
import ActivityUnFinishedScrollPage from '@/views/common/ActivityUnFinishedScrollPage'
import { getActivities, getHotActivities, getNewActivities } from '@/api/activity'
import { getHotTags } from '@/api/activityTag'
import { listArchives } from '@/api/activity'

export default {
  name: 'Activity',
  created() {
    this.fetchData()
  },
  data() {
    return {
      hotTags: [],
      hotActivities: [],
      newActivities: [],
      archives: []
    }
  },
  methods: {
    fetchData() {
      Promise.all([
        this.getHotActivities(),
        this.getNewActivities(),
        this.getHotTags(),
        this.listArchives()
      ]).catch(error => {
        this.$message({ type: 'error', message: '数据加载失败!', showClose: true })
      })
    },
    getHotActivities() {
      return getHotActivities().then(data => {
        this.hotActivities = data.data
      })
    },
    getNewActivities() {
      return getNewActivities().then(data => {
        this.newActivities = data.data
      })
    },
    getHotTags() {
      return getHotTags().then(data => {
        this.hotTags = data.data
      })
    },
    listArchives() {
      return listArchives().then(data => {
        this.archives = data.data
      })
    }
  },
  components: {
    'card-me': CardActivityMe,
    'card-activity': CardActivity,
    'card-activity-tag': CardActivityTag,
    ActivityUnFinishedScrollPage,
    CardArchive
  }
}
</script>

<style scoped>
.el-container {
  width: 960px;
}

.el-aside {
  margin-left: 20px;
  width: 260px;
}

.el-main {
  padding: 0px;
  line-height: 16px;
}

.el-card {
  border-radius: 0;
}

.el-card:not(:first-child) {
  margin-top: 20px;
}
</style>