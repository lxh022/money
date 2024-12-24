<template>
  <div class="borrow-page">
    <van-nav-bar title="借款" left-arrow @click-left="onClickLeft" />
    <div class="content" v-if="borrowData">
      <div class="form">
        <div class="price">
          <label>￥</label>
          <van-field v-model="loanAmount" type="number" :min="0" />
          <van-button
            round
            size="small"
            @click="loanAmount = borrowData.maxLoanAmount"
            >全部借出</van-button
          >
        </div>
        <div class="form-item">
          <label>借多久</label>
          <p>
            <span
              v-for="(v, i) in borrowData?.termRateList"
              :key="i"
              :class="v.term == totalTerm ? 'active' : ''"
              @click="selectTerm(v.term)"
              >{{ v.term }}</span
            >
          </p>
        </div>
        <div class="form-item">
          <label>怎么还</label>
          <p @click="showPicker = true">
            {{ wayName }}<van-icon name="arrow" />
          </p>
        </div>
        <div class="form-item">
          <label>还款计划</label>
          <p @click="toPlan">首期1月19日应还￥94.34<van-icon name="arrow" /></p>
        </div>
        <div class="form-item">
          <label>收款账户</label>
          <p @click="backShow = true">
            {{ bankName }}<van-icon name="arrow" />
          </p>
        </div>
        <div class="form-item">
          <label>借款用途</label>
          <p @click="show = true">{{ useName }}<van-icon name="arrow" /></p>
        </div>
      </div>
      <van-button class="footer" type="primary" @click="applyFor"
        >立即申请</van-button
      >
    </div>

    <van-action-sheet v-model:show="show" title="选择借款用途" closeable>
      <div class="borrow-msheet-content">
        <p class="tips">
          <van-icon
            name="warning"
          />严禁用于股票、期货、理财和房地产市场及其他国家法律法规、监管规定禁止的用途。
        </p>
        <div class="list">
          <p v-for="item in useList" :key="item.value" @click="selectUse(item)">
            <span>{{ item.label }}</span>
            <van-icon v-if="use == item.value" name="success" color="#FF5C0D" />
          </p>
        </div>
      </div>
    </van-action-sheet>
    <van-action-sheet v-model:show="backShow" title="选择银行卡">
      <div class="agreement-msheet-content">
        <p class="tips">
          <van-icon
            name="warning"
          />为了不影响借款正常发放，需短信验证此卡可正常使用；如银行预留手机号已变更，请更换手机号。
        </p>
        <div class="list">
          <p
            class="bank"
            v-for="(item, index) in borrowData?.bankCardkList"
            :key="index"
            @click="selectBank(item)"
          >
            <img src="" alt="" />{{ item.bankName }}
          </p>
          <p class="add">
            <van-icon name="add-o" />添加银行卡<van-icon name="arrow" />
          </p>
        </div>
      </div>
    </van-action-sheet>

    <van-popup
      v-model:show="showPicker"
      destroy-on-close
      round
      position="bottom"
    >
      <van-picker
        :model-value="wayValue"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>

    <van-popup
      v-model:show="agrShow"
      position="right"
      duration="0.2"
      :style="{ width: '100vw' }"
    >
      <Agreement v-if="agrValue == 1" @back="agrShow = false" />
      <Plan v-if="agrValue == 2" @back="agrShow = false" />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { showToast } from 'vant'
import Agreement from './components/agreement.vue'
import Plan from './components/plan.vue'
import { queryParams, loanTrial } from '@/api/borrow'
const router = useRouter()
const useList = [
  {
    label: '装修',
    value: 0,
  },
  {
    label: '家电',
    value: 1,
  },
  {
    label: '婚庆',
    value: 2,
  },
  {
    label: '助学',
    value: 3,
  },
  {
    label: '旅游',
    value: 4,
  },
  {
    label: '医疗',
    value: 5,
  },
]
const columns = [
  {
    text: '等本等息',
    value: '0',
  },
  {
    text: '等额本⾦',
    value: 1,
  },
  {
    text: '等额本息',
    value: 2,
  },
  {
    text: '一次性还本付息',
    value: 3,
  },
]
const borrowData = ref<BorrowType | null>(null)
const data = reactive<any>({
  loanAmount: 0,
  agrValue: 1,
  totalTerm: null,
  show: false,
  showPicker: false,
  backShow: false,
  agrShow: false,
  wayName: '',
  wayValue: [],
  use: null,
  useName: '',
  bankValue: null,
  bankName: '',
})
const {
  loanAmount,
  agrValue,
  totalTerm,
  show,
  showPicker,
  backShow,
  agrShow,
  wayName,
  wayValue,
  use,
  useName,
  bankName,
} = toRefs(data)

const onClickLeft = () => {
  router.back()
}
const selectTerm = async (v: number) => {
  data.totalTerm = v
  let list = await loanTrial({
    loanAmount: data.loanAmount,
    termNum: v,
  })
  console.log(list)
}
// 借款用途
const selectUse = (item: any) => {
  data.use = item.value
  data.useName = item.label
  data.show = false
}
// 还款计划
const toPlan = () => {
  data.agrValue = 2
  data.agrShow = true
}
// 还款方式
const onConfirm = ({ selectedValues, selectedOptions }: any) => {
  data.showPicker = false
  data.wayValue = selectedValues
  data.wayName = selectedOptions[0].text
}
const selectBank = (item: any) => {
  data.bankValue = item.bankNo
  data.bankName = item.bankName
  data.backShow = false
}
// 立即申请
const applyFor = () => {
  console.log(data)
  if (data.loanAmount == 0) {
    showToast('请输入借款金额')
  } else if (!data.totalTerm) {
    showToast('请输入借款期数')
  } else if (!data.wayValue[0]) {
    showToast('请选择还款方式')
  } else if (!data.bankValue) {
    showToast('请选择收款账户')
  } else if (!data.use) {
    showToast('请选择借款用途')
  } else {
    data.agrValue = 1
    data.agrShow = true
  }
}

const init = async () => {
  let res: any = await queryParams()
  borrowData.value = res
}
onMounted(() => {
  init()
})
</script>

<style lang="less">
@import './index.less';
</style>
