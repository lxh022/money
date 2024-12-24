import request from '@/utils/request'
import { LoanItems } from '@/views/mine/loanhistory'
import { RepaymentDetail, RepaymentItems } from '@/views/mine/repayment'
import { showToast } from 'vant'

interface LoanListCallBack{
    (data:LoanItems):void
}
interface RepaymentListCallBack{
    (data:RepaymentItems):void
}

interface RepaymentDetailCallBack{
  (data:RepaymentDetail):void
}

export default function () {
  function getLoanHistory(page:number,callBack:LoanListCallBack) {
    callBack([{totalTerms:12,amount:'1200',loanDate:'20241220',status:1},
      {totalTerms:3,amount:'30000',loanDate:'20241120',status:1}
    ])
    request
      .get('')
      .then(result => {
        callBack([])
      })
      .catch(error => {
        showToast(error)
      })
  }

  function getLoanDetail(id: string) {
   
    request
      .get('')
      .then(result => {})
      .catch(error => {
        showToast(error)
      })
  }

  function getRepaymentHistory(page:number,callBack:RepaymentListCallBack) {
     callBack([{id:'1',amount:'2000',repaymentDate:'20180214',status:1,bankName:'建设银行',bankCardId:'**********65896',repaymentType:1},
      {id:'2',amount:'30000',repaymentDate:'20240614',status:1,bankName:'交通银行',bankCardId:'**********6789',repaymentType:1}
     ])
    request
      .get('')
      .then(result => {})
      .catch(error => {
        showToast(error)
      })
  }

  function getRepaymentDetail(id: string,callBack:RepaymentDetailCallBack) {
     callBack({orderNo:'1456456465',outOrderNo:'4567896789797',amount:'45646',status:1,type:1,bankCardId:'4156 4564 **** 4654',bankName:'建设银行',payDate:'20241220'})
    request
      .get('')
      .then(result => {})
      .catch(error => {
        showToast(error)
      })
  }

  return {
    getLoanHistory,
    getRepaymentHistory,
    getLoanDetail,
    getRepaymentDetail,
  }
}
