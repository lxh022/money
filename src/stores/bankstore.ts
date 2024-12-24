import { defineStore } from 'pinia'
import Request from '@/utils/request'

export interface Bank {
  bankNo: number
  bankName: string
  bankLogo: string
}

const usebankstore = defineStore('bank', {
  state: () => ({
    cards: <Array<Bank>>[],
    isInit: false,
  }),
  actions: {
    async initCards() {
      if (this.isInit) return
      let loaclText = localStorage.getItem('BankInfo')
      if (loaclText != null) {
        this.cards = JSON.parse(loaclText)
      } else {
        this.cards = [{bankName:'建设银行',bankNo:100,bankLogo:'http://tabc.png'},
        {bankName:'招商银行',bankNo:101,bankLogo:'http://123.png'},
        {bankName:'农业银行',bankNo:102,bankLogo:'http://345.png'}]
        // Request.get<Array<Bank>>('/bankList')
        //   .then(result => {
        //     this.cards = result.data
        //     localStorage.setItem('BankInfo', JSON.stringify(this.cards))
        //   })
        //   .catch(error => {})
      }
      this.isInit = true
    },
    addCard(bank: Bank) {
      this.cards.push(bank)
      // 更新本地存储
      localStorage.setItem('BankInfo', JSON.stringify(this.cards))
    },
    removeCard(index: number) {
      this.cards.splice(index, 1)
      // 更新本地存储
      localStorage.setItem('BankInfo', JSON.stringify(this.cards))
    },
    updateCard(index: number, updatedCard: Bank) {
      this.cards[index] = { ...this.cards[index], ...updatedCard }
      // 更新本地存储
      localStorage.setItem('BankInfo', JSON.stringify(this.cards))
    },
  },
  getters: {
    getBankByName: state => (name: string) => {
      return state.cards.find(card => card.bankName == name)
    },
  },
})

export default usebankstore
