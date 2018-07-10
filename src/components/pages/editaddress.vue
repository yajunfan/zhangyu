<template>
  <div class="editaddress_container">
    <div class="edit_container">
      <van-address-edit :area-list="areaList" :item-height='45' :address-info = "addressIinfo" :show-set-default="defaultflag"  @save="onSave" @delete="onDelete"/> 
    </div>
  </div>
</template>

<script>
import SERVERUTIL from "../../lib/SeviceUtil";
import AREALIST from "../../data/areaList"
import { mapState, mapMutations } from "vuex";
  export default {
    data(){
      return{
        addressflag:true, //编辑地址
        areaList:{},
        checked:true,
        nameerrmessage:"", //名字错误提示
        telerrmessage:"",  //电话错误提示
        info:{},
        addressIinfo:{},
        defaultflag:false

      }
    },
    methods: {
      //获取收货地址信息
      getAddressInfoFn(id,token){
        var this_ = this;
        var obj={"service":"getAddressInfo","stoken":token,"id":id};
        SERVERUTIL.base.baseurl(obj).then(res => {
          if(res.data.code ==0){
            if(res.data.data){
              this_.addressIinfo = res.data.data;
              this_.addressIinfo.name=this_.addressIinfo.link_name;
              this_.addressIinfo.tel=this_.addressIinfo.link_tel;
              this_.addressIinfo.area_code=this_.addressIinfo.district_id;
              var ary = this_.addressIinfo.district.split("-");
              this_.addressIinfo.province = ary[0];
              this_.addressIinfo.city = ary[1];
              this_.addressIinfo.county = ary[2];
              this_.addressIinfo.address_detail = this_.addressIinfo.address;
              if(this_.addressIinfo.default_status == 2){
                this_.addressIinfo.is_default= false;
              }else{
                this_.addressIinfo.is_default= true;
              };
            }
          }
        }).catch(error => {
          console.log(error);
        });
      },
      onSave(res) {
        var this_= this;
        var status=2;
        var obj={};
        if(res.is_default){
          status = 1;
        };
        obj={
          "service":"setAddress",
          "stoken":this_.token,
          "link_name":res.name,
          "link_tel":res.tel,
          "district":res.province+"-"+res.city+"-"+ res.county,
          "address":res.address_detail,
          "district_id":res.area_code,
          "default_status":status
        };
        if(this_.addressIinfo.id){
          obj.id = this_.addressIinfo.id;
          obj.service = "setAddress";
        }else{
          obj.service ="addAddress";
        }
        SERVERUTIL.base.baseurl(obj).then(res => {
          if(res.data.code == 0){
            this.$router.push({  
              path: '/newaddress',
              name: 'NEWADDRESS',
              params: {   
                data: obj
              }
            });
          }
        }).catch(error => {
          console.log(error);
        });
      },
       //删除地址
      onDelete(res){
        var this_ = this;
        var paramsobj={};
          paramsobj={
            "service":"setAddress",
            "id":res.id,
            "stoken":this_.token,
            "link_name":res.name,
            "link_tel":res.tel,
            "district":res.province+"-"+res.city+"-"+ res.county,
            "address":res.address_detail,
            "district_id":res.area_code,
            "default_status":status,
            "status":10
          };
        SERVERUTIL.base.baseurl(paramsobj).then(res => {
          if(res.data.code == 0){
            this_.$router.push({  
              path: '/newaddress',
              name: 'NEWADDRESS',
            }); 
          }
        }).catch(error => {
          console.log(error);
        }); 
      },
      ...mapMutations([
        "changeToken"
      ])
    },
    mounted() {
      var this_ = this;
      document.title = "编辑收货地址";
      this_.addressflag = this_.$route.params.flag;
      this_.areaList = AREALIST.areaList;
      if(this_.$route.params.data){
        this_.userid = this_.$route.params.data.id;
        console.log(this_.userid)
        this_.getAddressInfoFn(this_.userid,this_.token);
        this_.defaultflag=true;
      };
    }, 
    computed: {
    ...mapState([
      "token"
    ])
  }
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