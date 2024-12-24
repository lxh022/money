<template>
  <div class="authentication-page">
    <van-nav-bar title="完善信息" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <div class="idcard">
        <h3>请上传身份证照片</h3>
        <p class="tips">
          <img
            src="@/assets/image/secure.png"
            :style="{ width: '0.3rem', height: '0.3rem' }"
            alt=""
          />

          应国家监管部门要求手机身份信息，信息将被加密保护
        </p>
        <div class="phone">
          <div>
            <van-uploader capture="camera">
              <img src="@/assets/image/phone1.png" alt="" />
              <span>上传身份证人像面</span>
            </van-uploader>
          </div>
          <div>
            <van-uploader capture="camera">
              <img src="@/assets/image/phone1.png" alt="" />
              <span>上传身份证人像面</span>
            </van-uploader>
          </div>
        </div>
        <van-button class="step" round type="primary" block @click="toStep"
          >提交</van-button
        >
        <p class="demand-title">
          拍摄须知 <span>照片总是识别失败?查看帮助 ></span>
        </p>
        <div class="demand">
          <p>
            <img src="@/assets/image/idcard1.png" alt="" />
            <span><van-icon color="green" name="success" />标准照片</span>
          </p>
          <p>
            <img src="@/assets/image/idcard2.png" alt="" />
            <span><van-icon color="#858B9C" name="cross" />边框缺失</span>
          </p>
          <p>
            <img src="@/assets/image/idcard3.png" alt="" />
            <span><van-icon color="#858B9C" name="cross" />照片模糊</span>
          </p>
          <p>
            <img src="@/assets/image/idcard4.png" alt="" />
            <span><van-icon color="#858B9C" name="cross" />闪光强烈</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const onClickLeft = () => {
  router.back()
}
const toStep = () => {
  router.push('/bank')
}
</script>

<style lang="less">
@import './authentication.less';
</style>
