<template>
 <div class="confirm_container">
   <div class="add_container">
      <van-contact-card :type="cardType"  name="" @click="showList = true"/>
   </div>
   <div class="order_container">
     <div class="order_title">
       <span><i></i>订单信息</span>
     </div> 
     <div class="order_content">
       <div class="order_info">
         <van-row>
           <van-col span="6" class="logo_img"><img src="../../images/model1.jpg" alt="logo"></van-col>
           <van-col span="12">
             <ul>
                <li class="detail_title" v-text="modeldatas.name"></li>
                <li class="detail_specifications">规格:<span v-text="modeldatas.specifications"></span></li>
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
             <span class="left_con">礼品卡</span>
             <span class="right_con" @click="jumptogift('false')" v-if="!giftflag">无可用
               <img src="../../images/rightjt.png" alt="无">
             </span>
             <span class="right_con" @click="jumptogift('true')" v-else>{{giftnum}}张可用
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
  export default {
    data(){
      return{
        modeldatas:{},
        chosenContactId: null,
        editingContact: {},
        paymoney:0,  //合集金额
        shopnum:1, //购买数量
        giftflag:true, //是否有礼物卡
        giftnum:1,
       
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
        this_.modeldatas = this_.$route.params.data;
        this_.paymoney =(Number(this_.modeldatas.price).toFixed(2))*100;
      },
      //立即支付
      onSubmitFn(){
        var this_ = this;
        this_.$toast('！请填写收货地址');
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
        }
      },
      //礼品卡跳转
      jumptogift(flag){
        var this_ = this;
        this_.$router.push({  
           path: '/giftzero',
           name: 'GIFTZERO',  
           params: {   
            flag: flag 
           }
        }) 
      },
      onChange(index) {
        this.showList = false;
        this.chosenCoupon = index;
      },
      onExchange(code) {
        this.coupons.push(coupon);
      }
    },
    mounted(){
      var this_= this;
      document.title = '确认支付';
      this_.modeldataFn();
    },
    watch:{
     
    }  
  }
</script>

<style scoped lang="scss" type="text/css">
 .confirm_container{
   .add_container{
     height: 1.46rem;
     box-sizing: border-box;
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