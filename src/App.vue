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
</style>
