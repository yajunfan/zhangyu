<template>
 <div class="gift_container">
     <!-- 有礼品卡 -->
   <div v-if="ifgiftflag">
     <div class="tabcontent h88">
          <ul class="tablist h88">
            <li class="tc h88" @click="selectLiFn(0)" :class="active==0?'selecLi':''">可用卡<a href="javascript:;" >（0）</a></li>
            <li class="tc h88" @click="selectLiFn(1)" :class="active==1?'selecLi':''">不可用卡<a href="javascript:;">（1）</a></li>
          </ul>
      </div>  
   </div>
   <!-- 无礼品卡 -->
   <div v-else>
      <div class="tabcontent  h88">
          <ul class="tablist h88">
            <li class="tc h88" @click="selectLiFn(0)" :class="active==0?'selecLi':''">可用卡<a href="javascript:;"   >（0）</a></li>
            <li class="tc h88" @click="selectLiFn(1)" :class="active==1?'selecLi':''">不可用卡<a href="javascript:;"  >（0）</a></li>
          </ul>
      </div>
   </div>
   <!-- 绑定礼品卡 -->
   <div class="bind_giftcard tc">绑定礼品卡 </div>
 </div>
</template>

<script>
  export default {
    data(){
      return{
        active:0,
        ifgiftflag:true
      }
    },
    methods:{
      selectLiFn(index){
        var this_ = this;
        this_.active = index;
      }
    },
    mounted(){
      var this_= this;
      this_.ifgiftflag = this_.$route.params.flag;
      document.title = '首页';
    }  
  }
</script>

<style scoped lang="scss" type="text/css">
.gift_container{
    //height: 15rem;
  .tabcontent{
    .tablist{
        display: flex;
        flex-direction: row;
        background: white;
      li{
        flex-grow: 2;
        font-size: 0.32rem;
      }
      .selecLi{
        color: #ff4747;
        a{
         color: #ff4747;
        }
      }  
    }   
  }
  .bind_giftcard{
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
}
</style>