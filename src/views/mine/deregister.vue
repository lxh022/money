<template>
  <div class="deregister-page">
    <VanNavBar
      title="注销说明"
      safe-area-inset-top
      left-arrow
      @click-left="onClickLeft"
    ></VanNavBar>
    <div :style="{ height: '0.4rem' }"></div>
    <div class="text-style">
      1、若您存在在途业务(包含所有审批中状态以及贷款未结清)，需先完成。
    </div>
    <div class="text-style">
      2、注销后，您将无法查看您的借款合同、借款记录、还款记录等。
    </div>
    <div class="text-style">
      3、注销后，您将无法使用借点米提供的权益服务。账户中的权益随账户一并注销。
    </div>
    <div class="text-style">
      4、为保障您的安全、注销前，借点米将对您的身份信息进行校验。
    </div>
    <VanButton class="button" plain color="#FF7d41" @click="clickConfirm"
      >同意并确认注销</VanButton
    >
    <VanButton
      class="button"
      type="primary"
      color="#FF7d41"
      @click="clickCancel"
      >我再想想</VanButton
    >
    <VanPopup
      v-model:show="showDialog"
      :close-on-click-overlay="false"
      position="bottom"
      closeable
      :style="{ height: '9rem' }"
    >
      <div class="deregister-dialog">
        <div class="dialog-text">请输入短信验证码</div>
        <div class="dialog-desc-container">
          <div class="dialog-desc">验证码已经发送至：{{ phone }}</div>
          <VanButton class="dialog-button" plain color="#FF7d41" size="small">{{
            buttonSms
          }}</VanButton>
        </div>
        <div class="dialog-code">
          <VanPasswordInput
            :gutter="10"
            :value="code"
            :maxlength="6"
            @blur="false"
            :mask="false"
            :show="showKeyboard"
            @focus="showKeyboard = true"
          ></VanPasswordInput>
          <van-number-keyboard
            theme="custom"
            :maxlength="6"
            @blur="false"
            close-button-text="确定"
            v-model="code"
            :show="true"
            @close="confirmCode"
          />
        </div>
      </div>
    </VanPopup>
  </div>
</template>
<script setup lang="ts">
import { userStore } from '@/stores'
import mine from '@/api/mine'
import sms from '@/api/sms'
const request = mine()
const requestSms = sms()
const user = userStore()

const buttonSms = ref('')
let timer: any
const countdown = ref(60)
const isCountingDown = ref(false)
const showKeyboard = ref(true)
const phone = ref('135xxxx1234')
const code = ref()
const showDialog = ref(false)
const router = useRouter()
function onClickLeft() {
  router.back()
}
function clickConfirm() {
  request.verifyDeleteAccount(result => {
    showDialog.value = true
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
  })
}
function clickCancel() {
  router.back()
}

function confirmCode() {
  requestSms.verifySms('13520862956', code.value, result => {
    request.deleteAccount(result => {
      router.push('/')
    })
  })
}
</script>
<style lang="less">
@import './deregister.less';
</style>
