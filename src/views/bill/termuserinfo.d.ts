export interface TermUserInfo{
    outOrderNo:string,//合同号
    totalTerm:number,//总期数
    loanDate:string,//借出日期
    loanUse:number,//借款用途
    bankCardId:string,//银行卡号
    bankName:string,//银行名称
    loanAmount:string,//借款金额
    userName:string,//借款人
    mobile?:string,//借款手机号
    userIdCard:string,//借款身份证号
    job?:string,//职业   前面无输入项
    incomeMonth?:string,//月收入 前面无输入项
    address:string,//居住城市
    addressDetail:string,//详细地址
    emergencyContact?:string,//紧急联系人
    emergencyMobile?:string,//紧急联系人手机号
    generalContact?:string,//常用联系人
    generalMobile?:string,//常用联系人手机号
}