<template>
  <div class="makeContainer">
    <div class="titleContainer" v-if="showflag">
      <van-row>
        <van-col span="22">
           <van-row class="title_con">
              <van-col span="12"><span class="title_name" v-text="photoName"></span></van-col>
              <van-col span="12" style="text-align:right;"><a href="javascript:;" class="detail_name">查看详情<i>></i></a></van-col>
           </van-row>
          <div class="make_container">
            <ul class="make_list">
              <li v-for="(item,index) in modelLists" :key="index">
                 <span v-if="index == 0" class="cover">封面</span>
                 <span v-else v-text="index"></span>
                 <div><img :src="item.img" alt="1"/></div>
              </li>
            </ul>
            <div class="iconcontainer">
              <van-row>
                <van-col span="8">
                  <span class="preview_icon d-i-b" @click="previewFn()">
                    <img src="../../images/preview.png" alt="预览">
                  </span>
                </van-col>
                <van-col span="8">
                  <span class="onload_icon d-i-b">
                    <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple class="fileImage">
                      <van-icon name="photograph" />
                    </van-uploader>
                    <!-- <input id="fileImage" class="fileImage" type="file"  accept="image/*" capture="camera" size="30"> -->
                    <img src="../../images/onload.png" alt="上传">
                    <span class="mark">20</span>
                  </span>
                </van-col>
                <van-col span="8">
                  <span class="save_icon d-i-b">
                    <img src="../../images/save.png" alt="保存" @click="saveFn()">
                  </span>
                </van-col>
              </van-row>
            </div>
          </div>
           
        </van-col>
        <van-col span="2">
          <div class="scaling scale">
             <img src="../../images/scale.png" alt="" @click="showflag=false;" class="icon_img"/>
          </div>  
        </van-col>
      </van-row>
      
    </div>
     <div class="titleContainer" v-else>
      <van-row>
        <van-col span="17" :key="index1">
           <van-row class="title_con">
              <van-col span="12"><span  class="title_name" v-text="photoName"></span></van-col>
              <van-col span="12" style="text-align:right;"><a href="javascript:;" class="detail_name">查看详情<i>></i></a></van-col>
           </van-row>
          <div class="make_container">
            <ul class="make_list">
              <li v-for="(item,index) in modelLists" :key="index">
                 <span v-if="index == 0" class="cover">封面</span>
                 <span v-else v-text="index"></span>
                 <div><img :src="item.img" alt="1"/></div>
              </li>
            </ul>
            <div class="iconcontainer iconcontainershow">
              <van-row>
                <van-col span="8">
                  <span class="preview_icon d-i-b" @click="previewFn()">
                    <img src="../../images/preview.png" alt="预览">
                  </span>
                </van-col>
                <van-col span="8">
                  <span class="onload_icon d-i-b" @click="markflag=true;">
                    <!-- accept="image/*;capture=camera" 直接调用相机
                        accept="image/*" 调用相机 图片或者相册 -->
                    <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple class="fileImage">
                      <van-icon name="photograph" />
                    </van-uploader>
                    <!-- <input id="fileImage" class="fileImage" type="file"  accept="image/*" capture="camera" size="30"> -->
                    <img src="../../images/onload.png" alt="上传">
                    <span class="mark">20</span>
                  </span>
                </van-col>
                <van-col span="8">
                  <span class="save_icon d-i-b">
                    <img src="../../images/save.png" alt="保存" @click="saveFn()">
                  </span>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-col>
        <van-col span="7">
          <div class="scaling ">
             <img src="../../images/scale.png" alt="" @click="showflag=true;" class="icon_img"/>
             <div class="option_container">
               
               <select class="tc">
                 <option :value ="item.id" v-for="item in tabarys" :key="item.id">{{item.name}}</option>
               </select>
             </div>
             <ul class="prewimg">
               <li v-for="(item,index) in modelLists" :key="index">
                 <div @click="selectPrewImgFn(index)" :class="index==i?'selDiv':''">
                   <img :src="item.img" alt="1" />
                 </div>
               </li>
             </ul>
          </div>  
        </van-col>
        </van-row>
    </div>
    
  </div>
</template>

