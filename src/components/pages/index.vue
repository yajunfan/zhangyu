<template>
    <div class="indexContainer">
      <div class="tabcontent">
          <ul class="tablist">
            <li v-for="(items,index) in tabarys"><a href="javascript:;" v-text="items.name" @click="active=index;" :class="active==index?'selecta':''" ></a></li>
          </ul>
          <div class="tabListcontent">
            <ul v-for="(items,index) in tabarys" v-if="index == active">
              <li v-for="(item,index2) in items.content" @click="jumptodetail(item.name,index2)">
                 <img :src="item.imgsrc" :alt="item.name">
                 <h4 v-text="item.name"></h4>
               </li>
            </ul>
         </div>
      </div>
      <div class="iconcontainer">
         <span class="print d-i-b" @click="jumptomake()">
            <img src="../../images/print.png" alt="开始制作">
         </span>
         <span class="me d-i-b" @click="jumptoMy()">
            <img src="../../images/me.png" alt="个人中心">
         </span>
      </div>
    </div>
</template>

<script>
import SERVERUTIL from "../../lib/SeviceUtil";
  export default {
    data(){
      return{
        active:0,
        tabarys:[
          {
            "name":'绘本',
            "content":[
              {
                "name":"遇见.彩云之南",
                "imgsrc":"http://images.baixingliangfan.cn/homeFloor/20180407/20180407180109_6316.jpg"  
              },
              {
                "name":"遇见你很高兴",
                 "imgsrc":"../../../static/images/hui2.jpg"  
              },
              {
                "name":"遇见你很高兴",
                "imgsrc":require('../../images/hui3.jpg') 
              }
            ]  
          },
          {
            "name":'旅游',
            "content":[
              {
                "name":"遇见.彩云之南",
                "imgsrc":"../../../static/images/yunnan1.jpg"  
              },
              {
                "name":"遇见你很高兴",
                 "imgsrc":"../../../static/images/yunnan2.jpg"  
                    },
                    {
                      "name":"遇见你很高兴",
                       "imgsrc":"../../../static/images/yunnan3.jpg"  
                    }
                 ]
                   
                },
                {
                  "name":'亲子',
                   "content":[
                    {
                      "name":"遇见.彩云之南",
                       "imgsrc":"../../../static/images/qinzi1.jpg"  
                    },
                    {
                      "name":"遇见你很高兴",
                       "imgsrc":"../../../static/images/qinzi2.jpg"  
                    },
                    {
                      "name":"遇见你很高兴",
                       "imgsrc":"../../../static/images/qinzi3.jpg"  
                    }
                 ]
                   
                }
            ],
            locationIcon:require("../../assets/mybigbt.png")
        }
    },
    methods:{
      //获取模板类型
      modelListFn(){
        var this_ = this;
         var obj={"service":"getTemplateType"};
        // $.post("http://192.144.141.33:8081/api/index/index",obj,
        // function(res){
        //   if(res.code == 0){
        //     if(res.data){
        //       this_.tabarys = res.data;
        //     }
        //   }
        // });
        
        SERVERUTIL.base.baseurl(obj).then(res => {
          if(res.data.result){
            this_.sourceData =JSON.parse(res.data.result);
            this_.sourceDataNew= JSON.parse(JSON.stringify(this_.sourceData)); //深克隆一份
          }
        })
        .catch(error => {
          console.log(error);
        });
      },
      //跳转到详情页面
      jumptodetail(name,id){
        this.$router.push({  
            path: 'detail',   
            name: 'DETAIL',  
            params: {   
              name: name,   
              id: id  
            }, 
            // query: {  
            //   name:name,   
            //   id: id
            // }
        })  
      },
      //跳转到开始制作页面
      jumptomake(){
        var this_ = this;
        this_.$router.push({  
          path: 'startmake',   
          name: 'STARTMAKE',  
          params: {   
            name: ''
          }, 
          // query: {  
          //   name:name,   
          //   id: id
          // }
        }); 
      },
      //跳转到个人中心页面
      jumptoMy(){
        var this_ = this;
        this_.$router.push({  
          path: '/personal',
          name: 'PERSONAL', 
          params: {   
            name: ''
          }, 
          // query: {  
          //   name:name,   
          //   id: id
          // }
        }) 
      }
      
    },
    mounted(){
      var this_ = this;
      document.title = '首页';
      this_.modelListFn()
    }
  }
</script>

<style scoped lang="scss" type="text/css">
.indexContainer{
  .tabcontent{
    .tablist{
      display: flex;
      flex-direction: row;
      padding: 0 10%;
      height: 0.88rem;
      line-height: 0.88rem;
      background: #F2F2F2;
      li{
          width: 33.3%;
          display: inline-block;
          text-align: center;
          font-size: 0.28rem;
          line-height: 0.88rem;
         a{
           font-size:0.28rem;
           color: #999;
         }
         .selecta{
           font-size: 0.32rem;
           color: #ff4747;
           font-weight: 600;  
         }
      }  
    }
    .tabListcontent{
        padding: 0.3rem 0.3rem 0 0.3rem;
        box-sizing: border-box;
        background: white;
      ul{
        width: 100%;
        li{
          width: 100%;
          margin: 0.3rem 0 0 0;
          img{
            width: 100%;
            height: 4.1rem; 
            margin-bottom: 0.2rem;
            border: 1px solid black;
            border-radius: 14px;
          }
          h4{
           font-size: 0.32rem;
           font-weight: 600;   
          }
          
        }
      }  
    }
  }
  .iconcontainer{
     position: fixed;
     bottom:1.1rem;
     right:0.49rem;
    .print,.me{
      width: 1rem;
      height: 1rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
 
  
</style>
