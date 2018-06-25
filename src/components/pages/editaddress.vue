<template>
  <div class="editaddress_container">
    <div class="edit_container">
      <ul>
        <li>
          <van-row class="edit_item h88">
            <van-col span="6" class="title_left">
              <span class="h88">收货人</span>
            </van-col>
            <van-col span="18" class="content-right" >
               <input  type="text" placeholder="请输入收货人姓名">
            </van-col>
          </van-row>
        </li>
         <li>
          <van-row class="edit_item">
            <van-col span="6" class="title_left">
              <span class="h88">联系电话</span>
            </van-col>
            <van-col span="18" class="content-right" >
               <input  type="tel" placeholder="请输入收货人手机号">
            </van-col>
          </van-row>
        </li>
         <li>
          <van-row class="edit_item">
            <van-col span="6" class="title_left">
              <span class="h88">所在地区</span>
            </van-col>
            <van-col span="18" class="content-right" >
               <input  type="text" placeholder="请输入收货人姓名">
            </van-col>
          </van-row>
        </li>
         <li>
          <van-row class="edit_item" style="border:none;">
            <van-col span="6" class="title_left">
              <span class="h88">详细地址</span>
            </van-col>
            <van-col span="18" class="content-right" >
               <textarea name="" id="" cols="30" rows="10" placeholder="请输入详细地址信息，如道路、门牌号等"></textarea>
            </van-col>
          </van-row>
        </li>
       <li>
          <van-cell-group>
            <van-switch-cell v-model="checked" title="设置默认地址" />
          </van-cell-group>
        </li>
      </ul>
      <div class="save_container">
        <div class="save_btn tc" @click="onSave()">保存 </div>  
      </div>
      
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        addressflag:true, //编辑地址
        checked:false
      }
    },
     methods: {
      onSave() {
        Toast('save');
      },
    },
    mounted() {
      var this_ = this;
      this_.addressflag = this_.$route.params.flag;
      document.title = "编辑收货地址";
    },    
  }
</script>

<style scoped lang="scss" type="text/css">
.editaddress_container{
  padding-top: 0.3rem;
  .edit_container{
    background: white;
    input,textarea{
     border:none;
     padding: 0;
     height: 0.86rem;
    }
    textarea{
      height:1.76rem;  
    }
    ul{
      li{
       .edit_item{
         height: 0.88rem;
         line-height: 0.88rem;
         border-bottom:1px solid #F2F2F2;
         margin-bottom:2px;
         padding-left: 0.2rem;
         box-sizing: border-box;
         span{
           height: 0.88rem;
           line-height: 0.88rem;  
         }
       } 
      }
    }
    .save_container{
      background: #F2F2F2;
      padding: 0.6rem 0;
      .save_btn {
        width: 90vw;
        height: 1rem;
        background: url(../../images/longbtn.png) no-repeat;
        background-size:100% 100%;
        line-height: 0.8rem;
        color: white;
        font-size: 0.28rem;
        margin:0 auto;
      }
    }
    
  } 
}
</style>