<template>
  <div id="write" v-title :data-title="title">
    <div>
      <div class="me-write-btn" style="margin-right: 10px;">
        <el-button type="success" round @click="publishShow">发布</el-button>
        <el-button type="warning" round @click="cancel">取消</el-button>
      </div>
    </div>
    <!-- 点击发布前 -->
    <el-container class="me-area me-write-box">
      <el-main class="me-write-main">
        <!-- 标题 -->
        <div>
          <h2>需求标题</h2>
        </div>
        <div class="me-write-title">
          <el-input resize="none" type="textarea" autosize v-model="projectForm.title" class="me-write-input"
            placeholder="请输入标题">
          </el-input>
        </div>
        <!-- 详情 -->
        <div id="placeholder" style="visibility: hidden; height: 89px; display: none"></div>
        <div>
          <h2>需求详情</h2>
        </div>
        <el-form :model="projectForm" ref="projectForm" :rules="rules">
          <el-form-item label="需求详情" prop="info">
            <el-input type="textarea" v-model="projectForm.info" :rows="6">
            </el-input>
          </el-form-item>
          <!-- 分类 -->
          <el-form-item label="分类选择" prop="category">
            <el-select v-model="projectForm.category" value-key="id" placeholder="请选择任务分类">
              <el-option v-for="c in categorys" :key="c.id" :label="c.categoryname" :value="c.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 投标截止 -->
          <el-form-item label="投标截止" prop="deadline">
            <el-date-picker v-model="projectForm.deadline" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>

    <!-- 点击发布后 -->
    <el-dialog title="详细信息" :visible.sync="publishVisible" :close-on-click-modal="false" custom-class="me-dialog">
      <el-form ref="form" :model="projectForm" label-width="120px">
        <!-- 价格区间 -->
        <el-form-item label="价格区间" prop="priceRange">
          <el-input-number v-model="projectForm.priceRange.lower" :min="0" placeholder="最低价格"></el-input-number>
          -
          <el-input-number v-model="projectForm.priceRange.upper" :min="0" placeholder="最高价格"></el-input-number>
        </el-form-item>
        <!-- 联系方式 -->
        <el-form-item label="联系方式" prop="contactInfo">
          <el-input type="textarea" v-model="projectForm.contactInfo" placeholder="请输入联系方式"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="publishVisible = false">取 消</el-button>
        <el-button type="primary" @click="publish()">发布</el-button>
      </div>
    </el-dialog>
  </div>
</template>



<script>
import BaseHeader from "@/views/BaseHeader";
import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import { publishProject, getProjectById } from "@/api/project";

export default {
  name: "ProjectCreate",
  mounted() {
    console.log("6666"); // 添加调试信息
    if (this.$route.params.id) {
      
      this.getProjectById(this.$route.params.id);
    }
    this.editorToolBarToFixedWrapper = this.$_.throttle(
      this.editorToolBarToFixed,
      200
    );
    window.addEventListener("scroll", this.editorToolBarToFixedWrapper, false);

    // 初始化分类
    this.categorys = [
      { id: 1, categoryname: "Java" },
      { id: 2, categoryname: "Python" },
      // 其他分类
    ];
  },
  beforeDestroy() {
    window.removeEventListener(
      "scroll",
      this.editorToolBarToFixedWrapper,
      false
    );
  },
  data() {
    return {
      publishVisible: false,
      categorys: [],
      projectForm: {
        id: "",
        title: "",
        info: "",
        category: "", // 初始化分类
        priceRange: {
          lower: 0, // 新增价格区间字段
          upper: 0,
        },
        contactInfo: "",
        deadline: "", // 添加 deadline 字段
      },
      rules: {
        info: [
          { required: true, message: "请输入需求详情", trigger: "blur" },
          { max: 80, message: "不能大于80个字符", trigger: "blur" },
        ],
        category: [
          { required: true, message: "请选择发包分类", trigger: "change" },
        ],
        priceRange: [
          { required: true, message: "请输入价格区间", trigger: "blur" },
        ],
        contactInfo: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
        ],
        deadline: [
          { required: true, message: "请选择投标截止日期", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    title() {
      return "创建项目 - SNS 社交网络平台系统";
    },
  },
  methods: {
    getProjectById(id) {
      let that = this;
      getProjectById(id)
        .then((data) => {
          Object.assign(that.projectForm, data.data);
          console.log("projectForm:", this.projectForm); // 添加调试信息
        })
        .catch((error) => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "文章加载失败",
              showClose: true,
            });
          }
        });
    },
    publishShow() {
      if (!this.projectForm.title) {
        this.$message({
          message: "标题不能为空哦",
          type: "warning",
          showClose: true,
        });
        return;
      }

      if (this.projectForm.title.length > 30) {
        this.$message({
          message: "标题不能大于30个字符",
          type: "warning",
          showClose: true,
        });
        return;
      }

      if (!this.projectForm.info) {
        this.$message({
          message: "需求详情不能为空哦",
          type: "warning",
          showClose: true,
        });
        return;
      }

      this.publishVisible = true;
    },
    publish() {
      let that = this;

      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          let project = {
            title: this.projectForm.title,
            info: this.projectForm.info,
            category: this.projectForm.category,
            priceLower: this.projectForm.priceRange.lower, // 使用priceRange字段
            priceUpper: this.projectForm.priceRange.upper, // 使用priceRange字段
            tel: this.projectForm.contactInfo,
            deadline: this.projectForm.deadline, // 使用 deadline 字段
            tel:this.projectForm.contactInfo,
          };

          this.publishVisible = false;

          let loading = this.$loading({
            lock: true,
            text: "发布中，请稍后...",
          });

          publishProject(project)
            .then(() => {
              loading.close();
              that.$message({
                message: "发布成功",
                type: "success",
                showClose: true,
              });
            })
            .catch((error) => {
              loading.close();
              that.$message({
                type: "error",
                message: error || "发布失败啦",
                showClose: true,
              });
            });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$confirm("您确定要退出编辑吗?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.push({ path: "/home" });
        })
        .catch(() => {});
    },
    editorToolBarToFixed() {
      const toolBar = document.querySelector(".me-write-box .toolbar");
      const placeholder = document.querySelector("#placeholder");

      if (toolBar == null || placeholder == null) {
        return;
      }

      const toolBarTop = toolBar.getBoundingClientRect().top;

      if (toolBarTop <= 55) {
        placeholder.style.display = "block";
        toolBar.classList.add("toolbar_fixed");
      } else {
        placeholder.style.display = "none";
        toolBar.classList.remove("toolbar_fixed");
      }
    },
  },
  components: { BaseHeader, MarkdownEditor },
};
</script>



<style>
.me-write-info {
  line-height: 60px;
  font-size: 18px;
  font-weight: 600;
}

.me-write-btn {
  margin-top: -10px;
  margin-bottom: -80px;
  margin-left: 600px;
}

.me-write-box {
  max-width: 700px;
  margin: 80px auto 0;
}

.me-write-main {
  padding: 0;
}



.me-write-input textarea {
  font-size: 32px;
  font-weight: 600;
  height: 20px;
  border: none;
}

.me-write-editor {
  min-height: 650px !important;
}

.me-header-left {
  margin-top: 10px;
}

.me-title img {
  max-height: 2.4rem;
  max-width: 100%;
}

.me-write-toolbar-fixed {
  position: fixed;
  width: 700px !important;
  top: 60px;
}

.v-note-op {
  box-shadow: none !important;
}

.auto-textarea-input,
.auto-textarea-block {
  font-size: 18px !important;
}
</style>