<template>
  <div class="detailContainer">
     <div class="showContainer">
        <img :src="detailinfo.img" alt="封面">
        <!-- <p>曾为你买过很多礼物<br>
           而这一次只想做一份属于我们的独家记忆<br>
           记录你的眉毛<br>
           你的回眸
        </p> -->
     </div>
     <div class="infoContainer">
        <h3>好品质保留更长久</h3>
        <sub>Good quality lasts longer</sub>
        <div class="introduceContainer">
           <div class="introduceTitle">材质介绍</div> 
           <ul class="materialList" >
             <li v-for="item in detailImg">
                <div class="imgbor">
                  <div class="imgshadow">
                    <img :src="item" alt="模板">
                  </div>
                </div>
                <!-- <h4>牛皮材质</h4> -->
             </li>
           </ul>
        </div>
        <div class="playbt" @click="jumptostartmakeFn()">
            马上制作
        </div>
     </div>
  </div>
</template>

<script>
import SERVERUTIL from "../../lib/SeviceUtil";
import UTILS from "../../lib/utils";
import { mapState, mapMutations } from "vuex";
  export default {
    data(){
      return{
        detailtitle:"",
        detailinfo:{},
        detailImg:[]
      }
    },
    methods:{
      //获取模板详情
      modelDetailFn(id){
        var this_ = this;
        var obj={"service":"getTemplateInfo","id":id};
        SERVERUTIL.base.baseurl(obj).then(res => {
          if(res.data.code ==0){
            if(res.data.data){
              this_.detailinfo = res.data.data;
              this_.detailImg = this_.detailinfo.img_detail.split(",");
            }
          }
        }).catch(error => {
          console.log(error);
        });
      },
      //跳转开始制作
      jumptostartmakeFn(){
        var this_ = this;
        this.$router.push({  
          path: 'startmake',   
          name: 'STARTMAKE',  
          params: {   
            name: this_.detailtitle,
            id:this_.$route.params.id
          }
        });
      },
      ...mapMutations([
        "changeToken","changeModelTypeId","changeModelTypeName","changeModelId"
      ])
    },
    mounted(){
      var this_= this;
      this_.detailtitle = this_.modeltypename;
      document.title = this_.detailtitle;
      this_.modelDetailFn(this_.modelid);
    },
    computed:{
      ...mapState(['token',"modeltypeid","modeltypename","modelid"])
    } 
  }
</script>

<style scoped lang="scss" type="text/css">
 .detailContainer{
   padding: 0 0.4rem;
   box-sizing: border-box;
   .showContainer{
     position: relative;
     height: 4.42rem;
     background: url(../../images/yunnan1.jpg) no-repeat;
     img{
       position: absolute;
       width: 100%;
       height: 4.42rem;
     }
     p{
      position: absolute;
      left:0.2rem;
      bottom:0.1rem;
      font-size: 0.28rem;
      color: white;
     }
   }
   .infoContainer{
     margin-top:0.48rem;
     text-align: center;
     h3{
       font-size: 0.48rem;
     }
     .introduceContainer{
       margin:0.2rem 0 0.38rem 0;
       .introduceTitle{
         margin: 0.2rem auto 0.38rem;
         width: 1.28rem;
         height: 0.38rem;
         font-size: 0.24rem;
         border: 1px solid black;
         box-shadow: 1px 1px 0px  0px black;
       }
       .materialList{
         width: 100%;
         height:200px;
         padding: 0 0.2rem;
         box-sizing: border-box;
         display: flex;
         flex-direction: row ;
         flex-wrap: wrap ;
         justify-content:center;
         li{
           width: 40%;
           margin: 15px;
           .imgbor {
             width: 100%;
             height: 90%;
             border:1px solid #AFAFAF;
             .imgshadow{
               position: relative;
               right:-2%;
               top: 3%;
               width: 100%;
               height: 95%;
               //background: lightgray;
               img{
                width: 95%;
                height: 98%;
                position: relative;
                right:-1%;
                top: 1%;
                box-shadow: -2px 0px 3px 3px  rgba(0, 0, 0, 0.6);
               }
             }
             
           }
         }
       }
     }
     .playbt{
       position: fixed;
       bottom: 0rem;
       left: 0;
       width: 100%;
       height: 1rem;
       line-height: 1rem;
       background: white;
       border-top:1px solid #ddd; 
       color: #ff4747;
       font-size: 0.32rem;
       text-align: center;
     }
   }
   .detailtitle{
     height: 0.88rem;
     line-height: 0.88rem;
     font-size: 0.38rem;
     color:#000;
     text-align: center;
   }
 }
</style>