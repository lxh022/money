interface SupportBankType {
  bankNo: number
  bankName: string
  banLogo: string
}
interface PersonalInfoType {
  city: string
  companyName: string
  companyPhone: string
  address: string
  education: string
  email: string
  maritalStatus: string
  contact1name: string
  contact1relation: string
  contact1mobileno: string
  contact2name: string
  contact2relation: string
  contact2mobileno: string
  occupation: string
  pay: string
  [key: string]: string // 添加索引签名
}
