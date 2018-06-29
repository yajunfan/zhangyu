<template>
  <div class="gift_container">
     <!-- 有礼品卡 -->
    <div v-if="ifgiftflag">
      <div class="tabcontent h88">
          <ul class="tablist h88">
            <li class="tc h88" @click="selectLiFn(0,'has')" :class="active==0?'selecLi':''">可用卡<a href="javascript:;" >（{{Vnum}}）</a></li>
            <li class="tc h88" @click="selectLiFn(1,'no')" :class="active==1?'selecLi':''">不可用卡<a href="javascript:;">（{{notVnum}}）</a></li>
          </ul>
      </div>
      <div class="tabListcontent" >
        <ul  v-if="active==0">
          <li v-for="(item,index) in vailableList" :key="index">
            <div class="gift_title">
               <van-row>
                  <van-col span="12"><span class="title_left" v-text="item.title"></span></van-col>
                  <van-col span="12" class="select_con" ><span v-if="vgiftflag" class="select_icon" :class="item.iconflag?'selectSpan_icon':''"  @click="selecticonFn(item.iconflag,index)"></span></van-col>
               </van-row>
              </div>
            <div class="gift_price">
              <van-row>
                  <van-col span="24"><span class="price_left">余额：￥</span><span class="price_right"><i v-text="item.left_price"></i>.00</span></van-col>
              </van-row>
              </div>
            <div class="gift_info">
              <van-row>
                  <van-col span="12"><span class="parvalue_left">面值：<i v-text="item.price"></i> </span></van-col>
                  <van-col span="12"><span class="parvalue_right">有效期：<i v-text="item.expire_time"></i></span></van-col>
              </van-row>
            </div>
          </li>
        </ul>
        <ul  v-if="active==1" class="no_use_container">
           <li v-for="(item,index) in notAvailableList" :key="index">
            <div class="gift_title">
               <van-row>
                  <van-col span="12"><span class="title_left" v-text="item.title"></span></van-col>
               </van-row>
              </div>
            <div class="gift_price">
              <van-row>
                  <van-col span="24"><span class="price_left">余额：￥</span><span class="price_right"><i v-text="item.left_price"></i>.00</span></van-col>
              </van-row>
              </div>
            <div class="gift_info">
              <van-row>
                  <van-col span="12"><span class="parvalue_left">面值：<i v-text="item.price"></i> </span></van-col>
                  <van-col span="12" class="tr"><span class="parvalue_right">有效期：<i v-text="item.expire_time"></i></span></van-col>
              </van-row>
            </div>
            <div class="mark_fail" :class="item.flag?'mark_fail_expire':''"></div>
          </li>
        </ul>
        <!-- 使用说明和绑定操作 -->
        <div class="tip_container tc" v-if="active==0">
          <a href="javascript:;" @click="bindgiftcardFn" class="introduce_icon d-i-b"><i class=" d-i-b"></i>使用说明</a>
          <a href="javascript:;" @click="giftcardintrucFn" class="bindgift_icon d-i-b" v-if="word_use"><i class=" d-i-b"></i>绑定礼品卡</a>
        </div>
      </div>
    </div>
    <!-- 无礼品卡 -->
    <div v-else>
      <div class="tabcontent  h88">
          <ul class="tablist h88">
            <li class="tc h88" @click="selectLiFn(0,'has')" :class="active==0?'selecLi':''">可用卡<a href="javascript:;"   >（0）</a></li>
            <li class="tc h88" @click="selectLiFn(1,'no')" :class="active==1?'selecLi':''">不可用卡<a href="javascript:;"  >（0）</a></li>
          </ul>
      </div>
      <div class="no_gift_tip">
        <img src="../../images/giftbg.png" alt=".">
      </div>
      <p class="tc">暂无可用礼品卡</p>
    </div>
    
    <!-- 绑定礼品卡 -->
    <div class="bind_giftcard tc" v-if="!word_use && active==0 " @click="giftcardintrucFn">绑定礼品卡 </div>
    <div class="bind_giftcard tc" v-if="word_use" @click="sureusecardFn">确认使用 </div>
    <van-popup v-model="showgift" class="bindgift_container" :overlay-style = "overstyleObj" >
      <div >
         <h4 class="tc">绑定礼品卡</h4>
         <div class="ps_input"><input type="text" v-model="giftpassword" placeholder="请输入礼品卡的密码"></div>
         <p v-if="errorflag" v-text="message"></p>
         <div class="sure_btn tc" @click="sureFn()">确定</div>
      </div>
    </van-popup>
    <!-- 使用说明 -->
    <van-popup v-model="showgiftinfo" class="bindgift_container giftinfo_container" :overlay-style = "overstyleObj" >
      <div >
         <h4 class="tc">礼品卡使用说明</h4>
         <p >章鱼书礼品为不记名卡，卡有效期自激活之日起36个月有效</p>
         <div class="sure_btn tc" @click="sureFn()">知道了</div>
      </div>
    </van-popup>
 </div>
