/**
 * 【我的账单】本期应还 item数据
 */
export interface ItemBillEvery{
    orderNo:string,//分期订单号
    outOrderNo:string,//合同号
    totalAmount:number,//总金额
    totalTerm:number,//总期数
    termPrincipal:number,//每期归还金额
    shouldRepayDate:string,//应还款日期
}
export type ItemBillEverys = Array<ItemBillEvery>
export interface TermEverData{
    CurrentRepayPlanList:ItemBillEverys
}
/**
 * 【我的账单】全部借款 item数据
 */
export interface ItemBillTotal{
    orderNo:string,//分期订单号
    outOrderNo:string,//合同号
    totalAmount:string,//总金额
    totalTerm:number,//总期数
    surplus:number//剩余金额
    loanDate:string,//申请日期
    status:number,//状态
}

export type ItemBillTotals = Array<ItemBillTotal>

