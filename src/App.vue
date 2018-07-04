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
.van-switch__node{
  width: 0.6rem;
  height: 0.6rem;
}
.van-switch--on .van-switch__node {
  -webkit-transform: translateX(.6em);
  transform: translateX(1.6em);
}
</style>
