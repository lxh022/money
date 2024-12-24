/**
 * 银行卡列表
 */
export interface BankList{
    bankCardList:Array<BankInfo>
}
/**
 * 银行卡信息
 */
export interface BankInfo{
    bankCardId:number,//绑卡ID
    bankName:string,//银行
    bankCode:string,//银行代码
    bankCardNo:string,//银行卡卡号
    bankLogo?:string,
    cardType:number, //1 借记卡 2:信用卡
}

export interface UserBankCard{
    id:number,
    bankMobile:string,
    bankCardId:string,
    bankName:string,
    bankLogo?:string,
    cardType:number, //1 借记卡 2:信用卡
    isShow?:boolean,//是否显示
}