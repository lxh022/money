import Request from '@/utils/request'

// 借款参数接口
export function queryParams() {
  return Request.post('loan/queryParams')
}
interface TrialType {
  loanAmount: number
  termNum: number
}
// 还款计划试算
export function loanTrial(data: TrialType) {
  return Request.post('loan/trial', data)
}
// 借款申请
export function loanApply(data: any) {
  return Request.post('loan/apply', data)
}
