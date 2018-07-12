<template>
    <div class="indexContainer">
      <div class="tabcontent">
          <ul class="tablist">
            <li v-for="(items,index) in tabarys"><a href="javascript:;" v-text="items.name" @click="tabchange(items.id,items);" :class="active==items.id?'selecta':''" ></a></li>
          </ul>
          <div class="tabListcontent">
            <ul v-for="(items,index) in tabarys" v-if="items.id == active">
              <li v-for="(item,index2) in tabLists" @click="jumptodetail(item.title,item.id)">
                 <img :src="item.img" :alt="item.title">
                 <h4 v-text="item.title"></h4>
               </li>
            </ul>
         </div>
      </div>
      <div class="iconcontainer">
         <span class="print d-i-b" @click="jumptomake()">
            <img src="../../images/print.png" alt="开始制作">
         </span>
         <span class="me d-i-b" @click="jumptoMy()">
            <img src="../../images/me.png" alt="个人中心">
         </span>
      </div>
    </div>
</template>

<script>
import SERVERUTIL from "../../lib/SeviceUtil";
import UTILS from "../../lib/utils";
import { mapState, mapMutations } from "vuex";
  export default {
    data(){
      return{
        active:1,
        num:0, //记录点击的次数
        photoname:"", //模板类型名称
        tabarys:[], //模板类型列表
        tabLists:[], //模板列表
        getstoken:"",
        locationIcon:require("../../assets/mybigbt.png")
        }
    },
    methods:{
      //用户登录
      userLoginFn(){
        var this_ = this;
        var obj={"service":"login","telephone":"13161728388"};
        SERVERUTIL.base.baseurl(obj).then(res => {
          if(res.data.code ==0){
            if(res.data.data){
              this_.getstoken = res.data.data.stoken;
              //this_.getUserInfoFn(this_.getstoken);
              this_.changeToken(this_.getstoken);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
      },
      //获取用户信息
      getUserInfoFn(token){
        var this_ = this;
        var obj={"service":"getUserInfo","stoken":token};
        SERVERUTIL.base.baseurl(obj).then(res => {
          if(res.data.code ==0){
            if(res.data.data){
              this_.username = res.data.data.nick_name;
              this_.changeNickname(this_.username);
            }
          }
        }).catch(error => {
          console.log(error);
        });
      },
      //获取模板类型
      modelTypeFn(){
        var this_ = this;
        var obj={"service":"getTemplateType"};
        SERVERUTIL.base.baseurl(obj).then(res => {
          if(res.data.code ==0){
            if(res.data.data){
              this_.tabarys = res.data.data;
              this_.active = this_.tabarys[0].id; 
              if(this_.modeltypeid){
                this_.modelListFn(this_.modeltypeid);
              }else{
                this_.modelListFn(this_.tabarys[0].id);
              };
              this_.photoname = this_.tabarys[0].name;
            }
          }
        }).catch(error => {
          console.log(error);
        });
      },
      //获取模板列表
      modelListFn(typeId,paramsobj){
        var this_ = this;
        var obj={"service":"getTemplateList","type_id":typeId};
        SERVERUTIL.base.baseurl(obj).then(res => {
          if(res.data.code ==0){
            if(res.data.data){
              this_.tabLists = res.data.data;
              if(paramsobj){
                this_.changeModelTypeId(paramsobj.obj.id);
              }else{
                this_.changeModelTypeId(this_.tabLists[0].type_id);
              }
              this_.changeModelId(this_.tabLists[0].id);
              this_.changeModelTypeName(this_.tabLists[0].title);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
      },
      //切换类型栏
      tabchange(index,obj){
        var this_ = this;
        this_.active = index;
        var paramsobj={
          flag:true,
          obj:obj,
          pindex:index
        }
        this_.modelListFn(obj.id,paramsobj);
       
      },
      //跳转到详情页面
      jumptodetail(name,id){
        var this_ = this;
        this_.changeModelId(id);
        this_.changeModelTypeName(name);
        this_.$router.push({  
            path: 'detail',   
            name: 'DETAIL',  
            params: {   
              name: this_.modeltypename,   
              id: this_.modelid  
            }
        })  
      },
      //跳转到开始制作页面
      jumptomake(){
        var this_ = this;
        //this_.changeModelTypeName(this_.photoname);
        this_.$router.push({  
          path: 'startmake',   
          name: 'STARTMAKE',  
          params: {   
            name: this_.photoname
          }
        }); 
      },
      //跳转到个人中心页面
      jumptoMy(){
        var this_ = this;
        this_.$router.push({  
          path: '/personal',
          name: 'PERSONAL', 
          params: {   
            token: this_.getstoken
          }
        }) 
      },
      ...mapMutations([
      "changeToken","changeNickname","changeModelTypeId","changeModelTypeName","changeModelId"
    ])
      
    },
    mounted(){
      var this_ = this;
      document.title = '首页';
      this_.modelTypeFn();
      this_.userLoginFn();
      if(this_.modeltypeid){
        this_.active = this_.modeltypeid;
      };
      var str=window.location.href;
      var obj = UTILS.PARAMSREG.paramsregurl(str);
      this_.changeToken(obj["arybehind"][0]);

    },
    computed:{
      ...mapState(['token',"vnickname","modeltypeid","modeltypename","modelid"])
    }
  }
</script>

<style scoped lang="scss" type="text/css">
.indexContainer{
  .tabcontent{
    .tablist{
      display: flex;
      flex-direction: row;
      padding: 0 10%;
      height: 0.88rem;
      line-height: 0.88rem;
      background: #F2F2F2;
      li{
          width: 33.3%;
          display: inline-block;
          text-align: center;
          font-size: 0.28rem;
          line-height: 0.88rem;
         a{
           font-size:0.28rem;
           color: #999;
         }
         .selecta{
           font-size: 0.32rem;
           color: #ff4747;
           font-weight: 600;  
         }
      }  
    }
    .tabListcontent{
        padding: 0.3rem 0.3rem 0 0.3rem;
        box-sizing: border-box;
        background: white;
      ul{
        width: 100%;
        li{
          width: 100%;
          margin: 0.3rem 0 0 0;
          img{
            width: 100%;
            height: 4.1rem; 
            margin-bottom: 0.2rem;
            // border: 1px solid black;
            border-radius: 8px;
          }
          h4{
           font-size: 0.32rem;
           font-weight: 600;   
          }
          
        }
      }  
    }
  }
  .iconcontainer{
     position: fixed;
     bottom:1.1rem;
     right:0.49rem;
    .print,.me{
      width: 1rem;
      height: 1rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
 
  
</style>
