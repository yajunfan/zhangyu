<template>
  <div class="order_container">
    <div v-if="orderflag" class="has_order">
      <ul class="order_box">
         <li v-for="(item,index) in orderlists" :key="index">
            <div class="order_title">
               <span>订单号：<i v-text="item.id"></i></span> 
               <span v-text="item.chinaStatus"></span>
            </div>
            <div class="order_content">
               <van-card :title="item.info.title" :desc="item.info.specifications" :num="item.info.number" :price="item.info.price" thumb="../../images/title1.jpg"/> 
            </div>
            <div class="order_money">
               <!-- <span v-text="item.paymoneyflag?'实付款':'需付款'"></span> -->
               <span>￥<i v-text="item.realpay"></i></span>
            </div>
            <div class="order_btn" v-if="item.paymoneybtn">
               <!-- <div v-text="item.paymoneytext?'物流详情':'继续支付'"></div> -->
            </div>
         </li>
      </ul> 
    </div>
    <div v-else class="no_order">
       <div class="no_order_tip">
           <img src="../../images/noorder.png" alt="暂无订单">
       </div> 
       <p class="tc">还没有订单哦</p>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
       orderflag:true, //有订单
       orderlists:[]
      }
    },
    methods:{
      orderFn(){
        var this_ = this;
        this_.orderlists=[
         {
           id:'W17102523455412',
           paystatus:1,
           info:{
             "logoimg":'../../images/title1.jpg',
             "title":"小熊维尼轻奢杂志",
             "specifications":"20cm*30cm",
             "price":"233.00",
             "number":1
           },
           realpay:'233.00'
         },
         {
           id:'W17102523455412',
           paystatus:2,
           logoimg:'../../images/title1.jpg',
           info:{
             "title":"小熊维尼轻奢杂志",
             "specifications":"20cm*30cm",
             "price":"233.00",
             "number":1
           },
           realpay:'233.00'
         },
         {
           id:'W17102523455412',
           paystatus:3,
           logoimg:'../../images/title1.jpg',
           info:{
             "title":"小熊维尼轻奢杂志",
             "specifications":"20cm*30cm",
             "price":"233.00",
             "number":1
           },
           realpay:'233.00'
         },
         {
           id:'W17102523455412',
           paystatus:4,
           logoimg:'../../images/title1.jpg',
           info:{
             "title":"小熊维尼轻奢杂志",
             "specifications":"20cm*30cm",
             "price":"233.00",
             "number":1
           },
           realpay:'233.00'
         },
         {
           id:'W17102523455412',
           paystatus:5,
           logoimg:'../../images/title1.jpg',
           info:{
             "title":"小熊维尼轻奢杂志",
             "specifications":"20cm*30cm",
             "price":"233.00",
             "number":2
           },
           realpay:'233.00'
         }
        ] ;
        this_.orderlists.forEach((item,index)=>{
          item.paymoneyflag=true;
          item.paymoneybtn=false;
          item.paymoneytext=false;
          if(item.paystatus == 1){
            item.chinaStatus = '待付款';
            item.paymoneyflag=false;
            item.paymoneybtn=true;
          }else  if(item.paystatus == 2){
            item.chinaStatus = '已付款，待印刷'; 
          }else  if(item.paystatus == 3){
            item.chinaStatus = '已发货';
            item.paymoneybtn=true; 
            item.paymoneytext=true;
          }else  if(item.paystatus == 4){
            item.chinaStatus = '已签收'; 
          }else  if(item.paystatus == 5){
            item.chinaStatus = '已取消'; 
          };
        }); 
      }
    },
    mounted() {
      var this_ = this;
      document.title = "我的订单";
      this_.orderFn();
    }, 
   }
</script>

<style scoped lang="scss" type="text/css">
.order_container{
  .no_order{
    padding-top: 2.6rem;
    .no_order_tip{
      width: 0.9rem;
      height: 0.86rem;
      margin: 0rem auto 0.3rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      font-size: 0.24rem;
      color: #999;
    }
  }
  .has_order{
    .order_box{
      li{
        background: white;
      }
    }
  }
}
</style>