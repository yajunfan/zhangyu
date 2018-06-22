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
            <img src="../../../static/images/print.png" alt="开始制作">
         </span>
         <span class="me d-i-b">
            <img src="../../../static/images/me.png" alt="我">
         </span>
      </div>
    </div>
</template>

<script>
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
                "imgsrc":"../../../static/images/hui1.jpg"  
              },
              {
                "name":"遇见你很高兴",
                 "imgsrc":"../../../static/images/hui2.jpg"  
              },
              {
                "name":"遇见你很高兴",
                "imgsrc":"../../../static/images/hui3.jpg"  
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
      jumptomake(){
        this.$router.push({  
          path: 'startmake',   
          name: 'STARTMAKE',  
          params: {   
            name: ''
          }, 
          // query: {  
          //   name:name,   
          //   id: id
          // }
        }) 
      }
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
        margin-top: 30px;
        padding: 0 30px;
        box-sizing: border-box;
        background: white;
      ul{
        width: 100%;
        li{
          width: 100%;
          margin: 30px 0 0 0;
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
     bottom:0.3rem;
     right:0.49rem;
    .print,.me{
      width: 0.6rem;
      height: 0.6rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
 
  
</style>
