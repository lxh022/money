<template>
  <div class="repayment-detail-page">
    <VanNavBar
      title="还款记录"
      safe-area-inset-top
      left-arrow
      @click-left="onClickLeft"
    ></VanNavBar>
    <div class="container" v-if="detail != undefined">
      <div class="term-title">还款{{ detail.outOrderNo }}</div>
      <div class="detail-content">
        <div class="term-basic">还款记录</div>
        <div class="line"></div>
        <div style="height: 0.15rem"></div>
        <div class="item-row">
          <div class="term-text">还款状态</div>
          <div class="term-text-main">还款成功</div>
        </div>
        <div class="item-row">
          <div class="term-text">还款类型</div>
          <div class="term-text-main">主动还款</div>
        </div>
        <div class="item-row">
          <div class="term-text">还款金额</div>
          <div class="term-text-main">{{ detail.amount }}</div>
        </div>
        <div class="item-row">
          <div class="term-text">银行卡号</div>
          <div class="term-text-main">
            ************{{
              detail.bankCardId.substring(
                detail.bankCardId.length - 4,
                detail.bankCardId.length
              ) +
              '(' +
              detail.bankName +
              ')'
            }}
          </div>
        </div>
        <div class="item-row">
          <div class="term-text">还款流水号</div>
          <div class="term-text-main">
            {{ detail.outOrderNo }}
          </div>
        </div>
        <div class="item-row">
          <div class="term-text">借据号</div>
          <div class="term-text-main">
            {{ detail.orderNo }}
          </div>
        </div>
        <div class="item-row">
          <div class="term-text">还款日期</div>
          <div class="term-text-main">
            {{ detail.payDate }}
          </div>
        </div>
        <div style="height: 0.15rem"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import history from '@/api/history'
import { RepaymentDetail } from './repayment'
const request = history()
const route = useRoute()
const detail = ref<RepaymentDetail>()
const id = route.query.id + ''
if (route.query.id != '') {
  request.getRepaymentDetail(id, result => {
    detail.value = result
  })
}
const router = useRouter()
function onClickLeft() {
  router.back()
}
</script>
<style lang="less" scoped>
@import './repaymentdetail.less';
</style>
