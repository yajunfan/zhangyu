<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* tab标签页 */
#app{
  background: #F2F2F2;
  min-height: 100vh;
}
.van-dialog__message{
  text-align: center;
}
/* 滑块的样式的修改*/
.van-switch__node{
  width: 0.6rem;
  height: 0.6rem;
}
.van-switch--on .van-switch__node {
  -webkit-transform: translateX(.6em);
  transform: translateX(1.6em);
}
/* 省市区的样式的调整*/
.van-picker-column ul li{
  height: 0.88rem;
  line-height: 0.88rem;
}
.van-picker__cancel,.van-picker__confirm{
  line-height: 0.8rem;
}
/*折叠面板的样式调整*/
.van-collapse-item,.van-collapse-item__content{
  background: #fff;
  padding: 0rem;
  box-sizing: border-box;
}
.van-cell{
  margin: 0.28rem 0 0;
  padding: 0;
}
.van-cell__value{
  font-size: 0.28rem;
  margin-left:0.3rem;
}
.van-cell:not(:last-child)::after{
  border-bottom-width:0;
}
.van-hairline--top-bottom::after{
  border-width:0;
}
</style>
