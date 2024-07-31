<template>
  <el-header class="me-area">
    <el-row class="me-header">
      <el-col :span="2" class="me-header-left">
        <router-link to="/" class="me-title">
          <img src="../assets/img/logo.png" />
        </router-link>
      </el-col>

      <el-col :span="2" class="me-header-left">
        <!-- 新增的导航按钮 -->
        <el-dropdown>
          <el-button type="primary" icon="el-icon-menu">导航</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="navigateTo('/blog')"
              >博客模块</el-dropdown-item
            >
            <el-dropdown-item @click.native="navigateTo('/project')"
              >发包模块</el-dropdown-item
            >
            <el-dropdown-item @click.native="navigateTo('/activity')"
              >活动模块</el-dropdown-item
            >
            <el-dropdown-item @click.native="navigateTo('/recommend')"
              >内推模块</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col v-if="!simple" :span="15">
        <el-menu
          :router="true"
          menu-trigger="click"
          active-text-color="#5FB878"
          :default-active="activeIndex"
          mode="horizontal"
        >
          <el-menu-item
            v-for="item in currentMenuItems"
            :key="item.index"
            :index="item.index"
          >
            {{ item.label }}
          </el-menu-item>
        </el-menu>
      </el-col>

      <template v-else>
        <slot></slot>
      </template>

      <el-col :span="4">
        <el-menu
          :router="true"
          menu-trigger="click"
          mode="horizontal"
          active-text-color="#5FB878"
        >
          <template v-if="!user.login">
            <el-menu-item index="/login">
              <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text">注册</el-button>
            </el-menu-item>
          </template>

          <template v-else>
            <el-submenu index>
              <template slot="title">
                <img class="me-header-picture" :src="user.avatar" />
              </template>
              <el-menu-item index @click="goToProfile">
                <i class="el-icon-back"></i>个人中心</el-menu-item
                >
              <el-menu-item index @click="logout"
                ><i class="el-icon-back"></i>退出</el-menu-item
              >
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: "BaseHeader",
  props: {
    activeIndex: String,
    simple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentActiveIndex: this.activeIndex || "/blog", // 默认激活项
      menuItems: {
        "/blog": [
          { index: "/blog", label: "博客首页" },
          { index: "/blog/category/all", label: "文章分类" },
          { index: "/blog/tag/all", label: "标签" },
          { index: "/blog/archives", label: "文章归档" },
          { index: "/blog/log", label: "日志" },
          { index: "/blog/messageBoard", label: "留言板" },
          { index: "/blog/write", label: "写文章" },
          { index: "/blog/mine", label: "我的文章" },
          { index: "/blog/audit", label: "审核文章" },
        ],
        "/recommend": [
          { index: "/recommend", label: "内推首页" },
          { index: "/recommend/category/all", label: "公司分类" },
          { index: "/recommend/tag/all", label: "技术栈分类" },
          { index: "/recommend/archives", label: "内推归档" },
          { index: "/recommend/write", label: "发布内推" },
          { index: "/recommend/mine", label: "我的内推" },
          { index: "/recommend/audit", label: "审核内推" },
        ],
        "/project": [
          { index: "/project", label: "项目首页" },
          { index: "/project/create", label: "创建项目" },
          { index: "/project/asklist", label: "我申请的项目" },
          { index: "/project/releaselist", label: "我发布的项目" },
          { index: "/project/received", label: "我接收的项目" },
        ],
        "/activity": [
          { index: "/activity", label: "首页" },
          { index: "/activity/category/all", label: "活动分类" },
          { index: "/activity/tag/all", label: "标签" },
          { index: "/activity/archives", label: "历史活动" },
          { index: "/activity/myActivity", label: "我参加过的活动" },
          // { index: "/activity/messageBoard", label: "留言板" },
          { index: "/activitywrite", label: "发布活动" },
        ],
        // "/activity": [
        //   { index: "/activity", label: "首页" },
        //   { index: "/activity/category/all", label: "活动分类" },
        //   { index: "/activity/tag/all", label: "标签" },
        //   { index: "/activity/archives", label: "历史活动" },
        //   { index: "/activity/myActivity", label: "我发布过的活动" },
        //   // { index: "/activity/messageBoard", label: "留言板" },
        //   { index: "/activitywrite", label: "发布活动" },
        // ],
        // 添加更多导航项及其对应的菜单数组
        // ...
      },
    };
  },
  computed: {
    filteredMenuItems() {
      return this.filterMenuItems(this.menuItems);
    },
    currentMenuItems() {
      return this.filteredMenuItems[this.currentActiveIndex];
    },
    user() {
      let login = this.$store.state.account.length != 0;
      let avatar = this.$store.state.avatar;
      return {
        login,
        avatar,
      };
    },
  },
  methods: {
    filterMenuItems(menuItems) {
      const filteredItems = {};
      const auditRegex = /\/.*\/audit/; // 匹配任意路径中的 /audit
      const logRegex = /\/.*\/log/; // 匹配任意路径中的 /log
      const messageBoardRegex = /\/.*\/messageBoard/; // 匹配任意路径中的 /audit
      for (const key in menuItems) {
        if (Object.hasOwn(menuItems, key)) {
          filteredItems[key] = menuItems[key].filter(item => {
            // 如果status为0则不包含审核文章
            if(this.$store.state.adminStatus === 0){
            if ((auditRegex.test(item.index) || logRegex.test(item.index) || messageBoardRegex.test(item.index))) {
              return false;
            }
            return true;
          }
          else if(this.$store.state.adminStatus === 1) {
            if(this.$store.state.adminStatus === 1 && (auditRegex.test(item.index) || logRegex.test(item.index) || messageBoardRegex.test(item.index))) {
              return true;
            }
            return false;
          }});
        }
      }
      return filteredItems;
    },
    logout() {
      let that = this;
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          if (error !== "error") {
            that.$message({ message: error, type: "error", showClose: true });
          }
        });
    },
    goToProfile() {
      this.$router.push({ path: '/personCenter' });
    },
    navigateTo(path) {
      this.currentActiveIndex = path; // 更新激活项
      this.$router.push({ path });
    },
    navigateTo1(path) {
      this.$router.push({ path });
    },
  },
};
</script>

<style>
.el-header {
  position: fixed;
  z-index: 1024;
  min-width: 100%;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
}

.me-title {
  margin-top: 10px;
  font-size: 24px;
}

.me-header-left {
  margin-top: 10px;
}

.me-title img {
  max-height: 2.4rem;
  max-width: 100%;
}

.me-header-picture {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #5fb878;
}
</style>
