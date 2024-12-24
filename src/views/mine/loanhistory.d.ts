export interface LoanItem{
    loanDate:string,//借款日期
    amount:string,  //总金额
    totalTerms:number,//总期数
    status:number,//借款状态 1审核中、2已逾期、3还款中、4放款失败、5已结清

}
export type LoanItems = Array<LoanItem>