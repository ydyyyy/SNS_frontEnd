<template>
    <div v-title :data-title="title">
      <el-container>
        <el-aside class="me-area">
          <ul class="me-month-list">
            <li
              v-for="a in archives"
              :key="a.year + a.month"
              class="me-month-item"
            >
              <el-badge :value="a.count">
                <el-button @click="changeArchive(a.year, a.month)" size="small"
                  >{{ a.year + "年" + a.month + "月" }}
                </el-button>
              </el-badge>
            </li>
          </ul>
        </el-aside>
  
        <el-main class="me-activities">
          <div class="me-month-title">{{ currentArchive }}</div>
  
          <activity-finished-scroll-page v-bind="activities"></activity-finished-scroll-page>
        </el-main>
      </el-container>
    </div>
  </template>
  
  <script>
  import ActivityFinishedScrollPage from "@/views/common/ActivityFinishedScrollPage";
  import { listArchives } from "@/api/activity";
  
  export default {
    name: "ActivityArchive",
    components: {
      ActivityFinishedScrollPage,
    },
    created() {
      this.listArchives();
    },
    watch: {
      $route() {
        if (this.$route.params.year && this.$route.params.month) {
          this.activity.query.year = this.$route.params.year;
          this.activity.query.month = this.$route.params.month;
        }
      },
    },
    data() {
      return {
        activity: {
          query: {
            month: this.$route.params.month,
            year: this.$route.params.year,
          },
        },
        archives: [],
      };
    },
    computed: {
      title() {
        return this.currentArchive + " - 历史活动 - For Fun";
      },
      currentArchive() {
        if (this.activity.query.year && this.activity.query.month) {
          return `${this.activity.query.year}年${this.activity.query.month}月`;
        }
        return "历来全部已经完成的活动";
      },
    },
    methods: {
      changeArchive(year, month) {
        // this.currentArchive = `${year}年${month}月`
        // this.activity.query.year = year
        // this.activity.query.month = month
        this.$router.push({ path: `/activity/archives/${year}/${month}` });
      },
      listArchives() {
        listArchives()
          .then((data) => {
            this.archives = data.data;
          })
          .catch((error) => {
            that.$message({
              type: "error",
              message: "历史活动加载失败!",
              showClose: true,
            });
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .el-container {
    width: 640px;
  }
  
  .el-aside {
    position: fixed;
    left: 200px;
    margin-right: 50px;
    width: 150px !important;
  }
  
  .el-main {
    padding: 0px;
    line-height: 16px;
  }
  
  .me-month-list {
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
    list-style-type: none;
  }
  
  .me-month-item {
    margin-top: 18px;
    padding: 4px;
    font-size: 18px;
    color: #5fb878;
  }
  
  .me-order-list {
    float: right;
  }
  
  .me-month-title {
    margin-left: 4px;
    margin-bottom: 12px;
  }
  </style>
  