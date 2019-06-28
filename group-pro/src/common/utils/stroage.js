export default{
  setItem(key,val){
    if(window.localStorage){
      val.ctime=new Date()
      val.epx=1000*60*60*24 *7
      localStorage.setItem(key,JSON.stringify(val))
    }else{
      //cookie
    }
     
  },
  getItem(key){
     let obj=JSON.parse(localStorage.getItem(key)）
  }
}
/*
本地存储模块
1.兼容  
2.数据解析 使用者存 key 对象 内部的对象和字符串转化 由封装处理
3.过期时间处理
*/ 