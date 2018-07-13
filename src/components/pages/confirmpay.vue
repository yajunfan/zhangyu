<template>
 <div class="confirm_container">
   <!-- 没有默认收货地址 -->
   <div class="add_container" v-if="!addressflag">
      <van-contact-card type="add"  @click="jumpaddress"/>
   </div>
   <!-- 有收货地址 -->
   <div v-if="addressflag" class="user_address">
     <ul @click="jumpaddress">
       <li><span class="d-i-b mr10" v-text="defaultinfo.link_name"></span><span v-text="defaultinfo.link_tel"></span></li>
       <li class="ad"><span v-text="defaultinfo.district+defaultinfo.address"></span><img src="../../images/rightjt.png" alt="无"></li>
     </ul>
    
     <div class="clear"></div>
   </div>
    <div class="line" v-if="addressflag"></div>
   <div class="order_container">
     <div class="order_title">
       <span><i></i>订单信息</span>
     </div> 
     <div class="order_content">
       <div class="order_info">
         <van-row>
           <van-col span="6" class="logo_img"><img :src="modeldatas.modelimg" alt="logo"></van-col>
           <van-col span="12">
             <ul>
                <li class="detail_title" v-text="modeldatas.title"></li>
                <li class="detail_specifications">规格:<span v-text="modeldatas.size"></span></li>
             </ul>
           </van-col>
           <van-col span="6" class="detail_price">￥<span v-text="modeldatas.price"></span></van-col>
         </van-row>
       </div>
       <div class="pay_info">
         <ul class="payinfo_list">
           <li class="bugnum">
             <span class="left_con">购买数量</span>
             <span class="right_con">
                <span class="opbtn reduce_btn d-i-b tc" @click="reduceFn()">－</span>
                <span class="opbtn numtext d-i-b tc" v-text="shopnum"></span>
                <span class="opbtn add_btn d-i-b tc" @click="addFn()">＋</span>
             </span> 
           </li>
           <li class="giftnum" >
             <span class="left_con" >礼品卡</span>
             <span class="right_con" @click="jumptogift('false')" v-if="!giftflag">无可用
               <img src="../../images/rightjt.png" alt="无">
             </span>
             <span class="right_con" @click="jumptogift('true')" v-else>
                <span v-if="giftcardflag">{{giftcardnum}}张可用</span>
                <span v-if="!giftcardflag">-{{total}}</span>
               <img src="../../images/rightjt.png" alt="无">
             </span>
           </li>
         </ul>
       </div>
       <van-submit-bar :price="paymoney" button-text="立即支付" @submit="onSubmitFn"/>
     </div>
   </div>
 </div>
</template>

