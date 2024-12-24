<template>
  <div class="authentication-user-page">
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <p class="bonus"></p>
      <div class="progress">
        <p>
          <img src="@/assets/image/secure2.png" alt="" />
          已完成60% 还差一步可享受最高20万额度
        </p>
        <van-progress
          :showPivot="false"
          color="#FF7D41"
          stroke-width="3"
          :percentage="60"
        />
      </div>
      <div class="user-item">
        <p class="txt">请提供您本人真实信息</p>
        <p class="warning">
          <van-icon name="warning" />我们将保护您的隐私，您的信息仅用于审核批
        </p>
        <div class="user-form">
          <van-field
            label="工作单位"
            placeholder="请输入"
            v-model="form.companyName"
          />
          <van-field
            label="单位电话"
            placeholder="请输入"
            v-model="form.companyPhone"
          />
          <van-field
            label="职业"
            placeholder="请输入"
            v-model="form.occupation"
          />
          <van-field label="月薪" placeholder="请输入" v-model="form.pay" />
        </div>
        <div class="user-form">
          <van-field
            label="居住地址"
            placeholder="请选择"
            :model-value="form.city"
            right-icon="arrow"
            @click="cityShow = true"
            readonly
          />
          <van-field
            label=" "
            placeholder="请输入详细地址"
            v-model="form.address"
          />
          <van-field
            label="个人邮箱"
            placeholder="请输入"
            v-model="form.email"
          />
          <van-field
            label="学历"
            right-icon="arrow"
            placeholder="请输入"
            v-model="form.education"
          />
          <van-field
            label="婚姻状态"
            right-icon="arrow"
            placeholder="请输入"
            v-model="form.maritalStatus"
          />
        </div>
        <div class="user-form">
          <van-field
            label="一般联系人"
            right-icon="arrow"
            placeholder="请输入"
            v-model="form.contact1name"
          />
          <van-field
            label="关系"
            placeholder="请输入"
            v-model="form.contact1relation"
          />
          <van-field
            label="联系电话"
            right-icon="arrow"
            placeholder="请输入"
            v-model="form.contact1mobileno"
          />
        </div>
        <div class="user-form">
          <van-field
            label="联系人"
            right-icon="arrow"
            placeholder="请输入"
            v-model="form.contact2name"
          />
          <van-field
            label="关系"
            placeholder="请输入"
            v-model="form.contact2relation"
          />
          <van-field
            label="联系电话"
            right-icon="arrow"
            placeholder="请输入"
            v-model="form.contact2mobileno"
          />
        </div>
        <div class="step">
          <van-button type="primary" @click="submit">提交</van-button>
        </div>
      </div>
    </div>
    <van-popup v-model:show="cityShow" position="bottom">
      <van-area
        title="选择城市"
        :area-list="areaList"
        @confirm="selectCity"
        @cancel="cityShow = false"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { savePersonalInfo } from '@/api/authentication'
import { areaList } from '@vant/area-data'
import { showToast } from 'vant'

const router = useRouter()
const cityShow = ref(false)
const form = ref<PersonalInfoType>({
  city: '',
  companyName: '',
  companyPhone: '',
  address: '',
  education: '',
  email: '',
  maritalStatus: '',
  contact1name: '',
  contact1relation: '',
  contact1mobileno: '',
  contact2name: '',
  contact2relation: '',
  contact2mobileno: '',
  occupation: '',
  pay: '',
})

const onClickLeft = () => {
  router.back()
}

const selectCity = ({ selectedOptions }: any) => {
  let str: string = ''
  selectedOptions.map((item: any, index: number) => {
    if (index > 0) {
      str = str + ' ' + item.text
    } else {
      str = item.text
    }
  })
  form.value.city = str
  cityShow.value = false
}

const submit = async () => {
  for (let v in form.value) {
    if (form.value[v] == '') {
      showToast('请完善个人信息后在操作')
      return
    }
  }
  await savePersonalInfo(form.value)
  router.replace('/')
}
</script>

<style lang="less">
@import './index.less';
</style>
