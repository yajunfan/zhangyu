<template>
  <div class="logistics_container">
    <div class="orde-r_info"></div>
    <div class="info_list">
      <van-steps direction="vertical" :active="2" active-color="#f60">
        <van-step>
            <h3>【城市】物流状态1</h3>
            <p>2016-07-12 12:40</p>
        </van-step>
        <van-step>
            <h3>【城市】物流状态2</h3>
            <p>2016-07-11 10:00</p>
        </van-step>
        <van-step>
            <h3>快件已发货</h3>
            <p>快递员：小迪 18734859652</p>
            <p>2016-07-10 09:30</p>
        </van-step>
       </van-steps>    
    </div> 
  </div>
</template>

<script>
import SERVERUTIL from "../../lib/SeviceUtil";
import UTILS from "../../lib/utils";
  export default {
    mounted() {
      var this_ = this;
      document.title = "物流详情";
      this_.token = UTILS.SESSIONOPERATE.getStorage("stoken");
    },    
  }
</script>

<style scoped lang="scss" type="text/css">

</style>