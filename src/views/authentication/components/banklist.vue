<template>
  <div class="authentication-bank-list-page">
    <van-nav-bar title="银行信息" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <div class="bank-item" v-for="item in banks" :key="item.bankNo">
        <span>
          <img :src="item.banLogo" alt="" />
          {{ item.bankName }}
        </span>
        <span>单笔限额20000元</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { bankList } from '@/api/authentication'
const banks = ref<SupportBankType[]>([])
const emit = defineEmits(['back'])

const onClickLeft = () => {
  emit('back')
}
const init = async () => {
  let list: any = await bankList()
  banks.value = list
}
onMounted(() => {
  init()
})
</script>

<style lang="less">
@import '../index.less';
</style>
