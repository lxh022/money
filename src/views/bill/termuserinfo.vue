<template>
  <div class="termuserinfo-page">
    <VanNavBar
      title="申请信息"
      safe-area-inset-top
      left-arrow
      @click-left="onClickLeft"
    ></VanNavBar>
    <div class="container" v-if="detail != undefined">
      <div class="term-title">
        借款{{ detail.outOrderNo }}({{ detail.totalTerm }}期)
      </div>
      <div class="detail-container">
        <div class="term-basic">申请借款信息</div>
        <div class="line"></div>
        <div style="height: 0.15rem"></div>
        <div class="term-row">
          <div class="term-text">借款金额{{}}元</div>
          <div class="term-text-main">
            {{ formatNumber(Number(detail.loanAmount)) }}
          </div>
        </div>
        <div class="term-row">
          <div class="term-text">申请日期</div>
          <div class="term-text-main">
            {{ formatDate(detail.loanDate, 'ch') }}
          </div>
        </div>
        <div class="term-row">
          <div class="term-text">申请期数</div>
          <div class="term-text-main">{{ detail.totalTerm }} 期</div>
        </div>
        <div class="term-row">
          <div class="term-text">借款用途</div>
          <div class="term-text-main">{{ detail.loanUse }}</div>
        </div>

        <div class="term-row">
          <div class="term-text">银行卡号</div>
          <div class="term-text-main">
            {{ detail.bankCardId }}({{ detail.bankName }})
          </div>
        </div>

        <div class="term-row">
          <div class="term-text">借款人</div>
          <div class="term-text-main">{{ detail.userName }}</div>
        </div>

        <div class="term-row">
          <div class="term-text">手机号</div>
          <div class="term-text-main">{{ detail.mobile }}</div>
        </div>

        <div class="term-row">
          <div class="term-text">借款人身份证</div>
          <div class="term-text-main">{{ detail.userIdCard }}</div>
        </div>
        <div class="term-row">
          <div class="term-text">职业</div>
          <div class="term-text-main">{{ detail.job }}</div>
        </div>
        <div class="term-row">
          <div class="term-text">月收入</div>
          <div class="term-text-main">{{ detail.incomeMonth }}</div>
        </div>
        <div class="term-row">
          <div class="term-text">居住城市</div>
          <div class="term-text-main">{{ detail.address }}</div>
        </div>
        <div class="term-row">
          <div class="term-text">详细地址</div>
          <div class="term-text-main">{{ detail.addressDetail }}</div>
        </div>
        <div class="term-row">
          <div class="term-text">紧急联系人</div>
        </div>
        <div class="term-row">
          <div class="term-text">手机号码</div>
          <div class="term-text-main">{{ detail.emergencyMobile }}</div>
        </div>
        <div class="term-row">
          <div class="term-text">姓名</div>
          <div class="term-text-main">{{ detail.emergencyContact }}</div>
        </div>
        <div class="term-row">
          <div class="term-text">常用联系人</div>
        </div>
        <div class="term-row">
          <div class="term-text">手机号码</div>
          <div class="term-text-main">{{ detail.generalMobile }}</div>
        </div>
        <div class="term-row">
          <div class="term-text">姓名</div>
          <div class="term-text-main">{{ detail.generalContact }}</div>
        </div>
        <div style="height: 0.15rem"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import bill from '@/api/bill'
import { TermUserInfo } from './termuserinfo'
import { formatDate, formatNumber } from '@/utils/libs'

const detail = ref<TermUserInfo>()
const request = bill()
request.getBillTermUserInfo('1', result => {
  detail.value = result
})

const router = useRouter()
function onClickLeft() {
  router.back()
}
</script>
<style lang="less">
@import './termuserinfo.less';
</style>
