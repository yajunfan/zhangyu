<template>
  <div class="makeContainer">
    
    <div class="titleContainer" v-if="showflag">
      <van-row>
        <van-col span="22">
          <span v-text="photoName" class="title_name"></span>
          <a href="javascript:;" class="detail_name">查看详情<i>></i></a>
          <div>
            <ul class="make_list">
              <li v-for="(item,index) in 4">
                 <span v-if="index == 0" class="cover">封面</span>
                 <span v-else v-text="index"></span>
                 <img src="" alt="">
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="2">
          <div class="scaling">
             <img src="../../images/scale.png" alt="" @click="showflag=false;">
          </div>  
        </van-col>
        </van-row>
      
    </div>
     <div class="titleContainer" v-else>
      <van-row>
        <van-col span="18">
          <span v-text="photoName" class="title_name"></span>
          <a href="javascript:;" class="detail_name">查看详情<i>></i></a>
        </van-col>
        <van-col span="6">
           <div class="scaling">
             <img src="../../images/scale.png" alt="" @click="showflag=true;">
          </div>
        </van-col>
      </van-row>
       
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        photoName:"" ,
        showflag:true
      }
    },
    methods:{
    },
    mounted(){
      var this_= this;
      this_.photoName = this_.$route.params.name;
      document.title = '开始制作';
    }      
  }
</script>

<style scoped lang="scss" type="text/css">
body{
  background: lightcyan;
}
 .makeContainer{
   background: lightcyan;
   .titleContainer{
     width: 100%;
     .title_name,.detail_name{
       float: left;
       font-size: 0.32rem;
       margin:0.26rem 0 0.6rem 0.3rem;
     }
     .detail_name{
       float: right;
       font-size: 0.26rem; 
       margin-right:0.2rem;
       color: #ff4747;
       i{
         margin-left:0.08rem;
       }
     }
     .scaling{
       position: relative;
       height: 14rem;
       background: white;
       img{
         position: absolute;
         top: 50%;
         left: -0.42rem;
         margin-top: -0.26rem;
       }
     }
     .make_list{
       display: flex;
       flex-direction: column;
     }

   } 
 }
</style>