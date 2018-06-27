<template>
  <div class="save_container">
     <ul class="photo_list" :class="markflag?'photo_list_fix':''">
         <li v-for="item in modelLists">
            <img :src="item.img" alt="muban">
         </li>
     </ul>
     <div class="btn_container" v-if="!markflag">
       <van-row>
         <van-col span="12">
           <van-button bottom-action class="btn_share">分享</van-button>
         </van-col>
         <van-col span="12">
            <van-button  bottom-action class="btn_make" @click="markflag=true;">制作相册</van-button>
         </van-col>
       </van-row>
     </div>
     <div class="price_container" v-else>
       <div class="mark_container">
        <van-row>
         <van-col span="21">
           <div class="type_header">
             <img src="../../images/title1.jpg" alt="模板" class="logo_img" >
             <ul class="detail_container">
                <li class="detail_title"><span>冬季的旅行</span></li>
                <li class="detail_specifications"><span>规格：</span><span v-text="selectItem.specifications"></span></li>
                <li class="detail_price"><span>￥</span><span v-text="selectItem.price"></span></li>
             </ul>
           </div> 
           <div class="type_body">
              <h4>选择种类</h4>
              <ul class="type_list">
                <li v-for="(item,index) in styleAry.typeList" v-text="item.name" @click="selectTypeFn(index)" :class="index==i?'selectLi':''"></li>
              </ul>
           </div>
         </van-col>
         <van-col span="3">
            <span><img src="../../images/close.png" alt="关闭" @click="markflag=false;" class="close_img"></span>
         </van-col>
        </van-row>   
        <div class="detail_next" @click="jumptopay(selectItem)">下一步</div>
      </div>
     </div>
    
  </div>
</template>

<script>
import SERVERUTIL from "../../lib/SeviceUtil";
  export default {
     data(){
       return{
         markflag:false,
         i:0,
         modelLists:[], //列表
         styleAry:{
           "logoimg":"../../images/title1.jpg",
           "title":"冬季的旅行",
            "typeList":[
              {
                "name":"轻奢杂志",
                "specifications":"20cm*30cm",
                "price":"233.00"
              },
              {
                "name":"简版杂志",
                "specifications":"20cm*30cm",
                "price":"210.00"
              },
              {
                "name":"其他杂志",
                "specifications":"20cm*30cm",
                "price":"133.00"
              }
            ]
         },
         selectItem: {
            "name":"轻奢杂志",
            "specifications":"20cm*30cm",
            "price":"233.00"
         },
       }
     },
     methods:{
       //选规格
       selectTypeFn(index){
         var this_ = this;
         this_.i = index;
         this_.selectItem = this_.styleAry.typeList[index];
       },
        //获取详情列表
      detailListsFn(id){
        var this_ = this;
        var obj={"service":"getTemplateDetailInfo","id":id};
        SERVERUTIL.base.baseurl(obj).then(res => {
          if(res.data.code ==0){
            if(res.data.data){
              this_.modelLists = res.data.data;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
      },
       //跳到付款页面
       jumptopay(obj){
        var this_ = this;
        obj.logoimg=this_.styleAry.logoimg;
        this.$router.push({  
          path: '/confirmpay',
          name: 'CONFIRMPAY',  
          params: {   
            data: obj
          }, 
          // query: {  
          //   name:name,   
          //   id: id
          // }
        }); 
       }
     },
     mounted(){
      var this_= this;
      document.title = '保存成功';
      var id= this_.$route.params.id;
      this_.detailListsFn(id);
    }     
  }
</script>

<style scoped lang="scss" type="text/css">
.save_container{
  .photo_list{
    width: 100%;
    padding: 0.94rem 0.78rem 0;
    box-sizing: border-box;
    li{
      margin-bottom:0.8rem;
      img{
        width: 5.94rem;
        height: 8.20rem;
      }
    } 
  }
  .photo_list_fix{
    position: fixed;
  }
  .btn_container{
    position: fixed;
    bottom:0rem;
    width: 100%;
    .btn_share,.btn_make{
      height: 1.28rem;
      background: #4EB958;
      font-size: 0.32rem;
    }
    .btn_make{
      background: #FF4747;  
    }
  }
  .price_container{
     position: fixed;
     top: 0;
     width: 100%;
     height: 15rem;
     background: rgba(0, 0, 0, 0.4);
     z-index: 7008;
    .mark_container{
      position: fixed;
      bottom: 0rem;
      width: 100%;
      height: 5.5rem;
      background: white;  
      padding-left: 0.3rem;
      box-sizing: border-box;
     .type_header{
       margin: 0.15rem 0;
       display: flex;
       flex-direction: row;
       .logo_img{
         width: 1.5rem;
         height: 1.5rem;
         border-radius: 0.1rem;
         border: 1px solid black;
         margin-right: 0.2rem;
       }
       .detail_container{
         .detail_title{
           color: #333;
           margin-bottom:0.14rem;
           span{
             font-size: 0.32rem;
           }
         }
         .detail_specifications{
           color: #999;
           margin-bottom:0.24rem;
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
    .type_body{
       h4{
        color: #111;
        font-size: 0.24rem;
        margin-bottom:0.26rem;
       }
      
       .type_list{
         display: flex;
         flex-direction: row;
         li,.selectLi{
          width: 30%;
          width: 2rem;
          height: 0.6rem;
          line-height: 0.6rem;
          background: #eee; 
          text-align: center;
          border-radius: 0.3rem;
          margin: 0 0.1rem;
          font-size: 0.24rem;
          color: #111;
        }
        .selectLi{
          color: white;
          background: #ff4747;  
        }
        
       }
    } 
    .close_img{
      margin-top: 0.2rem;
    }
    .detail_next{
      margin: 1.1rem auto 0.4rem;
      width: 3.16rem;
      height: 1.06rem;
      line-height: 0.9rem;
      text-align: center;
      background: url('../../images/next.png') no-repeat;
      background-size: cover;
      font-size: 0.28rem;
      color: white;
    } 
   }
  }
}
 
</style>