<template>
 <div class="book_container">
    <van-row class="book_item"  v-for="(item,index) in booklists" :key="index">
        <van-col span="10" class="title_left">
          <img :src="item.img" alt="相册">
          <i class=" d-i-b " :class="item.status == 1?'book_ststus':(item.status == 2?'fail_status':'')"></i>
        </van-col>
        <van-col span="14" class="content-right">
          <div class="opearte_container">
            <span class="delete_photo d-i-b" @click="operatebookFn(item,10)"></span>
            <span class="preview_photo d-i-b" @click="previewFn(item)"></span>
            <span class="edit_photo d-i-b" @click="jumptosave(item)"></span>
          </div>
          <div class="use_photo tc" @click="jumptostartmakeFn(item.book_name,item.template_id)">制作相册</div>
        </van-col>
      </van-row>
 </div>
</template>

<script>
import SERVERUTIL from "../../lib/SeviceUtil";
import UTILS from "../../lib/utils";
import { mapState, mapMutations } from "vuex";
  export default {
    data(){
      return{
        booklists:[]
      }
    },
    methods:{
      //获取图书列表
      getBookListFn(token){
        var this_ = this;
        var obj={"service":"getBookList","stoken":token};
        SERVERUTIL.base.baseurl(obj).then(res => {
          if(res.data.code ==0){
            if(res.data.data){
              this_.booklists=res.data.data;
            }
          }
        }).catch(error => {
          console.log(error);
        });
      },
      //删除图书信息
      operatebookFn(item,status){
        var this_ = this;
        var paramsobj={};
        this_.changeModelId(item.template_id);
        paramsobj={
          "service":"setBook",
          "id":item.id,
          "stoken":this_.token,
          "book_name":item.book_name,
          "author":item.author,
          "status":status
        };
        SERVERUTIL.base.baseurl(paramsobj).then(res => {
          if(res.data.code == 0){
            this_.getBookListFn(this_.token);
          }
        }).catch(error => {
          console.log(error);
        });
      },
      //跳转到马上制作页面
      jumptostartmakeFn(name,id){
        var this_ = this;
        this_.changeModelTypeName(name);
        this_.changeModelId(id);
        this.$router.push({  
          path: 'startmake',   
          name: 'STARTMAKE',  
          params: {   
            name: name,
            id:id
          } 
        }) ;
      },
      //预览图书
      previewFn(obj){
        var this_ = this;
        this_.changeModelId(obj.template_id);
        this.$router.push({  
          path: '/savesuccess',
          name: 'SAVESUCCESS',  
          params: {   
            id:obj.id,
            title:"预览"
          }
        }) 
      },
      //编辑图书 -- 跳转到保存页面，不过是可以编辑
      jumptosave(obj){
        var this_ = this;
        this_.changebookid(obj.id);
        this_.$router.push({  
          path: '/savesuccess',
          name: 'SAVESUCCESS',  
          params: {   
            id:obj.id,
            flag:false
          }, 
        });
      },
      ...mapMutations([
        "changeToken","changeModelId","changeModelTypeName","changeEnter","changeGift","changebookid"
      ])

    },
    mounted() {
     var this_ = this;
     document.title = "我的书架";
    // this_.token = UTILS.SESSIONOPERATE.getStorage("stoken");
     this_.getBookListFn(this_.token);
     //this_.booklists=this_.$route.params.booklist;

    } ,
    computed:{
      ...mapState(['token',"modelid", "modeltypename","vaddressenterflag","vgiftflag","vbookid"])
    }   
  }
</script>

<style scoped lang="scss" type="text/css">
.book_container{
   padding: 0.3rem 0rem 0 0.5rem;
   box-sizing: border-box; 
   .book_item{
      margin-bottom:0.6rem;
      border-bottom:1px solid #ccc;
      padding-bottom:0.3rem;
      box-sizing: border-box; 
      .title_left{
        position: relative;
        img{
          width:100%;
          height: 4rem;
        }
        i{
          position: absolute;
          top: 0.1rem;
          right: 0;
          width: 0.84rem;
          height: 0.28rem;
          background: url(../../images/finish.png) no-repeat;
          background-size: 100% 100%;
        }
        i.fail_status{
          background: url(../../images/fail.png) no-repeat;
          background-size: 100% 100%;  
        }
      }
      .content-right{
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
   }
  
}

</style>