</template>
<script>
import SERVERUTIL from "../../lib/SeviceUtil";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      active: 0,
      activeicon: 0,
      ifgiftflag: false, //是否有礼品卡
      showgift: false, //是否显示绑定礼品卡弹框
      showgiftinfo: false, //是否显示使用说明弹框
      giftpassword: "",
      overclickflag: false, //蒙层点击
      overstyleObj: {
        //蒙层样式
        background: "rgba(0,0,0,0.3)"
      },
      errorflag: false, //错误显示
      notAvailableList: [ ],//不可用礼品卡
      notVnum:"", //不可用卡的数量
      Vnum:"", //可用卡数量
      vailableList:[],  //可用礼品卡
      tipbindgiftflag:false //绑定礼品卡的小提示连接
    };
  },
  methods: {
    //tab切换
    selectLiFn(index,status) {
      var this_ = this;
      this_.active = index;
    },
    //获取可用礼品卡的数据
    getUserCardFn(token,status){
      var this_ = this;
      var obj={"service":"getUserCard","stoken":token,"status":status};
      SERVERUTIL.base.baseurl(obj).then(res => {
        if(res.data.code ==0){
          if(res.data.data){
            this_.giftcardnum = res.data.data.length;
            var giftary = res.data.data;
            giftary.forEach(item =>{
              item.left_price = Number(item.left_price).toFixed(0);
              if(item.status ==1){
                this_.vailableList.push(item);
                item.iconflag = false;
              }else if(item.status == 2){
                if(item.card_type_id ==1){
                  item.flag=false;
                }else if(item.card_type_id == 2){
                  item.flag=true;
                };
                this_.notAvailableList.push(item);
              };
            });
            this_.notVnum = this_.notAvailableList.length;
            this_.Vnum = this_.vailableList.length;
          }
        }
       }).catch(error => {
        console.log(error);
      });
    },
    //选择使用礼品卡
    selecticonFn(flag, id) {
      var this_ = this;
      this_.vailableList[id].iconflag = !flag;
      this_.$set(this_.vailableList, id, this_.vailableList[id]);
    },
    //绑定礼品卡
    bindgiftcardFn() {
      var this_ = this;
      this_.showgiftinfo = true;
    },
    //礼品卡使用说明
    giftcardintrucFn(){
      var this_ = this;
      this_.showgift = true;

    },
    //确认使用礼品卡
    sureusecardFn(){
      var this_ = this;
      var selectgift = [];
      this_.vailableList.forEach(item=>{
        if(item.iconflag){
          selectgift.push(item);
        }
      });
      this_.changeGiftlist(selectgift);
      this_.$router.push({  
        path: '/confirmpay',
        name: 'CONFIRMPAY',  
        params: {   
          vailableList: selectgift
        }
      });
    },
    //绑定礼品卡的确认
    sureFn() {
      var this_ = this;
      // 写密码错误时候的相关逻辑
      var obj={
        service:"exchangeCard",
        stoken:this_.token,
        pwd:this_.giftpassword
      };
      SERVERUTIL.base.baseurl(obj).then(res => {
        this_.message=res.data.message;
        if(res.data.code == 0){
          this_.getUserCardFn(this_.token,"");
          this_.showgift = false;
        }else{
          this.errorflag = true;
        }
      }).catch(error => {
        console.log(error);
      });
    },

    oreClose(action, done) {
      if (action === "confirm") {
        setTimeout(done, 1000);
      } else {
        done();
      }
    },
    ...mapMutations([
      "changeToken","changeObj","changeGiftlist","changeGift"
    ])
  },
  mounted() {
    var this_ = this;
    this_.ifgiftflag = this_.$route.params.flag;
    document.title = "我的礼品卡";
    this_.getUserCardFn(this_.token,"");
  },
  computed:{
    word_use(){
      let a=false;
      this.vailableList.forEach(item=>{
        if(item.iconflag){
          a=true;
        }
      })
      return a;
    },
    ...mapState(['token',"bookinfo","vgiftuserlist","vgiftflag"])
  }
};
</script>

