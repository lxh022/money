/**
 * 【还款计划】
 */
export interface RepaymentDetail{
    orderInfo:Order,
    repayPlanList:Array<PlanInfo>
}

export interface Order{
    totalAmount:string,//借款总额
    totalTerm:number,//总期数
    termNo:number,//第几期 剩余期数需计算
    haveRepayAmount:string,//已还金额  剩余还款需计算 
}

export interface PlanInfo{
    // orderNo:string,//分期订单号
    // outOrderNo:string,//合同号
    totalTerm:number,//总期数 *
    termNo:number,//第几期 *
    // earliestRepayDate:string,//最早还款日期，格式为yyyyMMdd
    shouldRepayDate:string,//应还款日期，格式为yyyyMMdd       *
    termAmount:string,//本期应还总额（剩余未还金额） *
    isCurrentRepayPlan?: string, // 是否当期还款计划，Y表示是，N表示不是
}
