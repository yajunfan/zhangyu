<template>
  <div class="address_container">
     <div v-if="ifnewflag" class="no_add">
        <div class="no_address_tip">
          <img src="../../images/addressbg.png" alt=".">
        </div>
        <p class="tc">收货地址为空</p>  
        <div class="add_address tc"  @click="addAddressFn(false)">添加收货地址 </div>
     </div>
     <div  class="has_add" v-else>
       <ul class="address_manager">
          <li v-for="(item,index) in addressLists" :key="index" @click="selectaddressFn(item)">
             <div class="address_info">
               <van-row>
                  <van-col span="12" class="name_left"><span v-text="item.name"></span></van-col>
                  <van-col span="12" class="tel_right tr" ><span v-text="item.tel"></span></van-col>
               </van-row>
               <p><span v-if="item.is_default&&!vaddressenterflag" style="color:red;">【 默认地址 】</span><span v-text="item.province+' '+item.city+' '+item.county+' '+item.address_detail"></span></p>
             </div> 
             <div class="address_operate">
               <van-row>
                  <van-col span="12" class="name_left">
                    <span :style="{'opacity':vaddressenterflag?'1':'0'}" class="select_icon d-i-b" :class="item.is_default?'selectSpan_icon':''"  @click="selectadFn(item,index)"></span>
                    <span :style="{'opacity':vaddressenterflag?'1':'0'}" v-text="item.is_default?'默认地址':'设为默认'"></span></van-col>
                    
                  <van-col span="12" class="tel_right tr" >
                    <span class="ad_edit d-i-b" @click.stop="addAddressFn($event,false,item)"><i class="d-i-b"></i>编辑</span>
                    <span class="ad_delete d-i-b" @click.stop="deleteaddressFn(item)"><i class="d-i-b"></i>删除</span>
                  </van-col>
               </van-row>  
             </div>
          </li>
       </ul> 
       <div class="add_address tc"  @click.stop="addAddressFn($event,true)">添加新地址 </div>  
     </div>
  </div>
</template>

