<template>
  <div class="home-page">
    <div class="content">
      <div class="logo"><img src="@/assets/image/logo.png" alt="" /></div>
      <div class="account">
        <div
          class="account-content"
          v-if="
            quotaData?.status == 1 ||
            quotaData?.status == 4 ||
            !quotaData?.status
          "
        >
          <p class="txt">最高可借（元）</p>
          <div class="price">
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <b>200,000</b>
          </div>
          <div class="bonus">
            <p><img src="@/assets/image/quota.png" alt="" />额度大</p>
            <p><img src="@/assets/image/interest.png" alt="" />利息低</p>
            <p><img src="@/assets/image/collect.png" alt="" />到账快</p>
          </div>
          <van-button type="primary" @click="toBorrow">立即借款</van-button>
        </div>
        <div class="account-content" v-if="quotaData?.status == 5">
          <p class="txt">最高可借（元）</p>
          <div class="price">
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <b>{{ formatNumber(quotaData?.availableLimit) }}</b>
          </div>
          <van-button type="primary" @click="toBorrow">立即借款</van-button>
          <div class="borrow">
            <p>
              <b>近七日待还</b>
              <span>{{ quotaData.weekRepayment }}</span>
            </p>
            <p>
              <b>总额度</b>
              <span class="active">{{ quotaData?.totalLimit }}</span>
            </p>
          </div>
        </div>
        <div class="link-check" v-if="quotaData?.status == 5">
          查看账单 <van-icon name="arrow" @click="toBill" />
        </div>
        <div class="examine" v-if="quotaData?.status == 2">
          <img src="@/assets/image/wait.png" alt="" />
          <h3>额度正在审批中</h3>
          <span>敬请期待</span>
          <van-button type="primary" @click="toBorrow">查看审批进度</van-button>
        </div>
        <div class="examine" v-if="quotaData?.status == 6">
          <img src="@/assets/image/wait.png" alt="" />
          <h3>额度变更中</h3>
          <span>暂时不能进行额度支用</span>
        </div>
        <div class="examine" v-if="quotaData?.status == 3">
          <img src="@/assets/image/error.png" alt="" />
          <h3>额度申请未通过</h3>
          <span>查看原因</span>
          <van-button type="primary" @click="toBorrow">查看审批进度</van-button>
        </div>
        <div class="examine" v-if="false">
          <img src="@/assets/image/error.png" alt="" />
          <h3>额度获取失败</h3>
          <span>请刷新重试</span>
          <van-button type="primary" @click="toBorrow">立即刷新</van-button>
        </div>
        <div
          class="tips"
          v-if="
            quotaData?.status !== 2 &&
            quotaData?.status !== 3 &&
            quotaData?.status !== 6
          "
        >
          <img src="@/assets/image/secure.png" alt="" />
          <span>账户保障中</span>
        </div>
      </div>
      <van-swipe class="swipe" :autoplay="10000" indicator-color="#999C9F">
        <van-swipe-item>
          <img src="@/assets/image/banner.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/image/banner.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/image/banner.png" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="understand">
      <p class="title">了解我们</p>
      <div class="brand">
        <div class="head">
          <p>
            <b>借点米</b>
            <span>提供更安全、更专业的多场景的贷款推荐服务</span>
          </p>
          <span>品牌故事<van-icon name="arrow" /></span>
        </div>
        <div class="advantage">
          <p>
            <img src="@/assets/image/secure2.png" alt="" />
            <b>大平台有保障</b>
            <span>信赖源于实力为您带来全方<br />位的保障</span>
          </p>
          <p>
            <img src="@/assets/image/service.png" alt="" />
            <b>用心为您服务</b>
            <span>是我们对品质的坚守和您信<br />任的回报</span>
          </p>
        </div>
      </div>
    </div>
    <LandFooter active="1" />
  </div>
</template>

<script setup lang="ts">
import LandFooter from '@/components/land-footer/index.vue'
import { homeData } from '@/api/home'
import { formatNumber } from '@/utils/libs'
import { showToast } from 'vant'

const router = useRouter()
const quotaData = ref<QuotaType>()

const toBorrow = () => {
  if (quotaData.value?.status == 1) {
    router.push('authentication')
  } else if (quotaData.value?.status == 2 || quotaData.value?.status == 3) {
    showToast('额度审批进度')
  } else if (quotaData.value?.status == 4) {
    showToast('额度被冻结')
  } else if (quotaData.value?.status == 5) {
    router.push('borrow')
  } else {
    showToast('数据错误，请刷新重试~')
  }
}
const toBill = () => {
  router.push('/bill')
}
const init = async () => {
  const res: any = await homeData({})
  quotaData.value = res
}
onMounted(() => {
  init()
})
</script>

<style lang="less">
@import './index.less';
</style>
