<template>
    <div class="me-allct-body" v-title :data-title="categoryTagTitle">
      <el-container class="me-allct-container">
        <el-main>
          <el-tabs v-model="activeName">
            <el-tab-pane label="行业分类" name="category">
              <ul class="me-allct-items">
                <li
                  v-for="c in categorys"
                  @click="view(c.id)"
                  :key="c.id"
                  class="me-allct-item"
                >
                  <div class="me-allct-content">
                    <a class="me-allct-info">
                      <img
                        class="me-allct-img"
                        :src="c.avatar ? c.avatar : defaultAvatar"
                      />
                      <h4 class="me-allct-name">{{ c.categoryname }}</h4>
                      <p class="me-allct-description">{{ c.description }}</p>
                    </a>
  
                    <div class="me-allct-meta">
                      <span>{{ c.articles }} 文章</span>
                    </div>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="公司" name="tag">
              <ul class="me-allct-items">
                <li
                  v-for="t in tags"
                  @click="view(t.id)"
                  :key="t.id"
                  class="me-allct-item"
                >
                  <div class="me-allct-content">
                    <a class="me-allct-info">
                      <img
                        class="me-allct-img"
                        :src="t.avatar ? t.avatar : defaultAvatar"
                      />
                      <h4 class="me-allct-name">{{ t.tagname }}</h4>
                    </a>
  
                    <div class="me-allct-meta">
                      <span>{{ t.articles }} 内推</span>
                    </div>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </div>
  </template>
  
  <script>
  import defaultAvatar from "@/assets/img/logo.png";
  import { getAllIndustryDetail } from "@/api/recommendApi/industry";
  import { getAllCompanyDetail } from "@/api/recommendApi/company";
  
  export default {
    name: "BlogAllCategoryTag",
    created() {
      this.getCategorys();
      this.getTags();
    },
    data() {
      return {
        defaultAvatar: defaultAvatar,
        categorys: [],
        tags: [],
        currentActiveName: "category",
      };
    },
    computed: {
      activeName: {
        get() {
          return (this.currentActiveName = this.$route.params.type);
        },
        set(newValue) {
          this.currentActiveName = newValue;
        },
      },
      categoryTagTitle() {
        if (this.currentActiveName == "category") {
          return "行业分类 - For Fun";
        }
        console.info("dddd");
        return "公司 - For Fun";
      },
    },
    methods: {
      view(id) {
        this.$router.push({ path: `/recommend/type/${this.currentActiveName}/${id}` });
      },
      getCategorys() {
        let that = this;
        getAllIndustryDetail()
          .then((data) => {
            console.log(data,"我是getAllIndustryDetail获取的数据");
            that.categorys = data.data;
          })
          .catch((error) => {
            if (error !== "error") {
              that.$message({
                type: "error",
                message: "行业分类加载失败",
                showClose: true,
              });
            }
          });
      },
      getTags() {
        let that = this;
        getAllCompanyDetail()
          .then((data) => {
            console.log(data,"我是getAllConpanyDetail获取的数据");
            that.tags = data.data;
          })
          .catch((error) => {
            if (error !== "error") {
              that.$message({
                type: "error",
                message: "公司加载失败",
                showClose: true,
              });
            }
          });
      },
    },
    //组件内的守卫 调整body的背景色
    beforeRouteEnter(to, from, next) {
      window.document.body.style.backgroundColor = "#fff";
      next();
    },
    beforeRouteLeave(to, from, next) {
      window.document.body.style.backgroundColor = "#f5f5f5";
      next();
    },
  };
  </script>
  
  <style>
  .me-allct-body {
    margin: 60px auto 140px;
  }
  
  .me-allct-container {
    width: 1000px;
  }
  
  .me-allct-items {
    padding-top: 2rem;
  }
  
  .me-allct-item {
    width: 25%;
    display: inline-block;
    margin-bottom: 2.4rem;
    padding: 0 0.7rem;
    box-sizing: border-box;
  }
  
  .me-allct-content {
    display: inline-block;
    width: 100%;
    background-color: #fff;
    border: 1px solid #f1f1f1;
    transition: border-color 0.3s;
    text-align: center;
    padding: 1.5rem 0;
  }
  
  .me-allct-info {
    cursor: pointer;
  }
  
  .me-allct-img {
    margin: -40px 0 10px;
    width: 60px;
    height: 60px;
    vertical-align: middle;
  }
  
  .me-allct-name {
    font-size: 21px;
    font-weight: 150;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 4px;
  }
  
  .me-allct-description {
    min-height: 50px;
    font-size: 13px;
    line-height: 25px;
  }
  
  .me-allct-meta {
    font-size: 12px;
    color: #969696;
  }
  </style>
  