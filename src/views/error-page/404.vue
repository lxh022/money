<template>
  <div class="error">
    <van-nav-bar title="404" left-arrow @click-left="onClickLeft" />
    <van-empty
      style="margin-top: 10vh"
      image="error"
      description="哎呀 ~ 出错啦"
    />
  </div>
</template>

<script setup>
const onClickLeft = () => history.back()
</script>
