<template>
  <div class="mine-page">
    <VanNavBar title="我的" safe-area-inset-top></VanNavBar>
    <div class="container">
      <div class="user-container">
        <div class="user-info" @click="clickUserContainer">
          <img
              class="item-header"
              src="@/assets/image/avatar.png"
            ></img>
          <div class="user-name">{{ userName }}</div>
          <VanImage
            v-if="userVipStatus == 2"
            src=""
            width="0.4rem"
            height="0.2rem"
          ></VanImage>
        </div>
      </div>
      <div class="record-container">
        <div class="record-item-container" @click="clickLoadHistory">
          <div class="record-item">
            <img
              class="item-icon"
              src="@/assets/image/loan.png"
            ></img>
            <div class="item-text">借款记录</div>
          </div>
        </div>
        <VanDivider vertical :style="{ height: '0.38rem',borderColor:'#979797' }"></VanDivider>
        <div class="record-item-container" @click="clickRepaymentHistory">
          <div class="record-item">
            <img
              class="item-icon"
              src="@/assets/image/repayment.png"
            ></img>
            <div class="item-text">还款记录</div>
          </div>
        </div>
      </div>

      <div class="item-menu">
        <div class="item-row" @click="clickBankManager">
          <div class="item-text">银行卡管理</div>
          <VanIcon name="arrow" size="20" color="#C5CAD5"></VanIcon>
        </div>
        <div class="line"></div>
        <div class="item-row" @click="clickHelp">
          <div class="item-text">帮助中心</div>
          <VanIcon name="arrow" size="20" color="#C5CAD5"></VanIcon>
        </div>
        <div class="line"></div>
        <div class="item-row" @click="clickCSOnline">
          <div class="item-text" @click="clickCSOnline">在线客服</div>
          <VanIcon name="arrow" size="20" color="#C5CAD5"></VanIcon>
        </div>
        <div class="line"></div>
        <div class="item-row" @click="clickSetting">
          <div class="item-text">账户设置</div>
          <VanIcon name="arrow" size="20" color="#C5CAD5"></VanIcon>
        </div>
      </div>
    </div>
    <LandFooter active="2" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const userName = ref('')
if (isLogin()) {
  if (localStorage.getItem('userinfo') != '') {
    let mobile: string = localStorage.getItem('userinfo') + ''
    userName.value = JSON.parse(mobile).mobile
  }
} else {
  userName.value = '点击登录/注册'
}

const userVipStatus = ref(0)

const router = useRouter()
function clickLoadHistory() {
  router.push('/mine/loanhistory')
}
function clickRepaymentHistory() {
  router.push('/mine/repaymenthistory')
}
function clickBankManager() {
  router.push('/mine/bankcardmanager')
}
function clickHelp() {
  router.push('/bill')
}
function clickCSOnline() {
  router.push('/bill')
}
function clickSetting() {
  router.push('/mine/setting')
}
function clickUserContainer() {
  if (!isLogin()) {
    router.push('/login')
  }
}
function isLogin() {
  const token = localStorage.getItem('access_token')
  if (token == null || token == '') {
    return false
  } else {
    return true
  }
  return false
}
</script>
<style lang="less">
@import './mine.less';
</style>
