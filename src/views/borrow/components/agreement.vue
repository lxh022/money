<template>
  <div class="agreement-page">
    <van-nav-bar title="相关协议" left-arrow @click-left="onClickLeft" />
    <div class="content"></div>
    <div class="footer">
      <p class="tips">
        点击我已阅读并同意，则表示同意<span
          >征信查询授权协议、个人借款合同、委托担保合同、自动还款及账户委托扣款授权书</span
        >
      </p>
      <van-button round size="small" type="primary" @click="show = true"
        >我已阅读并同意以上协议</van-button
      >
    </div>

    <van-action-sheet v-model:show="show" title="手机号验证">
      <div class="agreement-msheet-content">
        <p class="bank"><img src="" alt="" />中国建设银行</p>
        <p class="tips">
          <van-icon
            name="warning"
          />为了不影响借款正常发放，需短信验证此卡可正常使用；如银行预留手机号已变更，请更换手机号。
        </p>
        <div class="list">
          <van-cell-group inset>
            <van-field label="手机号" :model-value="mobile" readonly />
            <van-field
              v-model="phoneCode"
              center
              clearable
              label="验证码"
              placeholder="请输入"
            >
              <template #button>
                <van-button :disabled="isCounting" @click="sendCode">
                  {{ isCounting ? `${countdown}秒后重新发送` : '发送验证码' }}
                </van-button>
              </template>
            </van-field>
            <van-field readonly />
          </van-cell-group>
        </div>
        <van-button class="submit" round type="primary" @click="show = true"
          >确定</van-button
        >
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup lang="ts">
import { sendSms } from '@/api/login'
import { loanApply } from '@/api/borrow'

const emit = defineEmits(['back'])
const mobile: any = JSON.parse(localStorage.getItem('userinfo') || '').mobile
const show = ref(false)
const phoneCode = ref('')
const isCounting = ref(false) // 是否在倒计时中
const countdown = ref(60) // 倒计时的初始值

const onClickLeft = () => {
  emit('back')
}
const sendCode = async () => {
  await sendSms({ mobile })
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
</script>

<style lang="less">
@import '../index.less';
</style>