<script>
import SERVERUTIL from "../../lib/SeviceUtil";
import { mapState, mapMutations } from "vuex";
  export default {
    data(){
      return{
        active:0, //选择默认地址
        ifnewflag:false,  //是否有地址
        addressLists:[]
      }
    },
    methods:{
    //选择默认地址
    selectadFn(item,index){
      var this_ = this;
      this_.active = index;
      this_.addressLists.forEach(item=>{
        item.is_default = false;
      });
      this_.addressLists[index].is_default = true;
      this_.$set(this_.addressLists,index,this_.addressLists[index]);
      var obj={
          "service":"setAddress",
          "stoken":this_.token,
          "link_name":item.name,
          "link_tel":item.tel,
          "district":item.province+"-"+item.city+"-"+ item.county,
          "address":item.address_detail,
          "district_id":item.area_code,
          "default_status":1,
          "id" :item.id
      };
      SERVERUTIL.base.baseurl(obj).then(res => {
        if(res.data.code == 0){
        }
      }).catch(error => {
        console.log(error);
      });
    },
    //获取收货地址列表
    getAddressListFn(token){
      var this_ = this;
      var obj={"service":"getAddressList","stoken":token};
      SERVERUTIL.base.baseurl(obj).then(res => {
        if(res.data.code ==0){
          if(res.data.data){
            if(res.data.data.length){
              this_.ifnewflag = false;
              this_.addressLists = res.data.data;
              this_.addressLists.forEach(item =>{
                var ary = item.district.split("-");
                item.province = ary[0];
                item.city = ary[1];
                item.county = ary[2];
                item.address_detail = item.address;
                item.name=item.link_name;
                item.tel=item.link_tel;
                item.area_code=item.district_id;
                if(item.default_status == 2){
                  item.is_default= false;
                }else{
                  item.is_default= true;
                };
              });
              this_.addressLists.reverse();
            }else{
              this_.ifnewflag = true;
            }
           
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    //查询收货地址信息
    getAddressInfo(){
      
    },
    //选择完地址回到支付页面
    selectaddressFn(obj){
      var this_ = this;
      if(!this_.vaddressenterflag){
        this_.changeaddress(obj);
        this_.$router.push({  
          path: '/confirmpay',
          name: 'CONFIRMPAY',  
          params: {   
            data: obj
          }
        }); 
      }else{
        return;
      }
    },
    //添加新地址-跳转到地址编辑页面
    addAddressFn(event,flag,obj){
      var this_ = this;
      var useobj={};
      if(obj){
        useobj={   
          flag: flag,
          data:obj
        }
      }else{
        useobj={   
          flag: flag
        }
      };
      this_.$router.push({  
        path: '/editaddress',
        name: 'EDITADDRESS',  
        params:useobj 
      }); 
    },
     //删除地址
     deleteaddressFn(obj){
       var this_ = this;
       this_.$dialog.confirm({
          title: '',
          message: '删除后不可撤销，确定要删除此地址吗？'
       }).then(() => {
         var paramsobj={};
         paramsobj={
          "service":"setAddress",
          "id":obj.id,
          "stoken":this_.token,
          "link_name":obj.link_name,
          "link_tel":obj.tel,
          "district":obj.province+"-"+obj.city+"-"+ obj.county,
          "address":obj.address_detail,
          "district_id":obj.area_code,
          "status":10
        };
          SERVERUTIL.base.baseurl(paramsobj).then(res => {
            if(res.data.code == 0){
              this_.getAddressListFn(this_.token);
            }
          }).catch(error => {
            console.log(error);
          });  
       }).catch(() => {
          
       });
     },
     ...mapMutations([
        "changeToken","changeObj","changeGiftlist","changeEnter","changeaddress"
      ])
    },
    mounted() {
      var this_ = this;
      document.title = "地址管理";
      this_.getAddressListFn(this_.token);
    },
    computed:{
      ...mapState(['token',"bookinfo","vgiftuserlist","vaddressenterflag","vaddress"])
    } ,    
  }
</script>

<style scoped lang="scss" type="text/css">
.address_container{
  .no_add{
    padding-top: 1.66rem;
    .no_address_tip{
      width: 1.31rem;
      height:1.31rem;
      margin: 0rem auto 0.3rem;
      img {
        width: 100%;
        height: 100%;
      }  
    } 
    p{
      font-size: 0.24rem;
      color: #999;
      margin-bottom:1.8rem;
    } 
    .add_address {
      width: 90vw;
      height: 1rem;
      background: url(../../images/longbtn.png) no-repeat;
      background-size:100% 100%;
      line-height: 0.8rem;
      color: white;
      font-size: 0.28rem;
      margin:0 auto;
    }
  }
  .has_add{
      margin-top: 0.3rem;
      margin-bottom: 1rem;
    .address_manager{
       li{
         background: white;
         margin-bottom:0.2rem;
         border-top: 1px solid #F2F2F2;
         border-bottom: 1px solid #F2F2F2;
         .address_info{
           padding: 0.3rem;
           box-sizing: border-box;
           .name_left,.tel_right{
              span{
                color:#111;
                font-size:0.3rem;
               } 
           }
           .tel_right{
             span{
              font-size:0.24rem;
             }  
           }
           p{
             margin-top:0.2rem;  
             box-sizing: border-box; 
           }
         }
         .address_operate{
           padding:0.3rem;
           border-top: 1px solid #F2F2F2;
           box-sizing: border-box;
           .name_left{
             span{
               font-size:0.28rem;  
             }
             .select_icon,.selectSpan_icon{
               width:0.28rem;
               height:0.28rem;
               background: url(../../images/noadselect.png) no-repeat;
               background-size: 100% 100%;  
               vertical-align: text-top;

             }
             .selectSpan_icon{
               background: url(../../images/adselect.png) no-repeat;
               background-size: 100% 100%;  
             }
           }
           .tel_right{
             span{
               margin-left:0.4rem;
               i{
                 width: 0.28rem;
                 height:0.28rem;
                 vertical-align: sub;
                 margin-right:0.1rem;
               }
             }
             .ad_edit,.ad_delete{
               i{
                background: url(../../images/editad.png) no-repeat;
                background-size:100% 100%;
                }
             }
             .ad_delete{ 
               i{
                background: url(../../images/deletead.png) no-repeat;
                background-size:100% 100%;
               } 
             }
           }
         }
       }
    }
    .add_address {
      position: fixed;
      width: 90vw;
      height: 1rem;
      bottom: 0;
      left: 5vw;
      background: url(../../images/longbtn.png) no-repeat;
      background-size:100% 100%;
      line-height: 0.8rem;
      color: white;
      font-size: 0.28rem;
    }
  }
  
}
</style>