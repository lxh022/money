<template>
  <div class="authentication-page">
    <van-nav-bar title="实名认证" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <div class="progress">
        <p>
          <img src="@/assets/image/secure2.png" alt="" />
          已完成0%
        </p>
        <van-progress
          :showPivot="false"
          color="#FF7D41"
          stroke-width="3"
          :percentage="0"
        />
      </div>
      <div class="idcard">
        <h3>上传本人身份证<span>最高20万额度</span></h3>
        <p class="tips">信息将智能加密，仅用于借款审批</p>
        <p class="title">身份证照片</p>
        <div class="phone">
          <van-uploader capture="camera" :before-read="e => beforeRead(e, 1)">
            <img v-if="frontImg" style="width: 100%" :src="frontImg" alt="" />
            <div class="update" v-else>
              <img src="@/assets/image/phone1.png" alt="" />
              <span>上传身份证人像面</span>
            </div>
          </van-uploader>
          <van-uploader capture="camera" :before-read="e => beforeRead(e, 2)">
            <img v-if="backImg" style="width: 100%" :src="backImg" alt="" />
            <div class="update" v-else>
              <img src="@/assets/image/phone1.png" alt="" />
              <span>上传身份证人像面</span>
            </div>
          </van-uploader>
        </div>
        <p class="demand-title">拍摄要求</p>
        <div class="demand">
          <p>
            <img src="@/assets/image/idcard1.png" alt="" />
            <span><van-icon color="#858B9C" name="success" />标准拍摄</span>
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
        <van-button class="step" type="primary" block @click="toStep"
          >下一步</van-button
        >
      </div>
      <p class="promise">借点米承诺确保您的信息安全</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { idCardSave } from '@/api/authentication'
import { showToast } from 'vant'
const router = useRouter()
const frontImg = ref('')
const backImg = ref('')

const onClickLeft = () => {
  router.back()
}
const toStep = async () => {
  if (!frontImg.value) {
    showToast('请上传身份证人像面')
  } else if (!backImg.value) {
    showToast('请上传身份证国徽面')
  } else {
    await idCardSave({
      // frontImg: frontImg.value,
      // backImg: backImg.value,
      frontImg: '',
      backImg: '',
    })
    router.push('/bank')
  }
}
const beforeRead: any = (file: any, log: number) => {
  console.log(file)
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    console.log(reader.result)
    let url = reader.result + ''
    if (log == 1) {
      frontImg.value = url
    } else {
      backImg.value = url
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
