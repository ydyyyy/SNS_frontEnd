<template>
  <div class="personCenter-container">
    <el-row class="row-container" :gutter="90">
      <el-col :span="10" class="card-me" >
        <card-me class="me-area"></card-me>
        <button-me class="me-button"></button-me>
      </el-col>
      <el-col :span="14" >
        <section class="pricing-table">
          <div class="card">
            <h6 class="type">参与内推数</h6>
            <div class="price">20</div>
            <h5 class="plan">内推 </h5>
            <ul class="details">
              <li>FREE Stickers</li>
              <li>FREE Delivery</li>
              <li>24/7 support</li>
            </ul>
          </div>

          <div class="card">
            <h6 class="type">发布博文数</h6>
            <div class="price">50</div>
            <h5 class="plan">博客 </h5>
            <ul class="details">
              <li>FREE Stickers</li>
              <li>FREE Delivery</li>
              <li>24/7 support</li>
            </ul>
          </div>

          <div class="card">
            <h6 class="type">参与项目数</h6>
            <div class="price">6</div>
            <h5 class="plan">发包</h5>
            <ul class="details">
              <li>FREE Stickers</li>
              <li>FREE Delivery</li>
              <li>24/7 support</li>
            </ul>
          </div>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CardMe from "@/components/card/CardMe";
import ButtonMe from "@/components/button/ButtonMe";
export default {
  name: "PersonCenter",
  components: {
    "card-me": CardMe,
    "button-me": ButtonMe,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.me-button {
  margin-top: 60px;
  margin-left: 95px
}
.me-area{
  margin-top: 10px;
}
.pricing-table {
  display: flex;
}
.card {
  width: 220px;
  height: 470px;
  padding: 30px;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 2px 2px 46px -4px rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease-in-out;
}

.card:nth-child(1) {
  background: linear-gradient(to left, #91eae4, #86a8e7, #7f7fd5);
}
.card:nth-child(1) .price::before {
  content: "20";
}

.card:nth-child(2) {
  margin: 0 30px;
  z-index: 2;
  width: 250px;
  height: 500px;
  background: linear-gradient(to right, #ff4b2b, #ff416c);
}

.card:nth-child(2) .price::before {
  content: "50";
}

.card:nth-child(3) {
  background: linear-gradient(to right, #96c93d, #00b09b);
  
}

.card:nth-child(3) .price::before {
  content: "6";
}

.card:nth-child(1) .price,
.card:nth-child(2) .price,
.card:nth-child(3) .price {
  font-size: 6rem;
  color: white; /* 设置字体颜色为白色 */
  font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif; /* 适合中文的字体 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加阴影效果增加质感 */
  font-weight: bold; /* 设置字体加粗 */
}

.type {
  margin-top: 30px;
  letter-spacing: 0.1rem;
  font-size: 1rem;
  color: white; /* 设置字体颜色为白色 */
  font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif; /* 适合中文的字体 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加阴影效果增加质感 */
  font-weight: bold; /* 设置字体加粗 */
}

.price {
  font-size: 7.5rem;
  position: relative;
  z-index: 2;
  color: white; /* 设置字体颜色为白色 */
  font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif; /* 适合中文的字体 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加阴影效果增加质感 */
  font-weight: bold; /* 设置字体加粗 */
}

.price::before {
  position: absolute;
  content: "";
  color: rgba(255, 255, 255, 0.06);
  font-size: 9.5rem;
  z-index: -1;
  right: -30%;
  bottom: 15%;
  text-shadow: 0 0 0px rgba(51, 55, 69, 0);
  transition: all 1s ease-in-out;
}

.plan {
  font-size: 1.3rem;
  position: relative;
  margin-bottom: 10px;
  color: white; /* 设置字体颜色为白色 */
  font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif; /* 适合中文的字体 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加阴影效果增加质感 */
  font-weight: bold; /* 设置字体加粗 */
}

.plan::before,
.plan::after {
  position: absolute;
  content: "";
  width: 35px;
  height: 2px;
  background: #fff;
  bottom: 40%;
  transition: all 0.2s ease-out;
}

.plan::before {
  right: 100%;
  transform: translate(-50%, -50%);
}

.plan::after {
  right: -100%;
  transform: translate(-0%, -50%);
}

.details {
  text-transform: capitalize;
}

.details li {
  margin: 15px 0px;
  color: white; /* 设置字体颜色为白色 */
  font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif; /* 适合中文的字体 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加阴影效果增加质感 */
  font-weight: bold; /* 设置字体加粗 */
}

.card:hover {
  transform: scale(1.02);
}

.card:hover .price::before {
  animation: text-hover 1s ease-in-out infinite normal;
}

.card:hover .plan::before {
  right: 90%;
}

.card:hover .plan::after {
  right: -90%;
}

@keyframes text-hover {
  0% {
    right: -30%;
  }
  50% {
    right: -37%;
  }
  100% {
    right: -30%;
  }
}
</style>
