export interface RepaymentItem{
    id:string,
    repaymentDate:string,//还款日期
    repaymentType:number,//还款类型
    amount:string,  //还款金额
    bankName:string,//银行名称
    bankCardId:string,//银行卡号
    status:number,//借款状态
}

export type RepaymentItems= Array<RepaymentItem>


export interface RepaymentDetail{
    status:number,
    type:number,
    amount:string,
    bankCardId:string,
    bankName:string,
    orderNo:string,
    outOrderNo:string,
    payDate:string,
}