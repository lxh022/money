import Request from '@/utils/request'
import { ItemBillEverys,ItemBillTotals,TermEverData } from '@/views/bill/minebill'
import { TermUserInfo } from '@/views/bill/termuserinfo'
import { showToast } from 'vant'

interface SingleBillCallBack{
    (data:ItemBillEverys):void
}

interface AllBillCallBack{
    (data:ItemBillTotals):void
}
interface TermUserInfoCallBack{
    (data:TermUserInfo):void
}
export default function(){

    /**
     * 获取每期应还列表
     */
    function getBillEveryList(callBack:SingleBillCallBack){
         Request.post<TermEverData>('/repay/CurrentRepayPlan/12').then(result=>{
            // const data :ItemBillEverys= [{id:1,total:2000,refund:200000.54,instalmentNum:12,deadline:'2024-09-31'}]
            callBack(result.CurrentRepayPlanList)
        }).catch(error=>{
            showToast(error)
        })  
    }

    /**
     * 获取全部借款列表
     */
    function getBillAllList(callBack:AllBillCallBack){
    //    Request.post<ItemBillTotals>('/all').then(result=>{

    //    }).catch(error=>{
    //         showToast(error)
    //    })
       const data :ItemBillTotals= [{orderNo:'1',outOrderNo:'1',totalAmount:'20000.00',status:0,surplus:1800,totalTerm:12,loanDate:'20240101'}]
       callBack(data)
    }

    /**
     * 根据合同获取账单用户信息
     * @param id 合同ID
     */
    function getBillTermUserInfo(id:string,callBack:TermUserInfoCallBack){
        const info:TermUserInfo = {outOrderNo:'12345645',totalTerm:12,loanAmount:'2000.00',loanUse:1,loanDate:'20241111',
            bankName:'建设银行',bankCardId:'xxxxxxxx4564',userName:'小学',mobile:"135xxxx2456",userIdCard:'1300002201801122332',
            address:'北京市海淀区',addressDetail:'中关村123号'
        }
        callBack(info)
    }

    return ({getBillEveryList,getBillAllList,getBillTermUserInfo})
}
