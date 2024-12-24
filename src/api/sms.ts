import Request from '@/utils/request'
import { showToast } from 'vant'

export interface CallBack{
    (data:boolean):void
}
export default function(){

    /**
     * 发送验证码
     * @param mobile 手机号
     */
    function sendSms(mobile:string,callBack:CallBack){
        Request.post('sendSms',{mobile:mobile}).then(()=>{
            callBack(true)
        }).catch(error=>{
            showToast(error)
        })
    }

    /**
     * 校验验证码
     * @param mobile 手机号
     * @param code 验证码
     * @param callBack boolean 
     */
    function verifySms(mobile:string,code:string,callBack:CallBack){
        Request.post('verifySms',{mobile:mobile,code:code}).then(()=>{
            callBack(true)
        }).catch(error=>{
            showToast(error)
        })
    }
    return ({sendSms,verifySms})
}