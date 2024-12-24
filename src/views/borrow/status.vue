<template>
  <div class="status-page">
    <van-nav-bar title="相关协议" left-arrow @click-left="onClickLeft" />
    <div class="content"></div>
    <div class="footer">
      <p class="tips">
        点击我已阅读并同意，则表示同意<span
          >征信查询授权协议、个人借款合同、委托担保合同、自动还款及账户委托扣款授权书</span
        >
      </p>
      <van-button round size="small" type="primary"
        >我已阅读并同意以上协议</van-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const onClickLeft = () => router.replace('/')
</script>

<style lang="less">
@import './index.less';
</style>
