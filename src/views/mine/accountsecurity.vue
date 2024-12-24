<template>
  <div class="account-security-page">
    <VanNavBar
      title="账号与安全"
      safe-area-inset-top
      left-arrow
      @click-left="onClickLeft"
    ></VanNavBar>
    <div class="item-container">
      <div class="item-row" @click="clickUpdatePhone">
        <div class="item-text">登录手机号</div>
        <div class="item-row-right">
          <div class="item-row-right-text">{{}}</div>
          <VanIcon name="arrow" size="18" color="#c5cad5"></VanIcon>
        </div>
      </div>
      <VanDivider></VanDivider>
      <div class="item-row" @click="clickAuth">
        <div class="item-text">实名认证</div>
        <div class="item-row-right">
          <div class="item-row-right-text">{{}}</div>
          <VanIcon name="arrow" size="18" color="#c5cad5"></VanIcon>
        </div>
      </div>
    </div>
    <div class="item-container"></div>
    <div class="title-text">其他</div>
    <div class="item-row" @click="clickDeregister">
      <div class="item-text">账号注销</div>
      <VanIcon name="arrow" size="18" color="#c5cad5"></VanIcon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { userStore } from '@/stores'
const user = userStore()

const router = useRouter()
function onClickLeft() {
  router.back()
}
function clickUpdatePhone() {
  router.push('/mine/setting/updatephone')
}
function clickAuth() {
  router.push('/mine/setting/authentication')
}
function clickDeregister() {
  router.push('/mine/setting/deregister')
}
</script>
<style lang="less">
@import './accountsecurity.less';
</style>
