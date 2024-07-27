<template>
  <div>
    <button class="button" type="primary" @click="showModal = true">View&Edit</button>
    <el-dialog :visible.sync="showModal" title="编辑个人信息">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formData.phone"></el-input>
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
export default {
  name: "Button",
  data() {
    return {
      showModal: false,
      formData: {
        name: '',
        email: '',
        phone: ''
      }
    };
  },
  methods: {
    submitForm() {
      // 在此处处理表单提交逻辑，例如发送请求或更新状态
      console.log('提交的表单数据:', this.formData);
      this.showModal = false; // 提交后关闭模态框
    }
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to left, #606c88 , #3f4c6b);
  font-family: 'Oswald', sans-serif;
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
  transition: all 0.8s
}

.button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}

.button:focus { outline:0; }
</style>
