import request from '@/utils/request'
import { RepaymentDetail,PlanInfo ,BankList,BankInfo} from '@/views/bill/repayment'
import { showToast } from 'vant'
import usebankstore from '@/stores/bankstore'
interface RepaymentDetailCallBack{
    (data:RepaymentDetail):void
}

interface BankListCallBack{
    (data:Array<BankInfo>):void
}

interface RepaymentCallBack{
    (data:string):void
}

export default function(){

    /**
     * 根据账单ID获取账单详情
     * @param id 账单ID
     * @param orderNo 合同ID
     */
    function getRepaymentDetailById(id:string,orderNo:string,callBack:RepaymentDetailCallBack){
        let detail:RepaymentDetail = {orderInfo:{totalTerm:12,totalAmount:'20000.00',termNo:3,haveRepayAmount:'2400.00'},repayPlanList:[
            {termNo:2,shouldRepayDate:'20241112',totalTerm:12,termAmount:'800.00'},
            {termNo:3,shouldRepayDate:'20241212',totalTerm:12,termAmount:'800.00'}
        ]}

        callBack(detail)
        request.post<RepaymentDetail>('repay/repayPlanList',{orderNo:id,outOrderNo:orderNo}).then(result=>{
            callBack(result.data)
        }).catch(error=>{
            showToast(error)
        })
    }

    /**
     * 获取绑定银行卡列表
     * @param id 
     * @param callBack 
     */
    function getBankList(id:string|number,callBack:BankListCallBack){
        const bankstore = usebankstore()
        const info:Array<BankInfo>=[{cardType:1,bankName:'建设银行',bankCardId:1,bankCardNo:'12315645645645646',bankCode:'100'},
            {cardType:1,bankName:'招商银行',bankCardId:1,bankCardNo:'12315645645648888',bankCode:'101'}
        ]
        info.forEach(bean=>{
            bean['bankLogo']= bankstore.getBankByName(bean.bankName)?.bankLogo
        })
        callBack(info)
        // request.get<BankList>('/bank-card/query_had_bind/'+id).then(result=>{
        //     callBack(result.data.bankCardList)
        // }).catch(error=>{
        //     showToast(error)
        // })
    }


    /**
     * 还款申请
     * @param data {userId:string,repayList:[orderNo],mobile:string,totalAmount:sting,repayType:string,bankCardId:string,smsCode:string}  repayType PRE/DO
     * @param callBack  string 还款流水号
     */
    function applyRepayment(data:any,callBack:RepaymentCallBack){
        callBack('123456789')
        request.post('repay/apply',data).then(result=>{
            callBack(result.data.repaySeqNo)
        }).catch(error=>{
            showToast(error)
        })
    }


    return ({getRepaymentDetailById,getBankList,applyRepayment})
}