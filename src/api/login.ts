import Request from '@/utils/request'

interface loginType {
  mobile: string
  code: string
}
interface codeType {
  mobile: string
}
export function smsLogin(data: loginType) {
  return Request.post('/smsLogin', data)
}
export function sendSms(data: codeType) {
  return Request.post('/sendSms', data)
}
