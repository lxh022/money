<template>
  <div class="authentication-bank-page">
    <van-nav-bar title="绑定银行卡" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <div class="progress">
        <p>
          <img src="@/assets/image/secure2.png" alt="" />
          已完成60%
        </p>
        <van-progress
          :showPivot="false"
          color="#FF7D41"
          stroke-width="3"
          :percentage="60"
        />
      </div>
      <div class="bank" v-if="!passShow">
        <p class="card">
          <span>该储蓄卡用于收还款</span>
          <span class="highlight" @click="bankShow = true">支持银行</span>
        </p>
        <div class="bank-form">
          <van-field
            label="持卡人"
            v-model="form.name"
            placeholder="请输入"
            autocomplete="off"
          />
          <van-field
            label="预留手机号"
            v-model="form.reserveMobileNo"
            placeholder="请输入"
            autocomplete="off"
          />
          <van-field
            label="储蓄卡号"
            v-model="form.bankCardNo"
            right-icon="debit-pay"
            placeholder="请输入预留手机号绑定卡号"
            autocomplete="off"
          />
          <van-field
            label="所属银行"
            :model-value="bankName"
            right-icon="arrow"
            placeholder="请选择"
            autocomplete="off"
            readonly
            @click="backShow = true"
          />
        </div>
        <div class="check">
          <van-checkbox v-model="checked" checked-color="#FF7D41"
            >同意<span>绑卡相关协议</span></van-checkbox
          >
        </div>
        <div class="step">
          <van-button type="primary" @click="step">下一步</van-button>
        </div>
      </div>

      <div class="pass" v-else>
        <p class="tips">为了您的安全请设置6位数字密码</p>
        <van-password-input
          :value="password"
          :focused="showKeyPass"
          @focus="showKeyPass = true"
        />
        <van-number-keyboard
          style="z-index: 99999"
          :maxlength="6"
          :show="showKeyPass"
          v-model="password"
          @blur="showKeyPass = false"
        />
        <div class="step">
          <van-button type="primary" @click="configPass">设置</van-button>
        </div>
      </div>

      <p class="promise">借点米承诺确保您的信息安全</p>
    </div>

    <van-action-sheet v-model:show="backShow" title="选择银行">
      <div class="authentication-bank-sheet-content">
        <div class="list">
          <p
            class="bank"
            v-for="(item, index) in banks"
            :key="index"
            @click="selectBank(item)"
          >
            <span><img :src="item.banLogo" alt="" />{{ item.bankName }}</span>
            <van-icon
              v-if="form.bankCardType == index + 1"
              name="success"
              color="#FF5C0D"
            />
          </p>
        </div>
      </div>
    </van-action-sheet>

    <van-dialog v-model:show="codeShow" :showConfirmButton="false">
      <div class="phone-code-dialog">
        <van-icon
          class="close"
          color="#858B9C"
          name="cross"
          @click="codeShow = false"
        />
        <h3>请输入验证码</h3>
        <p class="phone">已发送验证码到 18888888888</p>
        <van-password-input
          :mask="false"
          :value="phoneCode"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
        <p class="txt" v-if="!isCounting">
          {{ `${countdown}秒后重新发送` }}
        </p>
        <p class="txt" v-else @click="readSendCode">重新发送</p>
      </div>
    </van-dialog>
    <van-number-keyboard
      style="z-index: 99999"
      :show="showKeyboard"
      v-model="phoneCode"
      theme="custom"
      :maxlength="6"
      :hide-on-click-outside="false"
      extra-key="0"
      close-button-text="完成"
      @blur="confirmBind"
    />
    <van-action-sheet v-model:show="show" title="请阅读一下协议">
      <div class="read-action-content">
        <div class="agreement"></div>
        <p class="tips">
          <span>点击我已阅读并同意，则表示同意</span>
          <b>证信查询授权协议、电子签名授权书、个人信息授权书</b>
        </p>
        <van-button type="primary" @click="readSendCode"
          >我已阅读并同意以上协议</van-button
        >
      </div>
    </van-action-sheet>
    <van-popup
      v-model:show="bankShow"
      position="right"
      duration="0.2"
      :style="{ width: '100vw' }"
    >
      <BankList @back="bankShow = false" />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { bankList, bindBankCard, setPaypwd } from '@/api/authentication'
import { showToast } from 'vant'
import BankList from './components/banklist.vue'

const router = useRouter()
const data = reactive({
  show: false, // 协议弹窗
  showKeyboard: false, // 数字键盘
  checked: false, // 是否勾选协议
  backShow: false, // 选择银行
  bankShow: false, // 支持银行
  codeShow: false, // 验证码弹窗
  passShow: false, // 设置密码
  isCounting: false, // 是否在倒计时中
  showKeyPass: false, // 密码键盘
  countdown: 60, // 倒计时的初始值
  phoneCode: '', // 验证码
  bankName: '', // 所属银行名字
})
const {
  show,
  showKeyboard,
  checked,
  backShow,
  bankShow,
  passShow,
  codeShow,
  showKeyPass,
  isCounting,
  countdown,
  phoneCode,
  bankName,
} = toRefs(data)
const banks = ref<SupportBankType[]>([])
const form = ref<any>({
  name: '',
  reserveMobileNo: '',
  bankCardType: 1,
  bankCardNo: '',
})
const password = ref('')

const onClickLeft = () => {
  router.back()
}
const confirmBind = async () => {
  data.showKeyboard = false
  let oJson = {
    ...form.value,
  }
  await bindBankCard(oJson)
  data.show = false
  data.codeShow = false
  data.passShow = true
}
const selectBank = (item: SupportBankType) => {
  // form.value.bankCardType = item.type
  // form.value.bankCardType = 1
  data.bankName = item.bankName
  data.backShow = false
}
const readSendCode = () => {
  data.codeShow = true
  const interval = setInterval(() => {
    data.countdown -= 1
    if (data.countdown <= 0) {
      clearInterval(interval) // 清除定时器
      data.isCounting = false
      data.countdown = 60 // 重置倒计时
    }
  }, 1000)
}
const step = () => {
  if (!form.value.name) {
    showToast('请输入持卡人姓名')
  } else if (!form.value.reserveMobileNo) {
    showToast('请输入银行预留手机号')
  } else if (!form.value.bankCardNo) {
    showToast('请输入银行卡号')
  } else if (!form.value.bankCardType) {
    showToast('请选择所属银行')
  } else if (!data.checked) {
    showToast('请勾选同意绑卡协议')
  } else {
    data.show = true
  }
}
const configPass = async () => {
  if (password.value.length < 6) {
    showToast('密码输入有误')
  } else {
    await setPaypwd(password.value)
    router.push('/userinfo')
  }
}
const init = async () => {
  let list: any = await bankList()
  banks.value = list
}
onMounted(() => {
  init()
})
</script>

<style lang="less">
@import './index.less';
</style>
