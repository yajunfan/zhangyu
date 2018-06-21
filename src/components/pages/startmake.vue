<template>
  <div class="makeContainer">
    
    <div class="titleContainer">
       <span v-text="photoName" class="title_name"></span>
       <a href="javascript:;" class="detail_name">查看详情<i>></i></a>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        photoName:"" 
      }
    },
    methods:{
    },
    mounted(){
      var this_= this;
      console.log(this_.$route)
      this_.photoName = this_.$route.params.name;
      document.title = this_.photoName;
    }      
  }
</script>

<style scoped lang="scss" type="text/css">
 .makeContainer{
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


   } 
 }
</style>