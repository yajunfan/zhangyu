<template>
  <div class="save_container" @dblclick="editBookFn">
     <ul class="photo_list" :class="markflag?'photo_list_fix':''" v-if="ifedit">
        <li v-for="item in modelLists">
           <img  v-lazy="item.imgtrueurl" alt="muban">
        </li>
     </ul>
     <ul class="photo_list" :class="markflag?'photo_list_fix':''" v-if="!ifedit">
        <li v-for="item in modelLists"  v-if="item.liflag">
           <img  v-lazy="item.imgtrueurl" alt="muban" @click="editBookFn">
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
             <img  v-lazy="modelimg" alt="模板" class="logo_img" >
             <ul class="detail_container">
                <li class="detail_title"><span v-text="detailinfo.title" ></span></li>
                <li class="detail_specifications"><span>规格：</span><span v-text="detailinfo.size"></span></li>
                <li class="detail_price"><span>￥</span><span v-text="modelprice"></span></li>
             </ul>
           </div> 
           <div class="type_body">
              <h4>选择种类</h4>
              <ul class="type_list">
                <li v-for="(item,index) in paytypelist" v-text="item.name" @click="selectTypeFn(index,item)" :class="index==i?'selectLi':''"></li>
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
import { mapState, mapMutations } from "vuex";
  export default {
     data(){
       return{
         markflag:false,
         ifedit:true, //是否可编辑
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
         selectItem: {},
         detailinfo:{} ,//图书信息规格
         paytypelist:[] , //不同种类的价格
         detailImg:[], // 不同的图片
         modelprice:"" , //模板价格
         modelimg:"" ,// 模板的图片
       }
     },
     methods:{
      //获取图书页面的详情
      getBookDetailInfoFn(token,id){
        var this_ = this;
        var obj={"service":"getBookDetailInfo","id":id,"stoken": token,};
        SERVERUTIL.base.baseurl(obj).then(res => {
          if(res.data.code ==0){
            if(res.data.data){
              this_.modelLists = res.data.data;
              var imgary = [];
              if(this_.modelLists.length){
                this_.modelLists.forEach(item =>{
                  item.liflag=false;
                  if(item.result_img.length){
                    item.imgtrueurl= item.result_img;
                    item.liflag=true;
                    imgary.push({"imgtrueurl":item.imgtrueurl,"flag":true});
                  }else{
                    item.imgtrueurl= item.template_img;
                    imgary.push({"imgtrueurl":item.imgtrueurl,"flag":false});
                  };
                });
                this_.changeimg(imgary);
              }
              
            }
          }
        }).catch(error => {
          console.log(error);
        });
      },
      //选规格
      selectTypeFn(index,obj){
         var this_ = this;
         this_.i = index;
          this_.modelprice = this_.paytypelist[index].price;
          this_.modelimg = this_.detailImg[index];
          this_.selectItem = obj;
          this_.selectItem.size=this_.detailinfo.size;
          this_.selectItem.title = this_.detailinfo.title;
          this_.selectItem.modelimg = this_.detailImg[index];
       },
     
      //获取制作图书的规格信息 -- getTemplateInfo
      modelDetailFn(id){
        var this_ = this;
        var obj={"service":"getTemplateInfo","id":id};
        SERVERUTIL.base.baseurl(obj).then(res => {
          if(res.data.code ==0){
            if(res.data.data){
              this_.detailinfo = res.data.data;
              if(this_.detailinfo.hasOwnProperty('size')){
                this_.paytypelist = JSON.parse(this_.detailinfo.price);
                this_.detailImg = this_.detailinfo.img_detail.split(",");
                if(typeof(this_.paytypelist)== 'object'){
                  this_.selectItem = this_.paytypelist[0];
                  this_.selectItem.size = this_.detailinfo.size;
                  this_.selectItem.title = this_.detailinfo.title;
                  this_.selectItem.modelimg = this_.detailImg[0];
                  this_.modelprice = this_.paytypelist[0].price;
                }
                
                this_.modelimg = this_.detailImg[0];
                
              } 
            }
          }
        }).catch(error => {
          console.log(error);
        });
      },
       //点击下一步跳到付款页面
       jumptopay(obj){
        var this_ = this;
        this_.changeObj(obj);
        this.$router.push({  
          path: '/confirmpay',
          name: 'CONFIRMPAY',  
          params: {   
            data: obj
          }
        }); 
       },
       //编辑图书
       editBookFn(){
         var this_ = this;
         consoel.log(111)
       },
       ...mapMutations([
        "changeToken","changeModelTypeId","changeModelTypeName","changeModelId","changeObj","changebookid","changeimg"
       ])
     },
     mounted(){
      var this_= this;
      document.title = '保存成功';
      if(this_.$route.params.title){
        var title = this_.$route.params.title;
         document.title = '预览';
      };
      this_.ifedit = this_.$route.params.flag;
      console.log(this_.ifedit)
      this_.getBookDetailInfoFn(this_.token,this_.vbookid);
      this_.modelDetailFn(this_.modelid);
      
    },
    computed:{
      ...mapState(['token',"modeltypeid","modeltypename","modelid","bookinfo","vbookid","vloadimg"])
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
      position: relative;
      margin-bottom:0.8rem;
      img{
        width: 5.94rem;
        height: 8.20rem;
      }
      .load_img{
        width: 3.94rem;
        height: 6.20rem;
        position: absolute;
        top:0;
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