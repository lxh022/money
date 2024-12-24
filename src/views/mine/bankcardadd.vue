<template>
  <div class="add-bank-card-page">
    <VanNavBar
      title="添加银行卡"
      safe-area-inset-top
      left-arrow
      @click-left="onClickLeft"
    ></VanNavBar>
    <div class="container">
      <div class="top-title">添加银行卡</div>
      <div class="info-container">
        <div>请提供您本人真实信息</div>
        <div :style="{ color: '#FF7D41' }" @click="clickBankSupport">
          查看支持银行卡
        </div>
      </div>
      <div class="card-container">
        <div>发行卡</div>
        <div class="card-text">
          ****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****
        </div>
      </div>
      <div class="bank-card-title">银行卡号</div>
      <VanField
        v-model="bankCardId"
        autocomplete="off"
        type="number"
        placeholder="请输入有效的储蓄卡号，推荐使用一类卡"
      ></VanField>
      <div class="line"></div>
      <div class="bank-phone-title">手机号</div>
      <VanPopover v-model:show="showPopover" placement="bottom-start">
        <div
          :style="{
            fontSize: '0.28rem',
            padding: '0.1rem 0.3rem',
          }"
        >
          点击输入您的登录手机号{{ loginPhone }}
        </div>
        <template #reference>
          <VanField
            v-model="bankPhone"
            autocomplete="off"
            type="text"
            maxlength="11"
          ></VanField>
        </template>
      </VanPopover>

      <div class="rule-container">
        <VanCheckbox v-model="checkRule" checked-color="#FF7D41"
          >已阅读并同意
        </VanCheckbox>
        <div>《银行卡扣款授权书》</div>
      </div>

      <VanButton class="next-button" round color="#FF7D41" @click="clickAddNext"
        >下一步</VanButton
      >
    </div>
    <VanPopup
      v-model:show="showDialog"
      :close-on-click-overlay="false"
      position="bottom"
      closeable
      :style="{ height: '9rem' }"
    >
      <div class="bank-add-dialog">
        <div class="dialog-text">请输入短信验证码</div>
        <div class="dialog-desc-container">
          <div class="dialog-desc">验证码已经发送至：{{ phone }}</div>
          <VanButton
            class="dialog-button"
            plain
            color="#FF7d41"
            size="small"
            @click="clickConfirm"
            >{{ buttonSms }}</VanButton
          >
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
import bank from '@/api/bank'
import sms from '@/api/sms'

const request = bank
const requestSms = sms()

const bankCardId = ref('')
const bankPhone = ref('')
const checkRule = ref(false)
const showPopover = ref(true)

const loginPhone = ref('')
let localPhone: string = localStorage.getItem('userinfo') + ''
loginPhone.value = JSON.parse(localPhone).mobile

const buttonSms = ref('发送验证码')
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

function clickBankSupport() {}
function clickAddNext() {
  showDialog.value = true
}
function clickConfirm() {
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
function confirmCode() {
  requestSms.verifySms('13520862956', code.value, result => {})
}
</script>
<style lang="less">
@import './bankcardadd.less';
</style>
