import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '工作台',
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/mine',
    name: 'mine',
    meta: {
      title: '我的',
    },
    component: () => import('@/views/mine/mine.vue'),
  },
   {
    path: '/mine/loanhistory',
    name: 'loanhistory',
    meta: {
      title: '借款记录',
    },
    component: () => import('@/views/mine/loanhistory.vue'),
  },
   {
    path: '/mine/repaymenthistory',
    name: 'repaymenthistory',
    meta: {
      title: '还款记录',
    },
    component: () => import('@/views/mine/repaymenthistory.vue'),
  },
   {
    path: '/mine/repaymentdetail',
    name: 'repaymentdetail',
    meta: {
      title: '还款记录详情',
    },
    component: () => import('@/views/mine/repaymentdetail.vue'),
  },
  {
    path: '/mine/bankcardmanager',
    name: 'bankcardmanager',
    meta: {
      title: '银行卡管理',
    },
    component: () => import('@/views/mine/bankcardmanager.vue'),
  },
   {
    path: '/mine/bankcardadd',
    name: 'bankcardadd',
    meta: {
      title: '添加银行卡',
    },
    component: () => import('@/views/mine/bankcardadd.vue'),
  },
  {
    path: '/authentication',
    name: 'authentication',
    component: () => import('@/views/authentication/authentication.vue'),
    meta: {
      title: '实名认证',
    },
  },
  {
    path: '/mine/setting/authentication',
    name: 'authentication',
    component: () => import('@/views/mine/authentication.vue'),
    meta: {
      title: '完善信息',
    },
  },
  {
    path: '/bank',
    name: 'bank',
    component: () => import('@/views/authentication/bank.vue'),
    meta: {
      title: '绑定银行卡',
    },
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: () => import('@/views/authentication/userinfo.vue'),
    meta: {
      title: '个人信息',
    },
  },
  {
    path: '/mine/setting',
    name: 'setting',
    meta: {
      title: '设置',
    },
    component: () => import('@/views/mine/setting.vue'),
  },
  {
    path: '/mine/setting/accountsecurity',
    name: 'accountsecurity',
    meta: {
      title: '账号与安全',
    },
    component: () => import('@/views/mine/accountsecurity.vue'),
  },
  {
    path: '/mine/setting/updatephone',
    name: 'updatephone',
    meta: {
      title: '修改登录手机号',
    },
    component: () => import('@/views/mine/updatephone.vue'),
  },
  {
    path: '/mine/setting/deregister',
    name: 'deregister',
    meta: {
      title: '注销说明',
    },
    component: () => import('@/views/mine/deregister.vue'),
  },
  {
    path: '/bill',
    name: 'bill',
    component: () => import('@/views/bill/minebill.vue'),
    meta: {
      title: '我的账单',
    },
  },
  {
    path: '/bill/repayment',
    name: 'repayment',
    component: () => import('@/views/bill/repayment.vue'),
    meta: {
      title: '还款计划',
    },
  },
  {
    path: '/bill/termuserinfo',
    name: 'termuserinfo',
    component: () => import('@/views/bill/termuserinfo.vue'),
    meta: {
      title: '借据信息',
    },
  },
  {
    path: '/bill/repaymentsuccess',
    name: 'repaymentsuccess',
    component: () => import('@/views/bill/repaymentsuccess.vue'),
    meta: {
      title: '还款提交成功',
    },
  },
  {
    path: '/borrow',
    name: 'borrow',
    component: () => import('@/views/borrow/borrow.vue'),
    meta: {
      title: '借款',
    },
  },
  {
    path: '/borrow/status',
    name: 'status',
    component: () => import('@/views/borrow/status.vue'),
    meta: {
      title: '放款状态',
    },
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: '404',
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
]
export default routes
