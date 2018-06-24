<template>
  <div class="personal_container">

    <div class="back_orange">
      <div class="head_image">
        <img src="../../assets/logo.png" alt="">
        
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

  </div>
</template>

<script>
export default {
  mounted() {
    document.title = "个人中心";
  }
};
</script lang="scss" type="text/css">

<style scoped lang="scss" type="text/css">
.personal_container {
  position: relative;
  .back_orange {
    width: 100%;
    height: 4rem;
    background: url("../../images/topbg.png");

    .head_image {
      width: 20vw;
      height: 20vw;
      margin-left: 40vw;
      padding-top: 1.2rem;
      img {
        width: 100%;
        height: 100%;
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
    position: absolute;
    width:90vw;
    left:5vw;
    height: 1.5rem;;
    background: #fff;
    border-radius: 4px;
    border:1px solid #999;
    top:3.5rem;
    z-index:20;
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
}
</style>