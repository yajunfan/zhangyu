<template>
  <div class="paysuccess_container">
    <div class="success_icon">
      <img src="../../images/paysuccess.png" alt="支付成功">
    </div>
      <p class="tc">已成功支付，请等待发货，并在个人<br>中心的订单页面中及时关注物流信息。</p>
  </div>
</template>

<script>
  export default {
    mounted(){
      var this_ = this;
      document.title = '支付成功';
    }
  }
</script>

<style scoped lang="scss" type="text/css">
.paysuccess_container{
    padding-top: 2.2rem;
  .success_icon {
    width: 3.14rem;
    height: 2.01rem;
    margin: 0rem auto 0.3rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    font-size: 0.24rem;
    color: #999;
  }
}
</style>