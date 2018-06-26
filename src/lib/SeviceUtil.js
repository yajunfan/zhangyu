
import axios from 'axios';
import API from './API';
import UTILS from "./utils";
axios.defaults.withCredentials=true;
var this_=this;
axios.interceptors.request.use(  
  config => {                                         
      if(config.url.indexOf("login")>-1){
          console.log("这是登录页面");
      }else{
        let sessionNum = UTILS.SESSIONOPERATE.getStorage("csrftoken");
        if(config.url.indexOf('updateXXLJob')>-1){
          config.url=config.url+"&csrftoken="+sessionNum;
        }else{    
          config.url=config.url+"?csrftoken="+sessionNum;  
        };
          //  if(config.method=='post' || config.method=='put' || config.method=='delete'){  
          //    console.log(config.data)
          //       config.data["csrftoken"]=sessionNum; 
          //   }else if(config.method=='get'){ 
          //     if(sessionNum){
          //       config.params.csrftoken =  sessionNum;
          //     }
          //   }  
      }
      return config;  
  },function(error){  
      return Promise.reject(error)  
  }  
) 
axios.interceptors.response.use( function(res) {
  const data = res.data;
// 根据返回的status值来做不同的处理（和后端约定）
    if(data.status<0){
      console.log("状态码小于0");
    }
    switch (data.status) {
        case 0 : break;
        case 200 : console.log("请求成功");break;
        case 400:  console.log(data.message);break;

        case 401:console.log('未授权，请登录 -- Unauthorized');break;

        case 403:console.log('拒绝访问 Forbidden');break;

        case 404:console.log(`Not Found  请求地址出错`) ;break;

        case 408:console.log('请求超时 token过期了');break;

        case 500:console.log('服务器内部错误');break;

        case 501:console.log('服务未实现');break;

        case 502:console.log('网关错误');break;

        case 503:console.log('服务不可用');break;

        case 504:console.log('网关超时');break;

        case 505:console.log('HTTP版本不受支持');break;
        default: console.log(`成功!`);
   }
    return res;
}, (err) => { // 这里是返回状态码不为200时候的错误处理
    if (err && err.res) {
      switch (err.res.status) {
          
        case 400:err.message = '请求错误';break;

        case 401:err.message = '未授权，请登录';break;

        case 403:err.message = '拒绝访问';break;

        case 404:err.message = `请求地址出错: ${err.response.config.url}`;break;

        case 408:err.message = '请求超时';break;

        case 500:err.message = '服务器内部错误';break;

        case 501:err.message = '服务未实现';break;

        case 502:err.message = '网关错误';break;

        case 503:err.message = '服务不可用';break;

        case 504:err.message = '网关超时';break;

        case 505:err.message = 'HTTP版本不受支持';break;
        default: err.message = `连接出错(${err.response.status})!`;
   }
 }
 return Promise.reject(err)
})
export default {
  
  base: {
    //公共
    baseurl(opt) {
      return axios.post(API.BASEINFO.BASEURL, opt); 
    }
  }
}
