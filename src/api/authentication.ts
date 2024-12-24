import Request from '@/utils/request'

interface CardType {
  frontImg: string
  backImg: string
}
// 身份认证
export function idCardSave(data: CardType) {
  return Request.post('/idCardSave', data)
}
// 支持银行
export function bankList(params = {}) {
  return Request.get('/bankList', { params })
}

// 绑定银行卡
interface BindBankCardType {
  bankCardNo: string
  bankCardType: number
  reserveMobileNo: string
}
export function bindBankCard(data: BindBankCardType) {
  return Request.post('/bindBankCard', data)
}
// 设置密码
export function setPaypwd(pass: string) {
  let data = {
    payPwd: pass,
  }
  return Request.post('/setPaypwd', data)
}

export function savePersonalInfo(data: PersonalInfoType) {
  return Request.post('/savePersonalInfo', data)
}
