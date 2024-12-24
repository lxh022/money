<template>
  <div class="login-page">
    <van-icon
      name="arrow-left"
      color="#ffffff"
      class="back"
      @click="onClickLeft"
    />
    <div class="logo">
      <img src="@/assets/image/logo.png" alt="" />
      <p>更安全、更专业的多场景的贷款推荐服务</p>
    </div>
    <div class="form-bg">
      <div class="form">
        <van-field placeholder="输入手机号" type="tel" v-model="mobile" />
        <van-field
          center
          clearable
          type="digit"
          placeholder="输入短信验证码"
          v-model="code"
        >
          <template #button>
            <van-button :disabled="isCounting" @click="sendCode">
              {{ isCounting ? `${countdown}秒后重新发送` : '发送验证码' }}
            </van-button>
          </template>
        </van-field>
      </div>
    </div>
    <van-button
      class="login-btn"
      block
      :loading="loading"
      type="primary"
      @click="login"
      >登录</van-button
    >
    <div class="tips">
      <van-checkbox v-model="checked" shape="round">
        请同意以下协议，未注册手机号自动注册
        <i class="agreement"
          >《借点米注册服务协议》《借点米隐私保护政策》《注册用户个人信息对外提供授权书》</i
        >
      </van-checkbox>
    </div>
  </div>
</template>
<script setup lang="ts">
import { smsLogin, sendSms } from '@/api/login'
import { showToast } from 'vant'
const router = useRouter()
const mobile = ref('')
const code = ref('')
const loading = ref(false)
const isCounting = ref(false) // 是否在倒计时中
const countdown = ref(60) // 倒计时的初始值

const checked = ref(false)

const onClickLeft = () => {
  router.back()
}

const sendCode = async () => {
  if (!mobile.value) {
    showToast('请输入手机号')
  } else {
    await sendSms({ mobile: mobile.value })
    // 开始倒计时
    isCounting.value = true
    const interval = setInterval(() => {
      countdown.value -= 1
      if (countdown.value <= 0) {
        clearInterval(interval) // 清除定时器
        isCounting.value = false
        countdown.value = 60 // 重置倒计时
      }
    }, 1000)
  }
}

const login = async () => {
  if (!mobile.value) {
    showToast('请输入手机号')
  } else if (!code.value) {
    showToast('请输入验证码')
  } else if (!checked.value) {
    showToast('请勾选同意以下协议')
  } else {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 5000)
    let res: any = await smsLogin({
      mobile: mobile.value,
      code: code.value,
    })
    loading.value = false
    let userInfo = {
      mobile: res.mobile,
    }
    localStorage.setItem('access_token', res.token)
    localStorage.setItem('userinfo', JSON.stringify(userInfo))
    showToast('登录成功')
    router.replace('/')
  }
}
</script>
<style lang="less">
@import './index.less';
</style>
