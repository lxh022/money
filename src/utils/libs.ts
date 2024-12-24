function formatNumber(num: number) {
  // 保留两位小数并转换为字符串
  const formattedNumber = num.toFixed(2)

  // 使用正则表达式给小数点前的数字每三位添加逗号
  return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 格式化时间
 * @param date YYYYMMDD
 * @param split . 或者 / 或者 ch
 * @returns 
 */
function formatDate(date: string,split:string) {
  if(date.length!==8){
    throw new Error('Expected YYYYMMDD')
  }

  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  if(split=="."){
    return `${year}.${month}.${day}`;
  }else if(split=="/"){
    return `${year.slice(-2)}/${month}/${day}`;
  }else if(split=="ch"){
    return `${year}年${month}月${day}日`
  }else {
    return date
  }
}

function getBankBgColor(name:string){
  let style={background:'',borderRadius:'0.08rem',boxShadow:'0 0.04rem 0.3rem 0.2rem rgba(197,202,213,0.15)'}
  if(name.includes('工商')||name.includes('招商')||name.includes('华夏')||name.includes('中信')||name.includes('广发')||name.includes('北京银行')||name.includes('中国银行')){
   style.background='linear-gradient( 135deg, #F87373 0%, #F6504D 100%)'
  }else if(name.includes('建设')||name.includes('交通')||name.includes('浦发')||name.includes('上海')||name.includes('兴业')){
   style.background='linear-gradient( 134deg, #59B6F8 0%, #3497EE 100%)'
  }else if(name.includes('农业')||name.includes('民生')||name.includes('邮储')){
   style.background='linear-gradient( 313deg, #28A991 0%, #2FC6A9 100%)'
  }else if(name.includes('平安')){
   style.background='linear-gradient( 315deg, #FC9153 0%, #FAAD5D 100%)'
  }else{
    style.background='#6e82d7'
  }
  return style
}

export { formatNumber,formatDate,getBankBgColor }


