<template>
  <div class="makeContainer">

    <div class="titleContainer" v-if="showflag">
      <van-row>
        <van-col span="22">
           <van-row class="title_con">
              <van-col span="12"><span class="title_name" v-text="photoName"></span></van-col>
              <van-col span="12" style="text-align:right;" ><a href="javascript:;" class="detail_name" @click="jumptodetail()">查看详情<i>></i></a></van-col>
           </van-row>
          <div class="make_container">
            <ul class="make_list">
              <li v-for="(item,index) in modelLists" :key="index">
                 <span v-if="index == 0" class="cover">封面</span>
                 <span v-else v-text="index"></span>
                 <div>
                   <img :src="item.img" alt="1"/>
                   <img :src="item.imgurl " alt="" class="upload_img">
                 </div>
                 
              </li>
            </ul>
            <div class="iconcontainer">
              <van-row>
                <van-col span="8">
                  <span class="preview_icon d-i-b" @click="previewFn()">
                    <img src="../../images/preview.png" alt="预览">
                  </span>
                </van-col>
                <van-col span="8">
                  <span class="onload_icon d-i-b">
                    <!-- <form ref="form"></form> -->
                    <van-uploader :after-read="onRead"  accept="image/gif, image/jpeg" multiple class="fileImage">
                      <van-icon name="photograph" />
                    </van-uploader> 
                    
                 
                     <!-- <input id="fileImage" name="file" ref="img_input" class="fileImage" type="file" @change='add_img'  accept="image/*" capture="camera" size="30"> -->
                 
                    
                    <img src="../../images/onload.png" alt="上传">
                    <!-- <vue-core-image-upload class="btn btn-primary" style="width:100%;height:100%;position:absolute;top:0" :crop="false"
                      @imageuploaded="imageUploded" :max-file-size="5242880" :multiple="true" :multiple-size="4" :text="''" url="http://192.144.141.33:8081/book/book/uploadImage" >
                    </vue-core-image-upload> -->
                    <span class="mark tc" v-text="modelnum"></span>
                  </span>
                </van-col>
                <van-col span="8">
                  <span class="save_icon d-i-b">
                    <img src="../../images/save.png" alt="保存" @click="saveFn()">
                  </span>
                </van-col>
              </van-row>
            </div>
          </div>
           
        </van-col>
        <van-col span="2">
          <div class="scaling scale">
             <img src="../../images/scale.png" alt="" @click="showflag=false;" class="icon_img"/>
          </div>  
        </van-col>
      </van-row>
      
    </div>
     <div class="titleContainer" v-else>
      <van-row>
        <van-col span="17" >
           <van-row class="title_con">
              <van-col span="12"><span  class="title_name" v-text="photoName"></span></van-col>
              <van-col span="12" style="text-align:right;"><a href="javascript:;" class="detail_name" @click="jumptodetail()">查看详情<i>></i></a></van-col>
           </van-row>
          <div class="make_container">
            <ul class="make_list">
              <li v-for="(item,index) in modelLists" :key="index">
                 <span v-if="index == 0" class="cover">封面</span>
                 <span v-else v-text="index"></span>
                 <div>
                   <img :src="item.img" alt="1"/>
                   <img :src="item.imgurl " alt="" class="upload_img">
                </div>
              </li>
            </ul>
            <div class="iconcontainer iconcontainershow">
              <van-row>
                <van-col span="8">
                  <span class="preview_icon d-i-b" @click="previewFn()">
                    <img src="../../images/preview.png" alt="预览">
                  </span>
                </van-col>
                <van-col span="8">
                  <span class="onload_icon d-i-b" @click="markflag=true;">
                    <!-- <form ref="form">  </form> -->
                      <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple class="fileImage">
                        <van-icon name="photograph" />
                      </van-uploader>
                  
                    
                    <img src="../../images/onload.png" alt="上传">
                    <!-- <input id="fileImage" name="file" ref="img_input" class="fileImage" type="file" @change='add_img'  accept="image/*" capture="camera" size="30"> -->
                    <!-- <vue-core-image-upload class="btn btn-primary" style="width:100%;height:100%;position:absolute;top:0" :crop="false"
                      @imageuploaded="imageUploded" :max-file-size="5242880" :multiple="true" :multiple-size="4" :text="''" url="http://192.144.141.33:8081/book/book/uploadImage" >
                    </vue-core-image-upload> -->
                    <span class="mark tc" v-text="modelnum"></span>
                  </span>
                </van-col>
                <van-col span="8">
                  <span class="save_icon d-i-b">
                    <img src="../../images/save.png" alt="保存" @click="saveFn()">
                  </span>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-col>
        <van-col span="7">
          <div class="scaling ">
             <img src="../../images/scale.png" alt="" @click="showflag=true;" class="icon_img"/>
             <div class="option_container">
               <select class="tc" @change="changeTypsFn"  v-model="liid">
                 <option :value ="item.id" v-for="item in tabarys" :key="item.id">{{item.name}}</option>
               </select>
             </div>
             <ul class="prewimg">
               <li v-for="(item,index) in tabLists" :key="index">
                 <div @click="selectPrewImgFn(index,item)" :class="index==i?'selDiv':''">
                   <img :src="item.img" alt="1" />
                 </div>
               </li>
             </ul>
          </div>  
        </van-col>
        </van-row>
    </div>
    <!-- 当图片出现不合格的时候弹框 -->
    <div class="imgnofit_container" v-if="nofitflag">
      <div class="img_container">
         <h4 class="tc"><span class="tc" style="color:#ff5547;" v-text="nofitnum"></span><span>张照片像素过低或大小不合格<br>建议删除再重新上传</span></h4>
         <ul class="img_list">
           <li v-for="item in fileList" :key="item">
             <img :src="item" alt="不合格">
            </li>
         </ul>
         <div class="img_operate w100">
           <van-row class="w100">
            <van-col span="12">
              <van-button class="w100" type="default" bottom-action style="background:none;color:black;" @click="nofitflag=false">取消</van-button >
            </van-col>
            <van-col span="12">
              <van-button  class="w100" type="default"  bottom-action style="background:none;color:#ff5547;" @click="deleteImgFn">删除</van-button >
            </van-col>
          </van-row>
         </div>
      </div>
    </div>
    <!-- 提示未制作完成， -->
    <div class="imgnosucce_container" v-if="nosucceeflag">
      <div class="img_container tip_container">
         <h4 class="tc">提示</h4>
         <p class="tc">本书尚未制作完成<br>还需上传<span v-text="9" style="color:#ff5547"></span>张照片</p>
         <div class="img_operate w100">
           <van-row class="w100">
            <van-col span="12">
              <van-button class=" w100 ft14" type="default" bottom-action style="background:none;font-size:0.28rem;color:black;" @click="savebookFn()">先保存至书架</van-button >
            </van-col>
            <van-col span="12">
              <van-button  class=" w100 ft14" type="default"  bottom-action style="background:none;font-size:0.28rem;color:black;">继续上传</van-button >
               <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple class="fileImage">
                  <van-icon name="photograph" />
              </van-uploader>
            </van-col>
          </van-row>
         </div>
      </div>
    </div>
     <!-- 提示照片清晰度不足， -->
    <div class="imgnosucce_container" v-if="noprefactflag">
      <div class="img_container tip_container">
         <h4 class="tc">照片清晰度不足</h4>
         <p class="tc">像素不足会影响印刷清晰度<br>建议选择清晰度高的<span v-text="9" style="color:#ff5547"></span>照片制作</p>
         <div class="img_operate w100">
           <van-row class="w100">
            <van-col span="12">
              <van-button class=" w100 ft14" type="default" bottom-action style="background:none;font-size:0.28rem;color:black;" @click="gochangeFn()">去修改</van-button >
            </van-col>
            <van-col span="12">
              <van-button  class=" w100 ft14" type="default"  bottom-action style="background:none;font-size:0.28rem;color:black;" @click="makeModelFn()">继续提交</van-button >
               <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple class="fileImage">
                  <van-icon name="photograph" />
              </van-uploader>
            </van-col>
          </van-row>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import SERVERUTIL from "../../lib/SeviceUtil";
