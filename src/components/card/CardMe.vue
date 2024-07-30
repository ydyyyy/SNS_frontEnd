<template>
  <el-card class="card_info">
    <h1 class="me-author-name">{{this.formData.nickname}}</h1>
    <div class="me-author-description">
      <span><i class="el-icon-location-outline"></i> &nbsp;{{this.formData.address}}</span>
      <span><i class="me-icon-job"></i> &nbsp;{{this.formData.position}}</span>
    </div>
    <div class="wrapper">
      <div class="social">
        <span>Share your profile</span>
        <div class="social-links">
          <a @click="showTool(wechat)"
            ><i class="fa fa-weixin" aria-hidden="true"></i
          ></a>
          <a @click="showTool(qq)"
            ><i class="fa fa-qq" aria-hidden="true"></i
          ></a>
          <a @click="showTool(qqEnvelope)"
            ><i class="fa fa-envelope" aria-hidden="true"></i
          ></a>
          <a @click="showTool(github)"
            ><i class="fa fa-github" aria-hidden="true"></i
          ></a>
          <a @click="showTool(facebook)"
            ><i class="fa fa-facebook" aria-hidden="true"></i
          ></a>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import store from "@/store";
export default {
  name: "CardMe",
  data() {
    return {
      qq: { title: "QQ", message: "919431514" },
      wechat: { title: "Wechat", message: "2872186464" },
      qqEnvelope: { title: "QQ Mail", message: "919431514@qq.com" },
      facebook: { title: "facebook", message: "kk.tt" },
      github: {
        title: "github",
        message:
          '<a target="_blank" href="https://github.com/shimh-develop">https://github.com/shimh-develop</a>',
      },
      formData: {
        nickname: "",
        sex: "",
        birth: "",
        email: "",
        phone: "",
        address: "哈尔滨",
        position: "前端开发工程师",
        avatar: "", // 用户头像 URL
      },
    };
  },
  methods: {
    showTool(tool) {
      this.$message({
        duration: 0,
        showClose: true,
        dangerouslyUseHTMLString: true,
        message: "<strong>" + tool.message + "</strong>",
      });
    },
    getInfo() {
      store
          .dispatch("getUserInfo")
          .then((data) => {
            this.assignFormData(data.data);
          })
    },
    assignFormData(data) {
      for (let key in this.formData) {
        if (data.hasOwnProperty(key)) {
          this.formData[key] = data[key];
        }
      }
      console.log("Updated formData:", this.formData);
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>

<style scoped>
.card_info {
  width: 400px;
  height: 330px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.me-author-name {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  border-bottom: 3px solid #5fb878;
  padding-bottom: 10px;
}

.me-author-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.me-author-description span {
  display: flex;
  align-items: center;
  margin: 8px 0;
  font-size: 18px; /* 增加字体大小 */
  color: #444; /* 增加字体颜色对比度 */
}

.me-icon-job {
  padding-left: 16px;
}

.me-author-tool {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.me-author-tool i {
  cursor: pointer;
  font-size: 28px;
  color: #409eff;
  transition: color 0.3s ease;
}

.me-author-tool i:hover {
  color: #66b1ff;
}
</style>

<style>
.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  text-align: center;
}

*,
div,
span {
  box-sizing: border-box;
}

.social {
  display: flex;
  align-items: center;
  position: relative;
  width: 300px;
  height: 70px;
  font-size: 18px;
  font-weight: 700;
  box-shadow: inset 0 0 0 2px #dbe3ea;
  border-radius: 50px;
  color: #9aa9b5;
  background: #fff;
  overflow: hidden;
  margin: auto;
  transition: box-shadow 0.2s ease-out;
}

.social span,
.social div {
  margin: auto;
}

.social-links {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(66, 139, 202, 0);
  width: 100%;
  height: 100%;
  padding: 0 30px;
  transition: all 0.25s ease;
}

.social-links a {
  margin: auto;
  background: #fff;
  color: #5fb878;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  line-height: 40px;
  font-size: 15px;
  transform: translate3d(0, 60px, 0);
  transition: all 0.2s;
}

.social-links a:hover {
  background: #5fb878;
  color: #fff;
}

.social:hover {
  box-shadow: inset 0 0 0 2px #dbe3ea, 0 1rem 20px rgba(66, 139, 202, 0.2);
}

.social:hover .social-links {
  background: rgb(59, 228, 140);
}

.social:hover .social-links a {
  animation: elastic 0.5s ease-out forwards;
}

.social:hover .social-links a:nth-child(2) {
  animation-delay: 0.05s;
}

.social:hover .social-links a:nth-child(3) {
  animation-delay: 0.1s;
}

.social:hover .social-links a:nth-child(4) {
  animation-delay: 0.15s;
}

.social:hover .social-links a:nth-child(5) {
  animation-delay: 0.2s;
}

@keyframes elastic {
  0% {
    transform: translate3d(0, 60px, 0);
  }
  40% {
    transform: translate3d(0, -5px, 0);
  }
  70% {
    transform: translate3d(0, 5px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
