<template>
  <div class="land-footer">
    <p @click="clickHome">
      <img v-if="active == 1" src="@/assets/image/home-select.png" alt="" />
      <img v-else src="@/assets/image/home.png" alt="" />
      <span :class="active == 1 ? 'active' : ''">首页</span>
    </p>
    <p @click="clickMine">
      <img v-if="active == 2" src="@/assets/image/my-select.png" alt="" />
      <img v-else src="@/assets/image/my.png" alt="" />
      <span :class="active == 2 ? 'active' : ''">我的</span>
    </p>
  </div>
</template>

<script setup>
const props = defineProps(['active'])

const router = useRouter()
function clickHome() {
  router.push('/')
}
function clickMine() {
  router.push('mine')
}
</script>

<style lang="less" scoped>
.land-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.98rem;
  background: #ffffff;
  display: flex;
  p {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 0.48rem;
      height: 0.48rem;
      display: block;
      margin-bottom: 0.04rem;
    }
    span {
      font-size: 0.24rem;
      color: #666f83;
    }
    .active {
      color: #ff7f41;
    }
  }
}
</style>
