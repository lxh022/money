<template>
  <div class="loan-history-page">
    <VanNavBar
      title="借款记录"
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
        >
          <div class="item-loan">
            <div class="item-row-top">
              <div class="loan-date-text">
                借款日期{{ formatDate(item.loanDate, 'ch') }}
              </div>
              <div
                class="loan-status"
                :style="{ color: item.status == 2 ? '#FF7D41' : '#41485D' }"
              >
                {{ item.status }}
              </div>
            </div>
            <VanDivider
              class="line"
              :style="{ borderColor: '#E1E4EB' }"
            ></VanDivider>
            <div :style="{ height: '0.15rem' }"></div>
            <div class="item-row">
              <div class="item-left">借款金额</div>
              <div class="item-right">
                {{ formatNumber(Number(item.amount)) }}元
              </div>
            </div>
            <div class="item-row">
              <div class="item-left">分期期数</div>
              <div class="item-right">{{ item.totalTerms }}期</div>
            </div>
            <div :style="{ height: '0.23rem' }"></div>
          </div>
          <div :style="{ height: '0.2rem' }"></div>
        </div>
      </VanList>
    </VanPullRefresh>

    <div
      v-if="dataList.length == 0 && loading == false"
      class="empty-container"
    >
      <div class="empty-top">
        <div class="top-text">今日可享（元）</div>
        <div class="top-main-container">
          最高额度&nbsp;&nbsp;
          <div class="top-main">200,000.00</div>
        </div>
        <div class="top-button-container">
          <VanButton class="top-button" type="primary" color="#FF7D41"
            >去借一笔</VanButton
          >
        </div>
      </div>
      <div class="empty-info">
        <VanEmpty
          v-if="dataList.length == 0"
          description="暂无借款记录"
          image-size="0"
        ></VanEmpty>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import history from '@/api/history'
import { LoanItems } from './loanhistory'
import { formatDate, formatNumber } from '@/utils/libs'
const request = history()
const currentPageIndex = ref(1)

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
  { text: '审核中', value: 1 },
  { text: '已逾期', value: 2 },
  { text: '还款中', value: 3 },
  { text: '放款失败', value: 4 },
  { text: '已结清', value: 5 },
]

const dataList = ref<LoanItems>([]) //全部数据
const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)

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
    refreshing.value = false
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
  request.getLoanHistory(page, result => {
    if (page == 1) {
      refreshing.value = false
      // dataList.value = result
    } else {
      loading.value = false
      // dataList.value.concat(result)
    }
    finished.value = true
  })
}
</script>

<style lang="less">
@import './loanhistory.less';
</style>
