interface callBack{
    (succss:boolean):void
}

export default function(){

    function changeBankPhone(phone:string,code:string,callBack:callBack){
        callBack(true)
    }

    return ({changeBankPhone})
}