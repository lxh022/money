<template>
  <div class="bill-page">
    <VanNavBar
      title="我的账单"
      safe-area-inset-top
      left-arrow
      @click-left="onClickLeft"
    ></VanNavBar>
    <VanTabs
      v-model:active="currentTabIndex"
      color="#ff7d41"
      line-width="2.92rem"
      line-height="0.04rem"
      title-active-color="#ff7d41"
      @click-tab="onClickTab"
    >
      <VanTab class="tab-title" title="本期应还"></VanTab>
      <VanTab class="tab-title" title="全部借款"></VanTab>
    </VanTabs>
    <div
      v-if="
        (currentTabIndex == 0 && singleList.length != 0) ||
        (currentTabIndex == 1 && allList.length != 0)
      "
      class="container"
    >
      <VanPullRefresh class="refresh" v-model="refreshing" @refresh="onRefresh">
        <VanList
          v-if="currentTabIndex == 0 && singleList.length > 0"
          v-model:loading="loading"
          :finished="finished"
          finished-text=""
          @load="onLoad"
        >
          <VanCol
            class="item-container"
            v-for="item in singleList"
            :key="item.orderNo"
          >
            <VanRow class="item-title"
              >借点米 借款{{ item.totalAmount }} | 共{{
                item.totalTerm
              }}期</VanRow
            >
            <VanDivider
              class="item-line"
              :style="{ borderColor: '#E6E6E6' }"
            ></VanDivider>
            <VanRow class="item-info">
              <VanCol>
                <VanRow class="item-content top">本期待还(元)</VanRow>
                <VanRow class="item-content middle">{{
                  formatNumber(Number(item.termPrincipal))
                }}</VanRow>
                <VanRow class="item-content bottom"
                  >还款日 {{ formatDate(item.shouldRepayDate, '/') }}</VanRow
                >
              </VanCol>
              <VanButton
                class="button-padding"
                size="small"
                type="primary"
                color="#ff7d41"
                @click="clickRepayment(item)"
                >去还款</VanButton
              >
            </VanRow>
          </VanCol>
        </VanList>

        <VanList
          v-if="currentTabIndex == 1"
          v-model:loading="loading"
          :finished="finished"
          finished-text=""
          @load="onLoad"
        >
          <VanCol
            class="item-container"
            v-for="item in allList"
            :key="item.orderNo"
          >
            <VanRow class="item-title"
              >借点米 借款{{ item.totalAmount }} | 共{{
                item.totalTerm
              }}期</VanRow
            >
            <VanDivider
              class="item-line"
              :style="{ borderColor: '#E6E6E6' }"
            ></VanDivider>
            <VanRow class="item-info">
              <VanCol>
                <VanRow class="item-content top">剩余待还(元)</VanRow>
                <VanRow class="item-content middle">{{
                  formatNumber(item.surplus)
                }}</VanRow>
                <VanRow class="item-content bottom"
                  >申请日 {{ formatDate(item.loanDate, '/') }}</VanRow
                >
              </VanCol>
              <VanRow class="item-right-arrow" @click="clickRepayment(item)"
                >还款中
                <VanIcon name="arrow" size="0.3rem" color="#858b9c"></VanIcon>
              </VanRow>
            </VanRow>
          </VanCol>
        </VanList>
      </VanPullRefresh>
      <div class="bottom-container" v-if="currentTabIndex == 1">
        <div class="bottom-container-text">
          仅支持近期历史订单，如需查询更多，请联系客服
        </div>
      </div>
    </div>
    <div v-else class="empty-container">
      <VanEmpty
        v-if="singleList.length == 0"
        description="暂无数据"
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        image-size="80"
      ></VanEmpty>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import bill from '@/api/bill'
import { ItemBillEverys, ItemBillTotals } from './minebill'
import { formatDate, formatNumber } from '@/utils/libs.ts'

const request = bill()
const currentTabIndex = ref(0)
const currentPageIndex = ref(0)

const singleList = ref<ItemBillEverys>([]) //每期数据
const allList = ref<ItemBillTotals>([]) //全部数据
const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)
const router = useRouter()

function onClickLeft() {
  router.back()
}
function onClickTab(e: any) {
  currentTabIndex.value = e.name
  currentPageIndex.value = 0
  initDataWithPoiston(e.name, currentPageIndex.value)
}

function initDataWithPoiston(postion: number, pageIndex: number) {
  if (postion == 0) {
    request.getBillEveryList(result => {
      singleList.value = result
      console.log('本期应还：', result)
      loading.value = false
      finished.value = true
    })
  } else {
    request.getBillAllList(result => {
      console.log('全部借款：', result)
      allList.value = result
      console.log(result)
      loading.value = false
      finished.value = true
    })
  }
}

function onRefresh() {
  finished.value = false
  loading.value = true
  currentPageIndex.value = 0
  onLoad()
}
function onLoad() {
  currentPageIndex.value += 1
  if (refreshing.value) {
    singleList.value = []
    allList.value = []
    refreshing.value = false
    setTimeout(() => {
      initDataWithPoiston(currentTabIndex.value, currentPageIndex.value)
    }, 1000)
  } else {
    initDataWithPoiston(currentTabIndex.value, currentPageIndex.value)
  }
}

function clickRepayment(bean: any) {
  console.log('click', bean)
  router.push({
    path: '/bill/repayment',
    query: { orderNo: bean.orderNo, outOrderNo: bean.outOrderNo },
  })
}
</script>
<style lang="less">
@import './minebill.less';
</style>