<script>
import SERVERUTIL from "../../lib/SeviceUtil";
  export default {
    data(){
      return{
        photoName:"" ,
        tabarys:[], //模板类型列表
        modelLists:[  //列表
          {
            'name':'冬季的旅行',
             imageLists:[
               '../../images/model1.jpg','../../src/images/model2.jpg','../../src/images/model3.jpg','../../src/images/model4.jpg'
             ]
          }
        ],
        showflag:true,
        i:0  //当前选中的列表项
      }
    },
    methods:{
      //右侧的点击每一项
      selectPrewImgFn(index){
        var this_ = this;
        this_.i = index;
      },
      //获取模板类型
      modelTypeFn(){
        var this_ = this;
        var obj={"service":"getTemplateType"};
        SERVERUTIL.base.baseurl(obj).then(res => {
          if(res.data.code ==0){
            if(res.data.data){
              this_.tabarys = res.data.data;

            }
          }
        })
        .catch(error => {
          console.log(error);
        });
      },
      //获取详情列表
      detailListsFn(id){
        var this_ = this;
        var obj={"service":"getTemplateDetailInfo","id":id};
        SERVERUTIL.base.baseurl(obj).then(res => {
          console.log(res)
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
      onRead(file) {
       console.log(file)
      }, 
      //预览功能
      previewFn(){

      },
      //保存功能并跳到保存成功页面
      saveFn(){
        var this_ = this;
        this.$router.push({  
          path: '/savesuccess',
          name: 'SAVESUCCESS',  
          params: {   
            id:this_.$route.params.id
          }, 
          // query: {  
          //   name:name,   
          //   id: id
          // }
        }) 
      }
    },
    mounted(){
      var this_= this;
      document.title = '马上制作';
      this_.photoName = this_.$route.params.name;
      var id= this_.$route.params.id;
      this_.detailListsFn(id);
      this_.modelTypeFn();
      
    }      
  }
</script>

<style scoped lang="scss" type="text/css">
body{
  // background: lightcyan;
}
 .makeContainer{
   margin-left:0.3rem;
   .titleContainer{
     width: 100%;
     .title_con{
       margin:0.26rem 0 0.6rem 0rem;
       .title_name,.detail_name{
        font-size: 0.32rem;
        }
      .detail_name{
        font-size: 0.26rem; 
        margin-right:0.2rem;
        color: #ff4747;
        text-align: right;
        i{
          margin-left:0.08rem;
        }
      }
     }
     .scaling{
       position: fixed;
       width: 2.2rem;
       height: 14rem;
       background: white;
       .icon_img{
         position: absolute;
         top: 40%;
         left: -0.42rem;
       }
       .option_container{
         margin: 0 auto;
         select{
          display: block;
          border:none;
          outline:none;
          margin: 0.36rem auto 0.56rem;
          appearance:none;
          -moz-appearance:none;
          -webkit-appearance:none;
          option{
            border:none;
            outline:none;
            text-align: center;
            color: #333;
            font-size: 0.28rem;
          }
          &:fouce{
            border: 0px;
            outline:none;
          }
        }
       }
      
       .prewimg{
         display: flex;
         flex-direction: column;
         
         li{
           width: 100%;
           height: 100%;
           margin-bottom: 0.3rem;
           display: flex;
           flex-direction: column;
           div,.selDiv{
             margin: 0 auto;
             width: 1.6rem;
             height: 2.2rem;
             background: url(../../images/rightbg.png) no-repeat;
             background-size: contain;
             padding: 5px;
             box-sizing: border-box;
             img{
               width: 90%;
               height: 90%;
            }
           }
           .selDiv{
             width: 1.78rem;
             height: 2.38rem;
             background: url(../../images/rightselectbg.png) no-repeat;
             background-size: contain;
           }
           
         }
       }
     }
     .make_container{
       position: relative;
      .make_list{
       display: flex;
       flex-direction: column;
       li{
         display: flex;
         flex-direction: row;
         justify-content:center;
         margin-bottom: 0.36rem;
         span{
           width: 0.26rem;
           height: 0.26rem;
           line-height: 0.26rem;
           padding: 0.05rem;
           color: #999;
           background-color: #ddd;
           border-radius: 0.2rem;
           margin-right: 0.4rem;
           font-size: 0.18rem;
           text-align: center;
         }
         .cover{
           display: inline-block;
           width: 0.56rem;
           color: #fff;
           margin-right: 0.1rem;
           background-color: #4eb958;
           border-radius: 0.2rem;
         }
         div{
           width: 3.86rem;
           height: 5.19rem;
           background: url(../../images/coverbg.png) no-repeat;
           background-size: contain;
           margin-top: -3px;
           img{
             width: 90%;
             height: 90%;

           }
         }
       }
      }
      .iconcontainer,.iconcontainershow{
        position: fixed;
        bottom:1rem;
        padding: 0 0.6rem;
        box-sizing: border-box;
        .preview_icon,.onload_icon,.save_icon{
          width: 1.2rem;
          height: 1.2rem;
          margin: 0 0.3rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .onload_icon{
          position: relative;
          .mark{
            position: absolute;
            top: 0.15rem;
            right: 0.1rem;
            background: #ff4747;
            border-radius: 50%;
            color: white;
            padding: 0.02rem;
          }
        }
        .fileImage{
          position: absolute;
          height: 1rem;
          width: 1rem;
          z-index: 999;
          opacity: 0;
        }
      }
      .iconcontainershow{
        width: 70%;
      }
     }
     
     } 
   
 }
</style>