<script>
// import { Toast } from 'vant';
import SERVERUTIL from "../../lib/SeviceUtil";
import { mapState, mapMutations } from "vuex";
  export default {
    data(){
      return{
        modeldatas:{},
        chosenContactId: null,
        editingContact: {},
        paymoney:0,  //合计金额
        shopnum:1, //购买数量
        giftflag:true, //是否有礼物卡
        giftnum:1,
        addressflag:true, //没有有默认收货地址
        chosenContactId: null,
        editingContact: {},
        showList: false,
        showEdit: true,
        isEdit: false,
        defaultinfo: {}, //默认的收货地址信息
        giftcardnum:0,//可用礼品卡的数量
        vailableList:null,  //选择确认使用后的礼品卡列表
        giftcardflag:true,   //判断显示几张可用还是可使用的金额
        total:"", //总共可减少金额
      }
    },
    computed: {
     cardType() {
       return this.chosenContactId !== null ? 'edit' : 'add';
     },
  },
    methods:{
      //获取选择的模板数据
      modeldataFn(){
        var this_ = this;
        this_.modeldatas = this_.bookinfo;
        this_.paymoney = (Number(this_.modeldatas.price).toFixed(2))*100;
      },
      //获取收货地址列表
      getAddressListFn(token){
        var this_ = this;
        var obj={"service":"getAddressList","stoken":token};
        SERVERUTIL.base.baseurl(obj).then(res => {
          if(res.data.code ==0){
            if(res.data.data){
              this_.addressLists = res.data.data;
              if(this_.addressLists.length){
                this_.addressflag = true;
                this_.addressLists.forEach(item =>{
                  if(item.default_status == 1){
                    this_.defaultinfo = item;
                  }
                })
                if(this_.vaddress){
                  this_.defaultinfo = this_.vaddress;
                }
              }else{
                this_.addressflag = false;
              }
            }
          }
        }).catch(error => {
          console.log(error);
        });
      },
      //添加收货地址
      jumpaddress(){
        var this_ = this;
        this_.changeEnter(false);
        this_.$router.push({  
          path: '/newaddress',
          name: 'NEWADDRESS'
        });
      },
      //获取可用礼品卡的数据
      getUserCardFn(token){
        var this_ = this;
        var obj={"service":"getUserCard","stoken":token,"status":"1"};
        SERVERUTIL.base.baseurl(obj).then(res => {
          if(res.data.code ==0){
            if(res.data.data.length){
              this_.giftcardnum = res.data.data.length;
            }
          }
        }).catch(error => {
          console.log(error);
        });
      },
      //立即支付
      onSubmitFn(){
        var this_ = this;
        var cardstr="";
        this_.changeaddress(this_.defaultinfo);
        this_.vailableList.forEach(item =>{
          cardstr+=item.id+",";
        });
        cardstr = cardstr.slice(0,cardstr.length-1);
        if(this_.addressflag){
          var obj={
            service:"addOrder",
            stoken:this_.token,
            book_id:this_.vbookid,
            num:this_.shopnum,
            address_id:this_.defaultinfo.id,
            card_id:cardstr
          };
          var message="";
          if(this_.giftcardflag){
            message="该笔订单确认不使用礼品卡来支付吗？"
          }else{
            message="该笔订单确认要全部使用礼品卡余额来支付吗？"
          }
          this_.$dialog.confirm({
            title: '支付提示',
            message: message
          }).then(() => {
            SERVERUTIL.base.baseurl(obj).then(res => {
              if(res.data.code ==0){
                if(res.data.data){
                  //调用wx支付接口
                  this_.$router.push({  
                    path: '/paysuccess',
                    name: 'PAYSUCCESS',
                  });
                }
              }else{
                //this_.$toast('支付失败，原因是：'+res.data.message);
                const toast = this_.$toast({
                  forbidClick: true, // 禁用背景点击
                  loadingType: 'spinner',
                  message: '支付失败：'+res.data.message
                });

                // let second = 4;
                // const timer = setInterval(() => {
                //   second--;
                //   if (second) {
                //     toast.message = `倒计时 ${second} 秒`;
                //   } else {
                //     clearInterval(timer);
                //     this_.$toast.clear();
                //     this.$router.push({  
                //       path: '/orderdetail',
                //       name: 'ORDERDETAIL', 
                //       params: {   
                //         status: 1,
                //         data:obj
                //       }
                //     }) ;
                //   }
                // }, 1000);
              }
            }).catch(error => {
              console.log(error);
            });    
          }).catch(() => {
              
          });
          
        }else{
          this_.$toast('！请填写收货地址');
        }
        
      },
      //购买数量减少
      reduceFn(){
        var this_ = this;
        if(this_.shopnum<2){
          this_.shopnum = 1;
        }else{
          this_.shopnum--
        }
      },
      //购买数量增加
      addFn(){
        var this_ = this;
        if(this_.shopnum>30){
          this_.shopnum = 30;
        }else{
          this_.shopnum++;
        };
      },
      //礼品卡跳转
      jumptogift(flag){
        var this_ = this;
        this_.changeGift(true);
        this_.$router.push({  
           path: '/giftzero',
           name: 'GIFTZERO',  
           params: {   
            flag: flag 
           }
        }); 
      },
      onChange(index) {
        this.showList = false;
        this.chosenCoupon = index;
      },
      onExchange(code) {
        this.coupons.push(coupon);
      },
      onSave(info) {
        this.showEdit = false;
        this.showList = false;
        if (this.isEdit) {
          this.list = this.list.map(item => item.id === info.id ? info : item);
        } else {
          this.list.push(info);
        }
        this.chosenContactId = info.id;
      },
       ...mapMutations([
        "changeToken","changeObj","changeGiftlist","changeEnter","changeGift","changeaddress","changebookid","changebuynum"
      ])
    },
    mounted(){
      var this_= this;
      document.title = '确认支付';
      this_.modeldataFn();
      this_.getAddressListFn(this_.token);
      this_.getUserCardFn(this_.token);
      //选择的礼品卡列表
      this_.vailableList = this_.vgiftuserlist;
      this_.shopnum = this_.vbuynum;
      this_.total=0;
      if(this_.vailableList.length){
        this_.giftcardflag=false;
        this_.vailableList.forEach(item=>{
          this_.total+=Number(item.left_price);
        });
        var totalmoney = this_.modeldatas.price*this_.shopnum;
        if(this_.total>totalmoney || this_.total == totalmoney){
          this_.total = totalmoney;
        }
      };
    },
    computed:{
        ...mapState(['token',"bookinfo","vgiftuserlist","vaddressenterflag","vgiftflag","vaddress","vbookid","vbuynum"])
    } ,
    watch:{
     total(n,o){
       var this_ = this;
       if(!n == ""){
         this_.paymoney = (this_.modeldatas.price*this_.shopnum - n)*100;
       }
     },
     shopnum(n,o){
       var this_ = this;
       if(!n == ""){
         this_.changebuynum(n);
         this_.paymoney = (this_.modeldatas.price*n - this_.total)*100;
       }
     }
    }  
  }
