<template>
  <div class="plan-page">
    <van-nav-bar title="还款计划" left-arrow @click-left="onClickLeft" />
    <div class="head">
      <span>借款金额（元）</span>
      <b>2,000.00</b>
    </div>
    <div class="content">
      <p class="title">还款计划</p>
      <van-row class="thead">
        <van-col span="7">还款期</van-col>
        <van-col span="9">还款日</van-col>
        <van-col span="8">还款金额</van-col>
      </van-row>
      <div class="list">
        <van-row>
          <van-col span="7">还款期</van-col>
          <van-col span="9">还款日</van-col>
          <van-col span="8">还款金额</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['back'])
const onClickLeft = () => {
  emit('back')
}
</script>

<style lang="less">
@import '../index.less';
</style>
