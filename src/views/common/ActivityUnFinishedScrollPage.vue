
<template>
    <scroll-page :loading="loading" :offset="offset" :no-data="noData" v-on:load="load">
        <activity-item v-for="activity in activities" :key="activity.id" v-bind="activity"></activity-item>
    </scroll-page>
</template>

<script>
import ActivityItem from '@/components/activity/ActivityItem'
import ScrollPage from '@/components/scrollpage'
import { getActivitiesUnFinished } from '@/api/activity'

export default {
    name: "ActivityUnFinishedScrollPage",
    props: {
        offset: {
            type: Number,
            default: 100
        },
        page: {
            type: Object,
            default() {
                return {}
            }
        },
        query: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    watch: {
        'query': {
            handler() {
                this.noData = false
                this.activities = []
                this.innerPage.pageNumber = 1
                this.getActivitiesUnFinished()
            },
            deep: true
        },
        'page': {
            handler() {
                this.noData = false
                this.activities = []
                this.innerPage = this.page
                this.getActivitiesUnFinished()
            },
            deep: true
        }
    },
    created() {
        this.getActivitiesUnFinished()
    },
    data() {
        return {
            loading: false,
            noData: false,
            innerPage: {
                pageSize: 5,
                pageNumber: 1,
                name: 'a.createDate',
                sort: 'desc'
            },
            activities: []
        }
    },
    methods: {
        load() {
            this.getActivitiesUnFinished()
        },
        getActivitiesUnFinished() {
            let that = this
            that.loading = true

            getActivitiesUnFinished(that.query, that.innerPage).then(data => {

                let newActivities = data.data
                if (newActivities && newActivities.length > 0) {
                    that.innerPage.pageNumber += 1
                    that.activities = that.activities.concat(newActivities)
                } else {
                    that.noData = true
                }

            }).catch(error => {
                if (error !== 'error') {
                    that.$message({ type: 'error', message: '活动加载失败!', showClose: true })
                }
            }).finally(() => {
                that.loading = false
            })

        }
    },
    components: {
        'activity-item': ActivityItem,
        'scroll-page': ScrollPage
    }
}
</script>

<style scoped>
    .el-card {
        border-radius: 0;
    }

    .el-card:not(:first-child) {
        margin-top: 10px;
    }
</style>