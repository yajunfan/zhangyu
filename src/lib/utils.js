/**公用方法，cookie、跑马灯的定时器、marker的添加，点击事件、百度地图的自定义样式json
 */
var this_=this;
export default {
	//cookie的操作
	COOKIEOPERATE: {
		/**
		 * name -- 传入的cookie的属性的name
		 * delCookie -- 删除cookie
		 * getCookie -- 获取cookie的值
		 * useCookie -- 使用cookie的值
		 */
		delCookie(name){
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			document.cookie = name + "=; expires=" + exp.toGMTString();
	   },
		getCookie(name){
      		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg)){
				return arr[2];
			}else{ return null;}
		},
		useCookie(name){
			var cookieNum = this.getCookie(name);
			if(/\"/.test(cookieNum)){
				cookieNum = cookieNum.replace(/\"/g, "");
			}
			if (!cookieNum || cookieNum < 0) {
				cookieNum = -1;
			} else {
				cookieNum = this.getCookie(name);
				cookieNum = cookieNum.split("_");
			}
			return cookieNum;
		}

	},
	//定时器的操作，及时清除定时器
	TIMERSET:{
	  TIMER:null,
	  COUNTDOWN (num) {
			
      setTimeout(function () {
        num--;
      }, 1000)
		},
		FORMATSECONDS(value) {
			var secondTime = parseInt(value);// 秒
			var minuteTime = 0;// 分
			var hourTime = 0;// 小时
			if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
					//获取分钟，除以60取整数，得到整数分钟
				minuteTime = parseInt(secondTime / 60);
					//获取秒数，秒数取佘，得到整数秒数
				secondTime = parseInt(secondTime % 60);
					//如果分钟大于60，将分钟转换成小时
				if(minuteTime > 60) {
					//获取小时，获取分钟除以60，得到整数小时
						hourTime = parseInt(minuteTime / 60);
						//获取小时后取佘的分，获取分钟除以60取佘的分
						minuteTime = parseInt(minuteTime % 60);
				}
			}
			var result = "" + parseInt(secondTime) + "秒";
			if(minuteTime > 0) {
					result = "" + parseInt(minuteTime) + "分" + result;
			}
			if(hourTime > 0) {
					result = "" + parseInt(hourTime) + "小时" + result;
			}
			return result;
	}
	},
	//session的处理
	SESSIONOPERATE:{
		getStorage: function (key) {
			var value_ = sessionStorage.getItem(key);
			if (value_ !== '' || value_ !== undefined) {
			  return value_;
			}
			else {
			  return null;
			}
		},
		setStorage: function (key, value) {
			sessionStorage.setItem(key, value);
		},
		removeStore: function (key) {
			if (key === 'all') {
			  sessionStorage.clear();
			}
			else {
			  sessionStorage.removeItem(key);
			}
		}
	},
	//正则匹配等号前后的值
	PARAMSREG:{
	  paramsregurl(str){
		var reg=/([a-zA-Z0-9\._]+)=([a-zA-Z0-9\._]+)/ig;
		var aryfront = [],arybehind = [];
		str.replace(reg,function($1,$2,$3){
			aryfront.push($2);
		  arybehind.push($3);
		});
		var obj={};
		aryfront.forEach((item,index)=>{
			obj[item] = arybehind[index];
		})
		return obj;
	  }
	},
	//数组操作 -- 去除里边的重复对象
	ARRAYFN:{
		removeDuplicate(ary){
			var hash = {};
      ary = ary.reduce(function(item, next) {
          hash[next.name] ? '' : hash[next.name] = true && item.push(next);
          return item
			}, []);
			return ary;
		}
	}
}



















