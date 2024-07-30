<template>
  <div>
    <button class="button" type="primary" @click="showModal = true">
      View&Edit
    </button>
    <el-dialog :visible.sync="showModal" title="编辑个人信息">
      <el-form
        :model="formData"
        label-width="80px"
        :rules="rules"
        :inline="true"
        ref="formData"
      >
        <el-form-item label="昵称" prop="nickname">
          <el-input
            placeholder="请输入昵称"
            v-model="formData.nickname"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formData.sex" placeholder="请选择">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="formData.birth"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            placeholder="请输入Email"
            v-model="formData.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input
            placeholder="请输入电话"
            v-model="formData.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input
            placeholder="请输入地址"
            v-model="formData.address"
          ></el-input>
        </el-form-item>
        <el-form-item label="职业" prop="position">
          <el-input
            placeholder="请输入职业"
            v-model="formData.position"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户头像" prop="avatar">
          <div v-if="formData.avatar" class="avatar-preview">
            <img :src="formData.avatar" alt="用户头像" class="avatar-image" />
            <el-button type="text" @click="editAvatar = true"
              >修改头像</el-button
            >
          </div>
          <el-upload
            v-if="editAvatar"
            action="http://localhost:8888/users/updateUser"
            list-type="picture-card"
            :on-success="handleSuccess"
            :file-list="fileList"
            :before-upload="beforeUpload"
            accept="image/*"
          >
            <el-button type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showModal = false">取消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
import axios from "axios";
import { updateUserInfo } from "@/api/login";
import { uploadAvatar } from "@/api/upload";
export default {
  name: "Button",
  data() {
    return {
      showModal: false,
      editAvatar: false,
      formData: {
        nickname: "",
        sex: "",
        birth: "",
        email: "",
        phone: "",
        address: "",
        position: "",
        avatar: "", // 用户头像 URL
      },
      fileList: [],
      rules: {
        nickname: [{ required: true, message: "请输入昵称" }],
        email: [{ required: true, message: "请输入邮箱" }],
        phone: [{ required: true, message: "请输入电话" }],
        address: [{ required: true, message: "请输入地址" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        position: [{ required: true, message: "请输入职业" }],
        avatar: [{ required: true, message: "请上传头像" }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          console.log("Form data:", this.formData);
          //后续对表单数据的处理;
          updateUserInfo(this.formData).then(() => {
            // 更新表单的数据
            this.updateForm();
          });
          //关闭弹窗;
          this.showModal = false;
        }
      });
    },
    updateForm() {
      this.getInfo();
    },
    getInfo() {
      store.dispatch("getUserInfo").then((data) => {
        this.assignFormData(data.data);
      });
    },
    assignFormData(data) {
      for (let key in this.formData) {
        if (data.hasOwnProperty(key)) {
          this.formData[key] = data[key];
        }
      }
      console.log("Updated formData:", this.formData);
    },
    handleSuccess(response, file, fileList) {
      this.fileList = fileList; // 更新头像 URL
      this.formData.avatar = response;
      console.log("Upload success:", response, file, fileList, this.formData);
    },
    beforeUpload(file) {
      // 使用 FormData 来封装文件和其他数据
      const formData = new FormData();
      formData.append("file", file); // 发送 POST 请求到服务器
      uploadAvatar(formData)
        .then((response) => {
          this.handleSuccess(response.data, file, this.fileList);
        })
        .catch((error) => {
          console.error("上传失败", error);
        }); // 阻止 el-upload 组件的默认行为

      return false;
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to left, #606c88, #3f4c6b);
  font-family: "Oswald", sans-serif;
}

.button {
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 20px;
  letter-spacing: 4px;
  position: relative;
  background-color: #15cd80;
  border: none;
  color: #fff;
  padding: 20px;
  width: 200px;
  text-align: center;
  transition-duration: 0.4s;
  overflow: hidden;
  box-shadow: 0 5px 15px #193047;
  border-radius: 4px;
}

.button:hover {
  background: #fff;
  box-shadow: 0px 2px 10px 5px #1abc9c;
  color: #000;
}

.button:after {
  content: "";
  background: #1abc9c;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s;
}

.button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s;
}

.button:focus {
  outline: 0;
}

.avatar-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #5fb878;
}
</style>
