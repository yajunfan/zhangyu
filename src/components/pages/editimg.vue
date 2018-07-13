<template>
  <div class="edit_container">
    <ul class="make_list">
      <li v-for="(item,index) in modelLists" :key="index">
        <span  v-if="index == 0" class="cover img_title">封面</span>
        <span v-else v-text="index" class="img_title"></span>
        <div>
          <img  v-lazy="item.imgtrueurl"alt="1"/>
          <ul class="icon_container">
            <li ><i class="change_icon"></i><span>替换</span></li>
            <li ><i class="rotate_icon"></i><span >旋转</span></li>
            <li ><i class="amplification_icon"></i><span >放大</span></li>
            <li ><i class="narrow_icon"></i><span >缩小</span></li>
          </ul>
        </div>
          
       </li>
    </ul>
    <div class="btn_container">
      <van-button bottom-action>保存</van-button>
    </div>
  </div>
</template>

<script>
import SERVERUTIL from "../../lib/SeviceUtil";
import { mapState, mapMutations } from "vuex";
  export default {
     data(){
       return{
         modelLists:[], //列表
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
              }
            }
          }
        }).catch(error => {
          console.log(error);
        });
      },
     },
     mounted(){
      var this_= this;
      document.title = '编辑图书';
      this_.getBookDetailInfoFn(this_.token,this_.vbookid);
    },
    computed:{
      ...mapState(['token',"modeltypeid","modeltypename","modelid","bookinfo","vbookid","vloadimg"])
    }       
  }
</script>

<style scoped lang="scss" type="text/css">
.edit_container{
  padding: 0.6rem 0;  
  .make_list {
    display: flex;
    flex-direction: column;
    li {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 0.36rem;
      .img_title {
        display:block;
        width: 0.26rem;
        height: 0.26rem;
        line-height: 0.26rem;
        padding: 0.05rem;
        color: #fff;
        background-color: #4eb958;
        border-radius: 0.2rem;
        font-size: 0.18rem;
        text-align: center;
        margin: 0 0.4rem 0.1rem 0.2rem;
      }
      .cover {
        width: 0.56rem;
        margin-right: 0.1rem;
        border-radius: 0.2rem;
      }
      div{
        position: relative;
        width: 6rem;
        height: 8.2rem;
        background: url(../../images/coverbg.png) no-repeat;
        background-size: contain;
        margin-top: -3px;
        img {
          width: 90%;
          height: 90%;
          margin-left: 0.2rem;
        }
        .upload_img{
          position: relative;
          width: 80%;
          height: 70%;
          top: -90%;
          left: 5%;
        }
        .icon_container{
          position: absolute;
          width: 90%;
          background: white;
          display: flex;
          flex-direction: row;
          bottom: 0.6rem;
          left: 3.4%;
          li{
            display:flex;
            flex-direction:column;
            box-sizing: border-box;
            margin-bottom:0.2rem;
            i{
              display: block;  
              width: 0.64rem;   
              height: 0.64rem;
              line-height: 0.64rem;
              padding: 0;
              background: url('../../images/rotate.png') no-repeat 50% 62%;
              background-size: 80% 80%;
              margin-top: 0.2rem;
              border: 1px solid #ff4747;
              border-radius: 50%;
            }
            .change_icon{
              background: url('../../images/change.png') no-repeat 50% 62%;  
              background-size: 80% 80%;
            }
            .amplification_icon{
              background: url('../../images/amplification.png') no-repeat 50% 62%; 
              background-size: 80% 80%;
            }
            .narrow_icon{
              background: url('../../images/narrow.png') no-repeat 50% 62%; 
              background-size: 80% 80%;
            }
            span{
             display: block;
             background: none;
             text-align: center;
             margin-top: 0.1rem;
            }

          }
        }
      }
    }
  }
  .btn_container{
    position: fixed;
    width: 100%;
    bottom: 0;
    
    button{
      background:#fff;
      color:#ff4747;
    }
  }
}
 
</style>