<style scoped lang="scss" type="text/css">
.gift_container {
  //height: 15rem;
  .tabcontent {
    .tablist {
      display: flex;
      flex-direction: row;
      background: white;
      li {
        flex-grow: 2;
        font-size: 0.32rem;
      }
      .selecLi {
        color: #ff4747;
        a {
          color: #ff4747;
        }
      }
    }
  }
  .tabListcontent {
    padding-bottom:1.6rem;
    ul {
      display: flex;
      flex-direction: column;
      padding: 0 0.3rem;
      box-sizing: border-box;
      li {
        width: 100%;
        height: 3rem;
        margin-top: 0.4rem;
        background: white;
        border-radius: 0.2rem;
        background: url(../../images/giftcardbg.png) no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
        .gift_title,
        .gift_price,
        .gift_info {
          span {
            display: inline-block;
          }
          .title_left {
            color: #111;
            font-size: 0.34rem;
            margin: 0.3rem 0 0 0.24rem;
            box-sizing: border-box;
          }
          .select_con {
            height: 100%;
            margin-top: 0.24rem;
            text-align: right;
            .select_icon,
            .selectSpan_icon {
              background: url("../../images/noselect.png") no-repeat;
              width: 0.3rem;
              height: 0.3rem;
              background-size: 100% 100%;
              margin-right: 0.25rem;
            }
            .selectSpan_icon {
              background: url("../../images/select.png") no-repeat;
              background-size: 100% 100%;
            }
          }
        }
        .gift_info {
          width: 99%;
          height: 0.8rem;
          border-top: 1px solid #a6a6a6;
          color: #a6a6a6;
          span ,i{
            font-size: 0.30rem;
          }
          span.parvalue_left{
            padding-left:0.24rem;
            padding-top:0.1rem;
          }
         span.parvalue_right{
           margin-left: 0.4rem;
          
            padding-top:0.1rem;
          }
        }
        .gift_price {
          padding-top: 0.2rem;
          height: 1.18rem;
          color: #ff5547;
          width: 50vw;
          padding-left: 25vw;
          .price_left {
            font-size: 0.28rem;
          }
          .price_right {
            i {
              font-size: 0.5rem;
            }
          }
        }
      }
    }
    .tip_container{
      margin-top: 0.3rem;
      .introduce_icon{
        margin-right: 0.23rem;
      }
      .bindgift_icon{
        margin-left: 0.23rem;
      }
      .introduce_icon,.bindgift_icon{
        i{
          width:0.24rem;
          height: 0.18rem;
          background: url(../../images/bindcard.png) no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
          margin-right:0.1rem;
        }
      }
      .introduce_icon{
        i{
          width:0.26rem;
          height: 0.26rem;
          background: url(../../images/tip.png) no-repeat;
          background-size: 100% 100%;
        }
        
      }
    }
    .no_use_container{
      li{
        position: relative;
        background:#ddd; 
        .gift_title,.gift_price{
          color: #999;
          span{
            color: #999;
          }
        }
        .gift_info{
          color: #8f8f8f;
        }
        .mark_fail{
          position: absolute;
          width: 1.06rem;
          height: 1.4rem;
          top: 0.6rem;
          right: 0;
          background: url(../../images/failure.png) no-repeat;
          background-size: 100% 100%;
        }
        .mark_fail_expire{
          background: url(../../images/expired.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .no_gift_tip {
    width: 0.9rem;
    height: 0.86rem;
    margin: 2.2rem auto 0.3rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
      font-size: 0.24rem;
      color: #999;
    }
  .bind_giftcard {
    position: fixed;
    width: 90vw;
    left: 5.5vw;
    height: 1rem;
    bottom: 0.2rem;
    background: url(../../images/longbtn.png) no-repeat;
    background-size: contain;
    line-height: 0.8rem;
    color: white;
    font-size: 0.28rem;
  }
  .bindgift_container {
    //position: relative;
    width: 5.5rem;
    height: 3.06rem;
    background: white;
    border-radius: 8px;
    h4 {
      margin: 0.2rem;
      font-size: 0.3rem;
      color: #111;
    }
    p {
      padding: 0.1rem 0.3rem;
      box-sizing: border-box;
      color: #ff5547;
      font-size: 0.24rem;
    }
    .ps_input {
      padding: 0 0.3rem;
      box-sizing: border-box;
      height: 0.8rem;
      input {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        border: 0;
        -webkit-appearance: none;
        border: 1px solid #ccc;
        padding-left: 0.2rem;
        color: #999;
        box-sizing: border-box;
      }
    }
    .sure_btn {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      background: #ff4747;
      color: #fff;
      font-size: 0.3rem;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
  .giftinfo_container{
    p{
      color: #999;
    }
    .sure_btn{
      background: none;
      color: #ff5547;
      border-top: 1px solid rgb(241, 240, 240);
    }
  }
}
</style>