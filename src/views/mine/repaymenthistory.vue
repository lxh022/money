<template>
  <div class="repayment-history-page">
    <VanNavBar
      title="还款记录"
      safe-area-inset-top
      left-arrow
      @click-left="onClickLeft"
    ></VanNavBar>
    <VanDropdownMenu>
      <VanDropdownItem
        v-model="fiterDateValue"
        :options="fiterDateOptions"
      ></VanDropdownItem>
      <VanDropdownItem
        v-model="fiterStatusValue"
        :options="fiterStatusOptions"
      ></VanDropdownItem>
    </VanDropdownMenu>
    <VanPullRefresh
      v-if="dataList.length > 0"
      class="refresh"
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <VanList
        v-model:loading="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
        <div
          class="item-container"
          v-for="(item, index) in dataList"
          :key="index"
          @click="clickDetail(item)"
        >
          <div class="item-repayment-top">
            <div class="item-row-top">
              <div class="repayment-date-text">
                {{ item.repaymentDate }}
              </div>
              <div class="repayment-status">{{ item.status }}</div>
            </div>
            <VanDivider
              class="line"
              :style="{ borderColor: '#E1E4EB' }"
            ></VanDivider>
            <div :style="{ height: '0.15rem' }"></div>
            <div class="item-row">
              <div class="item-left">还款类型</div>
              <div class="item-right">主动还款</div>
            </div>
            <div class="item-row">
              <div class="item-left">还款金额</div>
              <div class="item-right">
                {{ formatNumber(Number(item.amount)) }}
              </div>
            </div>
            <div class="item-row">
              <div class="item-left">银行卡号</div>
              <div class="item-right">
                {{ item.bankCardId + '(' + item.bankName + ')' }}
              </div>
            </div>
            <div :style="{ height: '0.23rem' }"></div>
          </div>
          <div :style="{ height: '0.2rem' }"></div>
        </div>
      </VanList>
    </VanPullRefresh>
    <div v-else class="empty-container">
      <VanEmpty
        v-if="dataList.length == 0"
        description="暂无还款记录"
        image-size="0"
      ></VanEmpty>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import history from '@/api/history'
import { RepaymentItem, RepaymentItems } from './repayment'
import { formatNumber } from '@/utils/libs'

const dataList = ref<RepaymentItems>([]) //全部数据
const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)
const request = history()

const fiterStatusValue = ref(0)
const fiterDateValue = ref(0)
const fiterDateOptions = [
  { text: '全部', value: 0 },
  { text: '近三月', value: 1 },
  { text: '近半年', value: 2 },
  { text: '近一年', value: 2 },
]
const fiterStatusOptions = [
  { text: '全部', value: 0 },
  { text: '还款中', value: 1 },
  { text: '还款失败', value: 2 },
  { text: '还款成功', value: 1 },
]

const currentPageIndex = ref(1)
initData(currentPageIndex.value)

const router = useRouter()
function onClickLeft() {
  router.back()
}

function onRefresh() {
  finished.value = true
  onLoad()
}
function onLoad() {
  if (refreshing.value) {
    setTimeout(() => {
      initData(currentPageIndex.value)
    }, 1000)
  } else {
    loading.value = true
    currentPageIndex.value += 1
    initData(currentPageIndex.value)
  }
}

function initData(page: number) {
  request.getRepaymentHistory(page, result => {
    if (page == 1) {
      refreshing.value = false
      dataList.value = result
    } else {
      loading.value = false
      dataList.value.concat(result)
    }
    finished.value = true
  })
}

function clickDetail(bean: RepaymentItem) {
  router.push({ path: '/mine/repaymentdetail', query: { orderNo: bean.id } })
}
</script>
<style lang="less">
@import './repaymenthistory.less';
</style>
