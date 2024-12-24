<template>
  <div class="repayment-success-page">
    <VanNavBar
      title="还款提交成功"
      safe-area-inset-top
      left-arrow
      @click-left="onClickLeft"
    ></VanNavBar>
    <div class="container">
      <div class="center">
        <VanImage width="1.28rem" height="1.28rem"></VanImage>
        <!-- <div
          :style="{
            width: '1.28rem',
            height: '1.28rem',
            backgroundColor: 'red',
          }"
        ></div> -->
        <div class="text">还款提交成功</div>
        <div class="desc">{{ route.query.id }}</div>
        <VanButton class="button" round type="primary" color="#ff7d41"
          >再来一笔</VanButton
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const router = useRouter()
function onClickLeft() {
  router.push('/')
}
</script>
<style lang="less">
@import './repaymentsuccess.less';
</style>
