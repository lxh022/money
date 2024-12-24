<template>
  <div class="repayment-page">
    <VanNavBar
      title="还款计划"
      safe-area-inset-top
      left-arrow
      @click-left="onClickLeft"
    ></VanNavBar>
    <div class="container">
      <div class="top-container" v-if="orderInfo != undefined">
        <div class="top">
          <div class="order-container">
            <div class="order-title">
              借点米 借款{{ orderInfo.totalAmount }} | 共{{
                orderInfo.totalTerm
              }}期
            </div>
            <div class="order-info">
              <div class="order-surplus">
                剩余待还(共{{ orderInfo.totalTerm - orderInfo.termNo + 1 }}期)
              </div>
              <div class="arrow-container">
                <div class="order-money">
                  {{
                    formatNumber(
                      Number(orderInfo.totalAmount) -
                        Number(orderInfo.haveRepayAmount)
                    )
                  }}
                </div>
                <VanIcon
                  name="arrow"
                  size="20"
                  style="margin-right: 0.4rem"
                  @click="clickTermUserInfo"
                ></VanIcon>
              </div>
              <div :style="{ height: '0.5rem' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="bank-container">
        <div class="bank-text">还款账户</div>
        <div class="bank-right" @click="clickSelectBank">
          <VanImage
            lazy-load
            src="bankLogo"
            width="0.4rem"
            height="0.4rem"
          ></VanImage>
          <div class="bank-value">{{ bankName }}</div>
          <VanIcon name="arrow" size="18"></VanIcon>
        </div>
      </div>
      <div :style="{ height: '0.3rem' }"></div>
      <VanCheckboxGroup
        v-model="checkedResult"
        @change="checkedxResultChange"
        ref="checkAllBoxGroup"
      >
        <div
          class="item-check-container"
          v-for="(item, index) in planList"
          :key="item.termNo"
        >
          <VanCheckbox
            class="item-check"
            label-position="left"
            checked-color="#FF7D41"
            shape="square"
            :name="item"
          >
            <div class="item-row">
              <div class="item-no">{{ item.termNo }} 期</div>
              <div class="item-date">
                {{ formatDate(item.shouldRepayDate, '/') }}
              </div>
              <div class="item-total">{{ item.termAmount }}</div>
              <div class="item-status">未还</div>
            </div>
          </VanCheckbox>
          <VanDivider
            v-if="index != planList.length - 1"
            class="item-line"
            :style="{ borderColor: '#E2E4EA' }"
          ></VanDivider>
        </div>
      </VanCheckboxGroup>
    </div>
    <VanRow class="bottom-container">
      <div class="bottom-left">
        <VanCheckbox
          shape="square"
          v-model="checked"
          checked-color="#FF7D41"
          class="bottom-check"
          @click="clickSelectAll"
          >全选</VanCheckbox
        >
        <div class="bottom-total-text" v-if="total != 0">合计：</div>
        <div class="bottom-total" v-if="total != 0">
          {{ formatNumber(total) }}
        </div>
      </div>
      <VanButton type="primary" color="#FF7D41" @click="clickShowDialog"
        >确认还款</VanButton
      >
    </VanRow>
  </div>
  <VanPopup
    closeable
    v-model:show="showBankDialog"
    position="bottom"
    :style="{ height: '60%' }"
  >
    <div class="repayment-page-bank-dialog">
      <div class="bank-title">选择银行卡</div>
      <div class="bank-tip">
        <VanIcon name="warning-o" size="20" color="#FF7D41"></VanIcon>
        <div>还款日将从选择卡自动扣款，请保持余额充足</div>
      </div>
      <div
        class="bank-item"
        v-for="item in bankList"
        :key="item.bankCode"
        @click="selectBank(item)"
      >
        <VanImage icon-size="20" :src="item.bankLogo"></VanImage>
        <div :style="{ marginLeft: '0.4rem' }">{{ item.bankName }}</div>
      </div>
      <div class="bank-add" @click="clickAddBank">
        <VanIcon size="20" name="add-o" color="#FF7D41"></VanIcon>
        <div class="bank-add-text">添加银行卡</div>
        <VanIcon size="20" name="arrow" color="#FF7D41"></VanIcon>
      </div>
    </div>
  </VanPopup>
  <VanPopup
    closeable
    v-model:show="showRepaymentDialog"
    position="bottom"
    :style="{ height: '60%' }"
  >
    <div class="repayment-page-repayment-dialog">
      <div class="bank-info">
        <VanImage icon-size="30" :src="bankLogo"></VanImage>
        <div class="bank-text">{{ bankName }}</div>
      </div>
      <div class="bank-tip">
        <VanIcon name="warning-o" size="20" color="#FF7D41"></VanIcon>
        <div>
          为了不影响借款正常发放，需短信验证此卡可正常使用；如银行预留手机号已变更，请更换手机号。
        </div>
      </div>
      <VanField
        class="mobile-style"
        label="预留手机号"
        type="tel"
        maxlength="11"
        :min="11"
        placeholder="手机号"
        v-model="mobile"
      ></VanField>

      <div class="sms-container">
        <VanField
          class="sms-style"
          label="验证码"
          type="number"
          :min="6"
          :max="8"
          placeholder="请输入"
          v-model="smsCode"
        ></VanField>
        <VanButton
          class="sms-button"
          plain
          color="#ff7d41"
          @click="clickSendSMS"
        >
          {{ buttonSms }}
        </VanButton>
      </div>

      <div class="bottom">
        <VanButton
          class="submit-button"
          :round="true"
          color="#ff7d41"
          @click="confirmRepayment"
        >
          确定
        </VanButton>
      </div>
    </div>
  </VanPopup>
