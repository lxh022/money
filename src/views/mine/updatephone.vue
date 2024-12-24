<template>
  <div class="update-phone-page">
    <VanNavBar
      title="修改登录手机号"
      safe-area-inset-top
      left-arrow
      @click-left="onClickLeft"
    ></VanNavBar>
    <div class="top-title">验证新手机号</div>
    <div class="top-desc">请输入新手机号，并发送短信验证码</div>

    <VanField
      class="phone-container"
      v-model="phone"
      placeholder="请输入本人实名的新手机号"
    ></VanField>
    <div class="code-container">
      <VanField v-model="code" placeholder="请输入验证码"></VanField>
      <VanButton
        class="code-button"
        size="small"
        plain
        round
        color="#FF7D41"
        @click="clickSendSMS"
        >{{ buttonSms }}</VanButton
      >
    </div>
    <VanButton
      class="confirmSure"
      type="primary"
      round
      color="#FF7D41"
      @click="confirmUpdate"
      >确定</VanButton
    >
  </div>
</template>
<script setup lang="ts">
import mine from '@/api/mine'
import sms from '@/api/sms'
import { showToast } from 'vant'
import { ref } from 'vue'

const request = mine()
const requestSms = sms()
const phone = ref('')
const code = ref('')
const buttonSms = ref('获取验证码')

let timer: any
const countdown = ref(60)
const isCountingDown = ref(false)

const router = useRouter()

function onClickLeft() {
  router.back()
}
function clickSendSMS() {
  if (phone.value == '') {
    showToast('请输入手机号')
    return
  }
  requestSms.sendSms('13520862956', result => {
    const tick = () => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
        isCountingDown.value = false
        buttonSms.value = '重新发送'
        countdown.value = 60
      } else {
        buttonSms.value = countdown.value + 's'
      }
    }
    timer = setInterval(tick, 1000)
  })
}
function confirmUpdate() {
  if (phone.value == '') {
    showToast('请输入手机号')
    return
  }
  if (code.value == '') {
    showToast('请输入验证码')
    return
  }
  request.updateUserPhone(phone.value, code.value, result => {
    router.back()
  })
}
</script>
<style lang="less">
@import './updatephone.less';
</style>
