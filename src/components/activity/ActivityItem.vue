<template>
    <el-card class="activity-area" :body-style="{ padding: '16px' }">
        <div class="activity-header">
            <a @click="viewActivity(id)" class="activity-title">{{ title }}</a>
            <el-button v-if="weight > 0" class="activity-icon" type="text">热门</el-button>
            <span class="activity-count">
                <i class="el-icon-time"></i>&nbsp;{{ createDate | format }}
            </span>
            <span class="activity-count">
                <i class="el-icon-date"></i>&nbsp;{{ startDate }} - {{ endDate }}
            </span>
        </div>

        <div class="activity-description">
            {{ summary }}
        </div>

        <div class="activity-footer">
            <span class="activity-info">
                <i class="el-icon-user"></i>&nbsp;{{ author.nickname }}
            </span>

            <el-tag v-for="tag in tags" :key="tag.tagname" size="mini" type="info">{{ tag.tagname }}</el-tag>
            <span class="activity-count">
	    	    <i class="el-icon-comment"></i>&nbsp;{{commentCounts}}
	        </span>
            <span class="activity-count">
                <i class="el-icon-view"></i>&nbsp;{{ viewCounts }}
            </span>
        </div>
    </el-card>
</template>

<script>
import { formatTime } from "../../utils/time";

export default {
    name: 'ActivityItem',
    props: {
        id: Number, //活动id
        weight: Number, //权重
        title: String,  //活动标题
        commentCounts: Number,  //评论数目
        createDate: String,   //发布日期
        summary: String,    //活动摘要
        author: Object,  //发布者
        tags: Array,    //获取标签
        viewCounts: Number, //浏览数量
        startDate: String, // 添加开始日期属性
        endDate: String    // 添加结束日期属性
    },
    data() {
        return {}
    },
    methods: {
        viewActivity(id) {
            this.$router.push({ path: `/activity/view/${id}` })
        }
    },
    filters: {
        format(value) {
            return formatTime(value);
        }
    }
}
</script>

<style scoped>
.activity-area {
    /* ... */
}

.activity-header {
    /* ... */
}

.activity-title {
    font-weight: 600;
}

.activity-icon {
    padding: 3px 8px;
}

.activity-count {
    color: #a6a6a6;
    padding-left: 14px;
    font-size: 13px;
}

.activity-description {
    font-size: 13px;
    line-height: 24px;
    margin-bottom: 10px;
}

.activity-footer {
    /* ... */
}

.activity-info {
    color: #a6a6a6;
    padding-right: 18px;
    font-size: 13px;
}

.el-tag {
    margin-left: 6px;
}
</style>