</script>

<style scoped lang="scss" type="text/css">
 .confirm_container{
   .add_container{
     height: 1.46rem;
     box-sizing: border-box;
   }
   .user_address{
     height: 0.8rem;
     padding: 0.3rem 0.2rem;
     background: white;
     li{
       color: #111;
       span{
         font-size:0.28rem;
       }
       .mr10{
         margin-right: 0.2rem;
       }
     }
     li.ad{
       span{
         color:#999;
         font-size:0.24rem;
       }
       img{
         float: right;
         width: 0.16rem;
         margin-top: -8px;
       }
     }
     

   }
   .line{
      width: 100%;
      height: 2px;
      background: url(../../images/blueline.png);
      background-size: 100% 100%;  
   }
   .order_container{
     .order_title{
       height: 0.78rem;
       background: white;
       span{
         color: #111;
         font-size: 0.28rem;
         line-height: 0.78rem;
         i{
           display: inline-block;
           margin: 0 0.1rem 0 0.3rem;
           width: 0.32rem;
           height: 0.32rem;
           background: url('../../images/billboard.png') no-repeat;
           background-size: contain;
           vertical-align: sub;
         }
       }
     }
     .order_content{
        padding: 0.35rem 0rem;
        box-sizing: border-box;
       .order_info{
         padding:  0 0.3rem 0.35rem;
         box-sizing: border-box;
         .logo_img{
           img{
             width: 1.5rem;
             height: 1.5rem;
           }
         }
          .detail_title{
           color: #333;
           margin-bottom:0.14rem;
           font-size: 0.32rem;
         }
         .detail_specifications{
           color: #999;
           margin-bottom:0.24rem;
           font-size: 0.24rem;
           span{
             font-size: 0.24rem;
           }  
         }
         .detail_price{
           color: #ff4747;
           span{
             font-size: 0.28rem;
           } 
         }
       }
       .pay_info{
        width: 100%;
        .payinfo_list{
          .bugnum,.giftnum{
            line-height: 0.88rem;
            height: 0.88rem;
            background: white;
            padding: 0 0.3rem;
            .left_con{
            color: #111;
            font-size: 0.28rem;     
            }
            .right_con{
              float: right;
              margin: 0.2rem 0;
              .opbtn{
                float: left;
                width: 0.7rem;
                height: 0.5rem;
                line-height: 0.5rem;
                background: #f2f1f1;
                border: 1px solid #E7E7E7;
                font-size: 0.36rem;
              }
              .reduce_btn{
                border-bottom-left-radius: 0.3rem;
                border-top-left-radius: 0.3rem;
              }
              .add_btn{
                border-bottom-right-radius: 0.3rem;
                border-top-right-radius: 0.3rem;
              }
              .numtext{
                background: none;
                border-left: none;
                border-right: none;
                font-size: 0.24rem;
              }
              
            } 
          }
          .giftnum{
            position: relative;
            border-top: 1px solid #e7e7e7;
            .right_con{
              position: absolute;
              right: 0.35rem;
              margin: 0;
              line-height: 0.88rem;
              color: #ff4747;
              font-size: 0.28rem;
              img{
                width: 0.12rem;
                vertical-align: middle;
              }
            }
          }
        }   
      }
     }
     
   }

 }
 </style>