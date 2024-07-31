<template>
    <el-card :body-style="{ padding: '8px 18px' }">
        <div slot="header" class="me-activityCategory-header">
            <span>{{ cardHeader }}</span>
        </div>

        <ul class="me-activityCategory-list">
            <li v-for="a in activities" @click="view(a.id)" :style="itemStyle" :key="a.id" class="me-activityCategory-item">
                <a>{{ a.title }}</a>
            </li>
        </ul>
    </el-card>

</template>

<script>
export default {
    name: 'CardActivity',
    props: {
        cardHeader: {
            type: String,
            required: true
        },
        activities: {
            type: Array,
            required: true
        },
        itemStyle: Object
    },
    data() {
        return {}
    },
    methods: {
        view(id) {
            this.$router.push({ path: `/activity/view/${id}` })
        }
    }
}
</script>

<style scoped>
.me-activityCategory-header {
    font-weight: 600;
}

.me-activityCategory-list {
    list-style-type: none;
}

.me-activityCategory-item {
    padding: 4px;
    font-size: 14px;
    color: #5FB878;
}

.me-activityCategory-item a:hover {
    text-decoration: underline;
}
</style>