<template>
 <div class="gift_container">
   <div v-if="ifgiftflag">
     <div class="tabcontent">
          <ul class="tablist">
            <li @click="selectLiFn(0)">可用卡<a href="javascript:;"  :class="active==0?'selecLi':''" >（0）</a></li>
            <li @click="selectLiFn(1)">不可用卡<a href="javascript:;" :class="active==1?'selecLi':''" >（0）</a></li>
          </ul>
      </div>  
   </div>
   <div v-else>
      <div class="tabcontent">
          <ul class="tablist">
            <li @click="selectLiFn(0)">可用卡<a href="javascript:;"  :class="active==0?'selecLi':''" >（0）</a></li>
            <li @click="selectLiFn(1)">不可用卡<a href="javascript:;" :class="active==1?'selecLi':''" >（0）</a></li>
          </ul>
      </div>
   </div>
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
    }  
  }
</script>

<style scoped lang="scss" type="text/css">
.gift_container{
  .tabcontent{
    .tablist{
      li{

      }
      .selecLi{
          
      }  
    }   
  }  
}
</style>