</template>
<script setup lang="ts">
import { formatDate, formatNumber } from '@/utils/libs.ts'
import repayment from '@/api/repayment'
import { PlanInfo } from './repayment'
import usebankstore from '@/stores/bankstore'
import userStore from '@/stores/modules/user'
import sms from '@/api/sms'
import { showToast } from 'vant'
import { BankInfo } from '../mine/bank'
const bankstore = usebankstore()
const userstore = userStore()
onMounted(() => {
  bankstore.initCards()
  console.log('init cards===', bankstore.cards)
})

const request = repayment()
const requestSms = sms()
const router = useRouter()
const route = useRoute()

const bankList = ref<Array<BankInfo>>()
const showBankDialog = ref(false)
const bankId = ref()
const bankLogo = ref()
const bankName = ref()

const checkAllBoxGroup = ref<any>(null)
const checkedResult = ref([])
const total = ref(0)

const orderInfo = ref()
const planList = ref<Array<PlanInfo>>([])
const checked = ref(false)
const selectPlan = ref<Array<any>>([])

const showRepaymentDialog = ref(false)
const countdown = ref(30)
const isCountingDown = ref(false)
const buttonSms = ref('发送验证码')
const mobile = ref('')
const smsCode = ref('')

request.getBankList(1, result => {
  console.log('getBankList=', result)
  bankList.value = result
  if (result.length == 0) {
    bankName.value = '请选择还款账户'
  } else {
    let bank: any = bankstore.getBankByName(result[0].bankName)
    // bankLogo.value = bank.bankLogo
    bankName.value =
      result[0].bankName +
      '(' +
      result[0].bankCardNo.slice(
        result[0].bankCardNo.length - 4,
        result[0].bankCardNo.length
      ) +
      ')'
    bankId.value = result[0].bankCardId
  }
})

request.getRepaymentDetailById('1', '2', result => {
  orderInfo.value = result.orderInfo
  planList.value = result.repayPlanList
})

function onClickLeft() {
  router.back()
}
function clickTermUserInfo() {
  router.push('/bill/termuserinfo')
}
function checkedxResultChange(value: any[]) {
  console.log(value)
  if (value.length == planList.value.length) {
    checked.value = true
  } else {
    checked.value = false
  }
  let selectTotal = 0
  value.forEach(bean => {
    selectTotal += Number(bean.termAmount)
  })
  selectPlan.value = value
  total.value = selectTotal
}
function clickSelectAll() {
  if (checked.value == false) {
    checkAllBoxGroup.value?.toggleAll()
  } else {
    checkAllBoxGroup.value?.toggleAll(true)
  }
}

function clickSelectBank() {
  showBankDialog.value = true
}
function selectBank(bean: any) {
  showBankDialog.value = false
  bankName.value =
    bean.bankName +
    '(' +
    bean.bankCardNo.slice(bean.bankCardNo.length - 4, bean.bankCardNo.length) +
    ')'
  bankId.value = bean.bankCardId
  bankLogo.value = bean.bankLogo
}
function clickAddBank() {
  console.log('click add bank')
}
function clickShowDialog() {
  if (selectPlan.value.length == 0) {
    showToast('请选择未还期数')
    return
  }
  if (bankId.value == undefined) {
    showToast('请选择还款账户')
    return
  }
  showRepaymentDialog.value = true
}
function clickSendSMS() {
  if (mobile.value == '') {
    showToast('请输入手机号')
    return
  }
  if (isCountingDown.value) return
  let timer: any
  requestSms.sendSms(mobile.value, result => {
    const tick = () => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
        isCountingDown.value = false
        buttonSms.value = '重新发送'
        countdown.value = 30 // 重置倒计时
      } else {
        buttonSms.value = countdown.value + 's'
        console.log('tick', buttonSms.value)
      }
    }
    timer = setInterval(tick, 1000)
  })
}
function confirmRepayment() {
  if (mobile.value == '') {
    showToast('请输入还款账户预留手机号')
    return
  }
  if (smsCode.value == '') {
    showToast('请输入验证码')
    return
  }
  const data = {
    userId: userstore.user.userId,
    bankCardId: bankId.value,
    totalAmount: total.value,
    repayType: '',
    mobileNo: '',
    smsCode: '',
  }
  if (selectPlan.value.length > 1) {
    data['repayType'] = 'PRE'
  } else {
    if (selectPlan.value[0].termNo == orderInfo.value.termNo) {
      data['repayType'] = 'DO'
    } else {
      data['repayType'] = 'PRE'
    }
  }
  request.applyRepayment(data, result => {
    router.push({ path: '/bill/repaymentsuccess', query: { id: result } })
  })
}
</script>
<style lang="less" scoped>
@import './repayment.less';
</style>
