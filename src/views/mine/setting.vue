<template>
  <div class="setting-page">
    <VanNavBar
      title="设置"
      safe-area-inset-top
      left-arrow
      @click-left="onClickLeft"
    ></VanNavBar>
    <div class="page-container">
      <div class="title-text">账号管理</div>
      <div class="item-container">
        <div class="item-row" @click="clickAccountSecurity">
          <div class="item-text">账号与安全</div>
          <VanIcon name="arrow" size="18" color="#c5cad5"></VanIcon>
        </div>
      </div>
      <!-- <div class="title-text">隐私管理</div>
      <div class="item-container">
        <div class="item-row">
          <div class="item-text">权限管理</div>
          <VanIcon name="arrow" size="18" color="#c5cad5"></VanIcon>
        </div>
        <VanDivider></VanDivider>
        <div class="item-row">
          <div class="item-text">消息通知</div>
          <div class="item-row-right">
            <div class="item-row-right-text">未开启</div>
            <VanIcon name="arrow" size="18" color="#c5cad5"></VanIcon>
          </div>
        </div>
        <VanDivider></VanDivider>
        <div class="item-row">
          <div class="item-text">定向推送</div>
          <div class="item-row-right">
            <div class="item-row-right-text">已开启</div>
            <VanIcon name="arrow" size="18" color="#c5cad5"></VanIcon>
          </div>
        </div>
      </div> -->
      <div class="title-text">隐私说明</div>
      <div class="item-container">
        <div class="item-row">
          <div class="item-text">第三方共享信息清单</div>
          <VanIcon name="arrow" size="18" color="#c5cad5"></VanIcon>
        </div>
        <VanDivider></VanDivider>
        <div class="item-row">
          <div class="item-text">个人信息收集清单</div>
          <VanIcon name="arrow" size="18" color="#c5cad5"></VanIcon>
        </div>
      </div>
      <VanButton
        class="quit"
        type="primary"
        color="#FF7d41"
        round
        @click="clickQuit"
        >退出登录</VanButton
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import mine from '@/api/mine'
import { showConfirmDialog } from 'vant'
const request = mine()
const router = useRouter()
function onClickLeft() {
  router.back()
}
function clickAccountSecurity() {
  router.push('/mine/setting/accountsecurity')
}
function clickQuit() {
  showConfirmDialog({
    title: '退出登录',
    confirmButtonColor: '#ff7d41',
    message: '是否退出登录?',
  }).then(() => {
    request.quitLogin(result => {
      localStorage.removeItem('access_token')
      router.push('/mine')
    })
  })
}
</script>
<style lang="less">
@import './setting.less';
</style>
