<template>
    <div class="me-ct-body" v-title :data-title="title">
        <el-container class="me-ct-container">
            <el-main>
                <div class="me-ct-title me-area">
                    <template v-if="this.$route.params.type === 'tag'">
                        <img class="me-ct-picture" :src="ct.avatar ? ct.avatar : defaultAvatar" />
                        <h3 class="me-ct-name">{{ ct.tagname }}</h3>
                    </template>

                    <template v-else>
                        <img class="me-ct-picture" :src="ct.avatar ? ct.avatar : defaultAvatar" />
                        <h3 class="me-ct-name">{{ ct.categoryname }}</h3>
                        <p>{{ ct.description }}</p>
                    </template>

                    <span class="me-ct-meta">{{ ct.activities }} 活动</span>
                </div>

                <div class="me-ct-activities">
                    <activity-un-finished-scroll-page v-bind="activity"></activity-un-finished-scroll-page>
                </div>
                <div class="me-ct-activities">
                    <activity-finished-scroll-page v-bind="activity"></activity-finished-scroll-page>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import ActivityFinishedScrollPage from '@/views/common/ActivityFinishedScrollPage'
import ActivityUnFinishedScrollPage from '@/views/common/ActivityUnFinishedScrollPage'
import { getActivitiesByCategory, getActivitiesByTag } from '@/api/activity'
import { getTagDetail } from '@/api/activityTag'
import { getCategoryDetail } from '@/api/activityCategory'
import defaultAvatar from '@/assets/img/logo.png'


export default {
    name: 'ActivityCategoryTag',
    created() {
        this.getCategoryOrTagAndActivities()
    },
    watch: {
        '$route': 'getCategoryOrTagAndActivities'
    },
    data() {
        return {
            defaultAvatar: defaultAvatar,
            ct: {},
            activity: {
                query: {
                    tagId: '',
                    categoryId: ''
                }
            },
        }
    },
    computed: {
        title() {
            if (this.$route.params.type === 'tag') {
                return `${this.ct.tagname} - 标签 - For Fun`
            }
            return `${this.ct.categoryname} - 文章分类 - For Fun`
        }
    },
    methods: {
        getCategoryOrTagAndActivities() {
            let id = this.$route.params.id
            let type = this.$route.params.type
            if ('tag' === type) {
                this.getTagDetail(id)
                this.activity.query.tagId = id
            } else {
                this.getCategoryDetail(id)
                this.activity.query.categoryId = id
            }

        },
        getCategoryDetail(id) {
            let that = this
            getCategoryDetail(id).then(data => {
                that.ct = data.data
            }).catch(error => {
                if (error !== 'error') {
                    that.$message({ type: 'error', message: '活动分类加载失败', showClose: true })
                }
            })
        },
        getTagDetail(id) {
            let that = this
            getTagDetail(id).then(data => {
                that.ct = data.data
            }).catch(error => {
                if (error !== 'error') {
                    that.$message({ type: 'error', message: '标签加载失败', showClose: true })
                }
            })
        },
        getActivitiesByCategory(id) {
            let that = this
            getActivitiesByCategory(id).then(data => {
                that.activities = data.data
            }).catch(error => {
                if (error !== 'error') {
                    that.$message({ type: 'error', message: '活动加载失败', showClose: true })
                }
            })
        },
        getActivitiesByTag(id) {
            let that = this
            getActivitiesByTag(id).then(data => {
                that.activities = data.data
            }).catch(error => {
                if (error !== 'error') {
                    that.$message({ type: 'error', message: '活动加载失败', showClose: true })
                }
            })
        }
    },
    components: {
        ActivityFinishedScrollPage,
        ActivityUnFinishedScrollPage
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