<template>
  <div class="personal_container">
    <div class="back_orange">
      <div class="head_image">
        <img src="../../images/title1.jpg" alt="">
        
      </div>
      <div class="person_name"> <span>多宝妈妈</span><span><img src="../../images/editbook.png" alt=""></span></div>
    </div>
    <div class="change_router">
      <span> 
        <div>
          <img src="../../images/order.png" alt="">
          <p>订单</p>
        </div>
      </span>
      <span> 
        <div>
          <img src="../../images/peraddress.png" alt="">
          <p>地址</p>
        </div>
      </span>
      <span> 
        <div>
          <img src="../../images/giftcard.png" alt="">
          <p>礼品卡</p>
        </div>
      </span>

    </div>
    <div class="my_book">
      <h4>我的书架 <span @click="jumptobook" v-if="bookflag">更多<img src="../../images/rightjt.png" alt="无"></span></h4>
      <div v-if="bookflag">
        <van-row class="edit_item" style="border:none;">
          <van-col span="10" class="title_left">
            <img src="../../images/yunnan1.jpg" alt="相册">
          </van-col>
          <van-col span="14" class="content-right">
            <div class="opearte_container">
              <span class="delete_photo d-i-b"></span>
              <span class="preview_photo d-i-b"></span>
              <span class="edit_photo d-i-b"></span>
            </div>
            <div class="use_photo tc">制作相册</div>
          </van-col>
        </van-row>
      </div>
      <div v-else class="nobook_container">
        <div class="no_book_tip tc">
          <img src="../../images/nobook.png" alt=".">
        </div>
        <p class="tc">亲~您的书架空空如也<br>快来开始著相册吧</p>
        <div class="use_photo tc">马上制作</div>
      </div>
    </div>
    <div class="footer">
       <p class="tc">客服 400-666-8888</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      bookflag:false, //书架不为空
    }
  },
  methods:{
    jumptobook(){
      var this_ = this;
      this_.$router.push({  
        path: '/mybook',
        name: 'MYBOOK',
      });
    }
  },
  mounted() {
    document.title = "个人中心";
  }
};
</script>

<style scoped lang="scss" type="text/css">
.personal_container {
  position: relative;
  .back_orange {
    width: 100%;
    height: 4rem;
    background: url("../../images/topbg.png");
    background-size: contain;
    .head_image {
      width: 20vw;
      height: 20vw;
      margin-left: 40vw;
      padding-top: 1.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .person_name {
      z-index: 20;
      text-align: center;
      color: #fff;
      font-size: 0.28rem;
      padding-top: 0.2rem;
      span {
        display: inline-block;
        vertical-align: top;
      }
      span:nth-child(2) {
        width: 0.4rem;
        height: 0.4rem;
        display: inline-block;
        z-index: 20;
        img {
          width: 100%;
        }
      }
    }
  }
  .change_router {
    margin:0 auto;
    margin-top: -0.45rem;
    width:90vw;
    height: 1.5rem;;
    background: #fff;
    border-radius: 0.2rem;
    border:1px solid #999;
    top:3.5rem;
    z-index:20;
    box-shadow: 0px 2px 2px #999;
    span{
      display: inline-block;
      vertical-align: middle;
      width:28vw;
      div:nth-child(1){
        width:40%;
        padding-top:10%;
        padding-left:35%;
        img{
          width:60%;
          padding-left:20%;
          height: 60%;
        }
      }
      p{
        text-align:center;
        color: #ff4747;
      }
    }
  }
  .my_book{
    margin-top: 0.4rem;
    padding: 0 0.3rem 0 0.5rem;
    box-sizing: border-box;
    h4{
      margin-bottom:0.3rem;
      font-size:0.3rem;
      span{
        float:right;
        font-size:0.3rem;
        color: #ff4747;
        img{
          margin-left:0.1rem;
          width: 0.14rem;
          height: 0.25rem;
          vertical-align: middle;
          margin-top: -2px;
        }
      }
    }
    .title_left{
      img{
        width:100%;
        height: 30vh;
      }
    }
    .content-right,.nobook_container{
      .opearte_container{
        display:flex;
        flex-direction: row;
        flex-grow: 3;
        width: 100%;
        padding: 25% 0.2rem 0;
        box-sizing: border-box;
        span{
          width: 1.22rem;
          height:1.20rem;
          background: url(../../images/delete.png) no-repeat;
          background-size: 100% 100%;
        }
        .preview_photo{
          background: url(../../images/bookpreview.png) no-repeat;
          background-size: 100% 100%;
        }
        .edit_photo{
          background: url(../../images/editbook.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .use_photo{
        width: 3.06rem;
        height: 0.86rem;
        line-height: 0.76rem;
        margin: 0.3rem auto 0;
        background: url(../../images/next.png) no-repeat;
        background-size: 100% 100%;
        color:white;
        font-size:0.3rem;
      }
    }
    .nobook_container{
      .no_book_tip{
        margin-bottom: 0.2rem;
        img{
          margin: 0 auto;
          width: 1.09rem;
          height: 1.09rem;
        }
      }
      p{
        color: #999;
      }
      .use_photo{
        margin-top: 0.6rem;
      }
    }
    

  }
  .footer{
    position: fixed;
    bottom: 0.54rem;
    width: 100%;
    p{
      width: 100%;
      color:#999;
    }
  }
}
</style>