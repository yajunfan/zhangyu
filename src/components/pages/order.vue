<template>
  <div class="order_container">
    <div v-if="orderflag" class="has_order">
      <ul class="order_box">
         <li v-for="(item,index) in orderlists" :key="index" >
            <div class="order_title" @click="jumptodetail(item.paystatus,item)">
               <span>订单号：<i v-text="item.id"></i></span> 
               <span class="pay_status  fr" v-text="item.chinaStatus"></span>
            </div>
            <div class="order_content" @click="jumptodetail(item.paystatus,item)">
               <van-card :title="item.info.title" :desc="item.info.specifications" :num="item.info.number" :price="item.info.price" thumb="//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"/> 
            </div>
            <div class="order_money">
              <span class="fr money_num">￥<i v-text="item.realpay"></i><span style="font-size:0.24rem;color:#ff5547;">.00</span></span>
              <span class="fr" v-text="item.paymoneyflag?'实付款':'需付款'"></span>
            </div>
            <div class="order_btn" v-if="item.paymoneybtn" @click="operatebtnFn(item.paymoneytext)">
               <div class="tc fr " v-text="item.paymoneytext?'物流详情':'继续支付'"></div>
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
import SERVERUTIL from "../../lib/SeviceUtil";
import UTILS from "../../lib/utils";
  export default {
    data(){
      return{
       orderflag:true, //有订单
       userid:"",
       token:"",
       orderlists:[],
      }
    },
    methods:{
      //订单列表数据
      orderFn(id,token){
        var this_ = this;
        var obj={"service":"getUserOrderList","stoken":token,};
        SERVERUTIL.base.baseurl(obj).then(res => {
          console.log(res);
          if(res.data.code ==0){
            if(res.data.data){
              //this_.orderlists = res.data.data; 
            }
          }
        }).catch(error => {
          console.log(error);
        });
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
           realpay:'233'
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
           realpay:'233'
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
           realpay:'233'
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
           realpay:'233'
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
           realpay:'233'
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
      },
      //跳转到详情页
      jumptodetail(status,obj){
        var this_ = this;
        this.$router.push({  
          path: '/orderdetail',
          name: 'ORDERDETAIL', 
          params: {   
            status: status,
            data:obj
          }, 
          // query: {  
          //   name:name,   
          //   id: id
          // }
        }) ;
      },
      //继续支付和物流详情操作
      operatebtnFn(flag){
        //flag -true 物流详情   
        //flag -false  继续支付
        if(flag){
          this.$router.push({  
            path: '/logistics',
            name: 'LOGISTICS',
            params: {   
             
            }, 
           
          }) ;
        }else{

        }
      }
    },
    mounted() {
      var this_ = this;
      document.title = "我的订单";
      this_.token = UTILS.SESSIONOPERATE.getStorage("stoken");
      this_.userid = this_.$route.params.id;
      this_.orderFn(this_.userid,this_.token);
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
    padding: 0.3rem 0;
    border-top:1px solid  #ccc;
    .order_box{
      li{
        background: white;
        margin-bottom:0.2rem;
        .order_title,.order_money{
          height: 0.7rem;
          line-height: 0.7rem;
          padding: 0 0.3rem 0 0.4rem;
          color: #999;
          font-size:0.24rem;
          .pay_status{
            line-height: 0.7rem;
            color: #ff5747;
            font-size:0.28rem;
          }
        }
        .order_money{
          border-bottom: 1px solid #f1f1f1;
          span{
            color:#111;
            font-size: 0.3rem;
            line-height: 0.7rem;
          }
          .money_num{
            font-size: 0.3rem;
            color:#ff5747;
            i{
              font-size: 0.3rem;
            }
          }
        }
        .order_btn{
          height: 1rem;
          line-height: 1rem;
          div{
            width: 1.6rem;
            height: 0.6rem;line-height: 0.6rem;
            background: url(../../images/orderbtn.png) no-repeat;
            background-size:100% 100%; 
            margin-right: 0.3rem;
            margin-top: 0.2rem;
            color: #ff5547;
            font-size:0.28rem;
          }
        }
      }
    }
  }
}
</style>