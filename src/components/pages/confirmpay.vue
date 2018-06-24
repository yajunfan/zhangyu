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
             <span class="right_con"></span> 
           </li>
           <li class="giftnum">
             <span class="left_con">礼品卡</span>
             <span class="right_con"></span>
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
        showList: false,
        showEdit: false,
        isEdit: false,
        paymoney:0
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
      onAdd() {
        this.editingContact = { id: this.list.length };
        this.isEdit = false;
        this.showEdit = true;
      },
     onSubmitFn(){
       var this_ = this;
       this_.$toast('！请填写收货地址');
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
         vertical-align: bottom;
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
        padding: 0.35rem 0.3rem;
        box-sizing: border-box;
       .order_info{
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
     }
     .pay_info{
       width: 100%;
      .payinfo_list{
        .bugnum,.giftnum{
          line-height: 0.88rem;
          height: 0.88rem;
          .left_con{
           color: #111;
           font-size: 0.28rem;     
          }
          .right_con{
            
          } 
        }
      }   
     }
   }

 }
 </style>