interface BorrowType {
  maxLoanAmount: number
  minLoanAmount: number
  bankCardkList: BankType[]
  termRateList: any[]
}

interface BankType {
  bankName: string
  bankCardId: number
  bankCardNo: string
}