import VueCoreImageUpload from "vue-core-image-upload";
import axios from "axios";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    VueCoreImageUpload
  },
  data() {
    return {
      photoName: "",
      tabarys: [], //模板类型列表
      liid: "1",
      userid: "", //相册模板id
      modelnum: "", //模板总共有几张，上传成功之后，剩余多少张需要上传，动态计算
      modelLists: [],//模板的详情页面列表
      tabLists: [], //右侧的类型列表
      showflag: true,
      i: 0, //当前选中的列表项
      nofitflag: false, //不合格弹框
      nosucceeflag:false , //没有制作成功的弹框
      noprefactflag:false,  //清晰度不高的弹框
      nofitnum: 1, //不合格的数量
      imgs: [],
      imgData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg"
      },
      fileList: [],  //不合格的图片的数据集
      imgindex:0,  // 上传的图片的index
      allsuccess:false,  //所有都上传成功，就可以点击保存按钮
      loadflag:false,  //判断是否点击了上传按钮
    };
  },
  methods: {
    //右侧的点击每一项更换模板 - 查询上一本书的制作情况，确认更换后 调用选择模板的接口获取新的bookid
    selectPrewImgFn(index, obj) {
      var this_ = this;
      //如果loadflag为false，说明就没有点击上传，那就可以直接更换模板
      if(this_.loadflag){
        this_.getBookStatusFn(this_.modelid,this_.token,index, obj); 
      }else{
        this_.i = index;
        this_.detailListsFn(obj.id);
        this_.photoName = obj.title;
        this_.userid = obj.id;
        this_.changeModelId(obj.id);
        this_.changeModelTypeName(obj.title);
        this_.modelLists.forEach(item=>{
          item.imgurl ="";
        });
        //获取新的book_id
        this_.getbookidFn(obj.id,this_.token,obj.title,this_.vnickname);
     }
    },
    //获取模板类型
    modelTypeFn() {
      var this_ = this;
      var obj = { service: "getTemplateType" };
      SERVERUTIL.base
        .baseurl(obj)
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data) {
              this_.tabarys = res.data.data;
              this_.modelListFn(this_.modeltypeid);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取模板列表
    modelListFn(typeId) {
      var this_ = this;
      var obj = { service: "getTemplateList", type_id: typeId };
      SERVERUTIL.base.baseurl(obj).then(res => {
          if (res.data.code == 0) {
            if (res.data.data) {
              this_.tabLists = res.data.data;
            }
          }
        }).catch(error => {
          console.log(error);
        });
    },
    //更改右侧模板对应的模板列表变化
    changeTypsFn() {
      var this_ = this;
      this_.modelListFn(this.liid);
    },
    //获取详情列表
    detailListsFn(id) {
      var this_ = this;
      var obj = { service: "getTemplateDetailInfo", id: id };
      SERVERUTIL.base.baseurl(obj).then(res => {
        if (res.data.code == 0) {
          if (res.data.data) {
            this_.modelLists = res.data.data;
            this_.modelLists.forEach(item=>{
              item.imgurl ="";
            });
            if(this_.vloadimg.length){
              var  num = 0;
              this_.vloadimg.forEach(item =>{
                if(item.length){
                  num++;
                }
              })
              this_.modelLists.forEach((item,index)=>{
                item.imgurl =this_.vloadimg[index];
              });
              this_.modelnum = this_.modelLists.length-num;
            }else{
              this_.modelnum = this_.modelLists.length;
            }
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    //用户选择模板 -- 获取book_id
    getbookidFn(id, token, bookname, author) {
      var this_ = this;
      var obj = {
        service: "addBook",
        id: id,
        stoken: token,
        book_name: bookname,
        author: author
      };
      SERVERUTIL.base.baseurl(obj).then(res => {
        if (res.data.code == 0) {
          if (res.data.data) {
            this_.changebookid(res.data.data.book_id);
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    //上传图片
    unloadImg(file){
      var this_ = this;
      this_.loadflag = true;
      let formData = new FormData();
      if (file.type.indexOf('image/jpeg') == -1) {
        this_.$toast({
          mask: true,
          message: "请选择我们支持的图片格式！image/jpeg",
          duration: 0,  
        });
        return false;
      };
      formData.append("file", file);
      $.ajax({
        url:'http://192.144.141.33:8081/book/book/uploadImage',
        type:'POST',
        data:formData,
        cache: false,
        contentType: false,
        processData: false,
        success:function(res){
          this_.$toast.clear();
          var imgurl=res.data.url;
          if (file.size > 3145728) {
            this_.fileList.push(imgurl);
            return false;
          };
          this_.modelLists[this_.imgindex].imgurl = imgurl;
          this_.$set(this_.modelLists,this_.imgindex,this_.modelLists[this_.imgindex]);
          this_.$toast.loading({
            mask: true,
            message: "上传图片"+(this_.imgindex+1)+"/" + this_.modelLists.length
          });
          if(this_.vloadimg){
            this_.modelnum = this_.modelLists.length-this_.vloadimg.length;
          }else{
            this_.modelnum = this_.modelLists.length-this_.imgindex-1;
          }
          
          this_.imgindex++;
          //每上传一张图片，创建一次图书
          this_.makeModelFn(imgurl);
        },
        error:function(){
          this_.$toast.loading({
            mask: true,
            message: "上传图片失败"
          });
        }
      });
    },
     //上传图片成功的执行函数
    onRead(file) {
      var this_ = this;
      var morenum=9;
      var meassage="一次最多上传9张照片";
      if(this_.vloadimg){
        morenum = this_.modelLists.length-this_.vloadimg;
        meassage = "还可以上传"+(this_.modelLists.length-this_.vloadimg)+'照片';
        this_.$toast({
          mask: true,
          message: meassage
        });
      };
      if(file.length){
        if(file.length>morenum){
          this_.$toast({
            mask: true,
            message: meassage
          });
        }else{
          if(file.length>this_.modelLists.length){
            this_.$toast({
              mask: true,
              message: '该模板最多上传'+this_.modelLists.length+'张照片,请重新选择'
            });
          }else{
            file.forEach((item,index)=>{
              this_.unloadImg(item.file);
            });
          }
        }
      }else{
        this_.unloadImg(file.file);
      };
    },
     //制作模版
    makeModelFn(url){
      var this_ = this;
      var obj = {
        service: "createBook",
        id: this_.vbookid,
        stoken: this_.token,
        url:url
      };
      SERVERUTIL.base .baseurl(obj) .then(res => {
        if (res.data.code == 0) {
          this_.$toast.clear();
          if (res.data.data) {
            this_.allsuccess = res.data.data;
               
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    //查看图片的上传请况  
    getBookStatusFn(id, token,index, objparams) {
      var this_ = this;
      var obj = { service: "getBookStatus", id: id, stoken: token };
      SERVERUTIL.base.baseurl(obj).then(res => {
        if (res.data.code == 0) {
          if (res.data.data) {
             var content = "当前图书未制作完成";
            if(res.data.data.finish_num<res.data.data.total_num){
              content = "当前模板中图片未全部上传，确定更换模板";
            };
              this_.$dialog.confirm({
                title: '确认更换',
                message: content
              }).then(() => {
                this_.modelLists.forEach(item=>{
                  item.imgurl ="";
                });
                this_.i = index;
                this_.detailListsFn(objparams.id);
                this_.photoName = objparams.title;
                this_.userid = objparams.id;
                this_.changeModelId(objparams.id);
                this_.changeModelTypeName(objparams.title);
                //获取新的book_id
                this_.getbookidFn(objparams.id,this_.token,objparams.title,this_.vnickname);
              }).catch(() => {
                  // on cancel
              });
            
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    //查看详情 跳转到详情页面传入模板的id
    jumptodetail() {
      var this_ = this;
      this_.$router.push({
        path: "detail",
        name: "DETAIL",
        params: {
          name: this_.photoName,
          id: this_.modelid
        }
      });
    },
    //保存至书架
    savebookFn(){

    },
    //去修改
    gochangeFn(){

    },
    //删除图片
    deleteImgFn(){
      var this_ = this;
      this_.fileList=[];
      this_.nofitflag = false;
    },
    //预览功能
    previewFn() {
      var this_ = this;
      this.$router.push({
        path: "/savesuccess",
        name: "SAVESUCCESS",
        params: {
          id: this_.$route.params.id,
          title: "预览"
        }
        // query: {
        //   name:name,
        //   id: id
        // }
      });
    },
    //保存功能并跳到保存成功页面
    saveFn() {
      var this_ = this;
      if(this_.loadflag){
        this_.$toast.loading({
          mask: true,
          message: "正在提交模板",
        });
        //判断是否有不合格的图片，如果有，显示
        if(this_.fileList.length){
          this_.nofitflag = true;
          return;
        }else{  
        //如果没有，判断创建图书返回的是否都为true，如果有不为的，不跳转，不清晰的图书弹框出现；如果全部都是true，就跳转
          if(this_.allsuccess){
            this.$router.push({
              path: "/savesuccess",
              name: "SAVESUCCESS",
              params: {
                id: this_.$route.params.id,
                flag: true
              }
            }); 
          }else{
          // this_.noprefactflag = true;
          }
        };
      }else{
         this_.$toast({
          mask: false,
          message: "请选择上传图片",
        });
      }
     
    },
    ...mapMutations([
      "changeToken",
      "changeNickname",
      "changeModelTypeId",
      "changeModelTypeName",
      "changeModelId",
      "changebookid","changeimg"
    ])
  },
  mounted() {
    var this_ = this;
    document.title = "马上制作";
    this_.photoName = this_.modeltypename;
    this_.userid = this_.$route.params.id;
    this_.detailListsFn(this_.modelid);
    this_.getbookidFn(this_.modelid,this_.token,this_.modeltypename,this_.vnickname);
    
    this_.modelTypeFn();
  },
  computed: {
    ...mapState([
      "token",
      "vnickname",
      "modeltypeid",
      "modeltypename",
      "modelid",
      "vbookid","vloadimg"
    ])
  }
};
</script>

<style scoped lang="scss" type="text/css">
body {
  // background: lightcyan;
}

.makeContainer {
  margin-left: 0.3rem;
  .titleContainer {
    width: 100%;
    .title_con {
      margin: 0.26rem 0 0.6rem 0rem;
      .title_name,
      .detail_name {
        font-size: 0.32rem;
      }
      .detail_name {
        font-size: 0.26rem;
        margin-right: 0.2rem;
        color: #ff4747;
        text-align: right;
        i {
          margin-left: 0.08rem;
        }
      }
    }
    .scaling {
      position: fixed;
      width: 2.2rem;
      height: 14rem;
      background: white;
      .icon_img {
        position: absolute;
        top: 40%;
        left: -0.42rem;
      }
      .option_container {
        margin: 0 auto;
        select {
          display: block;
          border: none;
          outline: none;
          margin: 0.36rem auto 0.56rem;
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          option {
            border: none;
            outline: none;
            text-align: center;
            color: #333;
            font-size: 0.28rem;
          }
          &:fouce {
            border: 0px;
            outline: none;
          }
        }
      }

      .prewimg {
        display: flex;
        flex-direction: column;

        li {
          width: 100%;
          height: 100%;
          margin-bottom: 0.3rem;
          display: flex;
          flex-direction: column;
          div,
          .selDiv {
            margin: 0 auto;
            width: 1.6rem;
            height: 2.2rem;
            background: url(../../images/rightbg.png) no-repeat;
            background-size: contain;
            padding: 5px;
            box-sizing: border-box;
            img {
              width: 90%;
              height: 90%;
            }
          }
          .selDiv {
            width: 1.78rem;
            height: 2.38rem;
            background: url(../../images/rightselectbg.png) no-repeat;
            background-size: contain;
          }
        }
      }
    }
    .make_container {
      position: relative;
      .make_list {
        display: flex;
        flex-direction: column;
        li {
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-bottom: 0.36rem;
          span {
            width: 0.26rem;
            height: 0.26rem;
            line-height: 0.26rem;
            padding: 0.05rem;
            color: #999;
            background-color: #ddd;
            border-radius: 0.2rem;
            margin-right: 0.4rem;
            font-size: 0.18rem;
            text-align: center;
          }
          .cover {
            display: inline-block;
            width: 0.56rem;
            color: #fff;
            margin-right: 0.1rem;
            background-color: #4eb958;
            border-radius: 0.2rem;
          }
          div {
            width: 3.86rem;
            height: 5.19rem;
            background: url(../../images/coverbg.png) no-repeat;
            background-size: contain;
            margin-top: -3px;
            img {
              width: 90%;
              height: 90%;
              margin-left: 0.2rem;
            }
            .upload_img{
              position: relative;
              width: 80%;
              height: 70%;
              top: -90%;
              left: 5%;
            }
          }
        }
      }
      .iconcontainer,
      .iconcontainershow {
        position: fixed;
        bottom: 1rem;
        padding: 0 0.6rem;
        box-sizing: border-box;
        .preview_icon,
        .onload_icon,
        .save_icon {
          width: 1.2rem;
          height: 1.2rem;
          margin: 0 0.3rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .onload_icon {
          position: relative;
          .mark {
            position: absolute;
            top: 0.15rem;
            right: 0.1rem;
            width: 0.36rem;
            background: #ff4747;
            border-radius: 50%;
            color: white;
          }
        }
        .fileImage {
          position: absolute;
          height: 1rem;
          width: 1rem;
          z-index: 999;
          opacity: 0;
        }
      }
      .iconcontainershow {
        width: 70%;
      }
    }
  }
  .imgnofit_container,.imgnosucce_container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    padding: 1.6rem 0.6rem;
    box-sizing: border-box;
    .img_container {
      position: relative;
      width: 100%;
      height: 100%;
      background: white;
      padding: 0.3rem;
      box-sizing: border-box;
      h4 {
        span {
          font-size: 0.28rem;
        }
      }
      ul {
        width: 100%;
        height: 80%;
        margin-top: 0.3rem;
        overflow: hidden;
        overflow-y: scroll;
        li {
          display: inline-block;
          width: 1.6rem;
          height: 1.6rem;
          margin: 0.12rem;
          background: #ccc;
          border: 1px solid black;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .img_operate {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        border-top: 1px solid #f2f2f2;
        background: white;
        .w100 {
          width: 100%;
        }
        
        .fileImage{
            position: absolute;
            display: block;
            width: 50%;
            height: 100%;
            background: red;
            top: 0;
            opacity: 0;
          }
      }
      .ft14{
        font-size: 14px;
      }
    }
  }
  .imgnosucce_container{
    .tip_container{
      position: absolute;
      top: 50%;
      left: 0;
      margin:0 10%;
      margin-top: -25%;
      width: 80%;
      height: 24%;
      h4{
        font-size: 0.30rem;
        margin-bottom: 0.1rem;
      }
      p{
        font-size: 0.28rem;
      }
    }
  }
  

}
</style>