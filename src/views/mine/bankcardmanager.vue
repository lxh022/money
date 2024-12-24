<template>
  <div class="bank-card-manager-page">
    <VanNavBar
      title="银行卡管理"
      safe-area-inset-top
      left-arrow
      @click-left="onClickLeft"
    ></VanNavBar>
    <div class="container">
      <VanList
        class="item-bank"
        v-for="(item, index) in data"
        :style="getBankBgColor(item.bankName)"
      >
        <div class="item-bank-top">
          <div class="item-left">
            <VanImage
              :src="item.bankLogo"
              width="0.8rem"
              height="0.8rem"
            ></VanImage>
            <div class="bank-name">
              {{ item.bankName }}
              <div class="bank-type">
                {{ item.cardType == 1 ? '储蓄卡' : '信用卡' }}
              </div>
            </div>
          </div>
          <div class="item-right" @click="changeBankPhone(item)">
            更换预留手机号
          </div>
        </div>
        <div class="item-bank-card">
          <div class="item-bank-card-eye">
            <div class="item-bank-text">{{ item.bankCardId }}</div>
            <div :style="{ width: '0.3rem' }"></div>
            <VanIcon
              :name="item.isShow ? 'eye-o' : 'closed-eye'"
              :src="item.bankLogo"
              width="0.6rem"
              height="0.6rem"
              color="#ffffff"
              size="30"
              @click="clickEye(index)"
            ></VanIcon>
          </div>
        </div>
      </VanList>
      <VanButton
        class="add-button"
        type="primary"
        color="#FFFFFF"
        :hairline="false"
        @click="clickAddBank"
        >+ 添加银行</VanButton
      >
    </div>
    <VanPopup
      class="dialog-confirm-code"
      v-model:show="showConfirmDialog"
      closeable
      position="bottom"
      :style="{ height: '40%' }"
    >
      <div class="bank-info">
        <VanImage :src="''" width="0.5rem" height="0.5rem"></VanImage>
        <div class="bank-title">
          {{
            selectBank?.bankName +
            (selectBank?.cardType == 1 ? '借记卡' : '信用卡') +
            selectBank?.bankCardId
          }}
        </div>
      </div>
      <VanField
        v-model="selectPhone"
        label="预留手机号"
        maxlength="11"
      ></VanField>
      <div class="code-container">
        <VanField v-model="selectCode" label="验证码" maxlength="6"></VanField>
        <VanButton
          class="code-button"
          plain
          color="#FF7D41"
          @click="clickSendSMS"
          >{{ buttonSms }}</VanButton
        >
      </div>
      <VanButton
        class="confirm-button"
        round
        color="#FF7D41"
        @click="confirmChange"
        >确定</VanButton
      >
      <div class="rule-container">
        <VanCheckbox v-model="checkRule" checked-color="#FF7D41"
          >已阅读并同意
        </VanCheckbox>
        <div>《银行卡扣款授权书》</div>
      </div>
    </VanPopup>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { UserBankCard } from './bank'
import bank from '@/api/bank'
import sms from '@/api/sms'
import { showToast } from 'vant'
import { getBankBgColor } from '@/utils/libs'

const request = bank()
const requestSms = sms()

let timer: any
const showConfirmDialog = ref(false)
const buttonSms = ref('发送验证码')
const countdown = ref(60)
const isCountingDown = ref(false)
const selectBank = ref<UserBankCard>()
const selectPhone = ref('')
const selectCode = ref('')
const checkRule = ref(false)

const data = ref<Array<UserBankCard>>([])
const router = useRouter()
function onClickLeft() {
  router.back()
}
function clickAddBank() {
  router.push('/mine/bankcardadd')
  // data.value.push({
  //   id: 1,
  //   bankName: '招商银行',
  //   bankMobile: '13520862956',
  //   bankCardId: '4145  6465  ****  4564',
  //   bankLogo: '',
  //   cardType: 1,
  //   isShow: false,
  // })
}
function clickEye(index: number) {
  data.value[index].isShow = !data.value[index].isShow
}
function changeBankPhone(bean: UserBankCard) {
  selectBank.value = bean
  showConfirmDialog.value = true
}
function clickSendSMS() {
  if (selectPhone.value != '') {
    requestSms.sendSms(selectPhone.value, result => {
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
  } else {
    showToast('请输入手机号')
  }
}
function confirmChange() {
  if (selectPhone.value == '') {
    showToast('请输入手机号')
    return
  }
  if (selectCode.value == '') {
    showToast('请输入验证码')
    return
  }
  if (checkRule.value == false) {
    showToast('请阅读并同意授权书')
    return
  }
  request.changeBankPhone(selectPhone.value, selectCode.value, result => {
    showConfirmDialog.value = false
  })
}
</script>
<style lang="less" scoped>
@import './bankcardmanager.less';
</style>
