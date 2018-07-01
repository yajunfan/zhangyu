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
                 <div><img :src="item.img" alt="1"/></div>
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
                    <!-- <form ref="form">
                    <van-uploader :after-read="onRead"  accept="image/gif, image/jpeg" multiple class="fileImage">
                      <van-icon name="photograph" />
                    </van-uploader> 
                    </form> -->
                 
                      <!-- <input id="fileImage" name="file" ref="img_input" class="fileImage" type="file" @change='add_img'  accept="image/*" capture="camera" size="30">
                  -->
                    
                    <img src="../../images/onload.png" alt="上传">
                    <vue-core-image-upload class="btn btn-primary" style="width:100%;height:100%;position:absolute;top:0" :crop="false"
                      @imageuploaded="imageUploded" :max-file-size="5242880" :multiple="true" :multiple-size="4" :text="''" url="http://192.144.141.33:8081/book/book/uploadImage" >
                    </vue-core-image-upload>
                    <span class="mark tc" v-text="modelnum">20</span>
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
                 <div><img :src="item.img" alt="1"/></div>
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
                    <!-- <form ref="form">
                      <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple class="fileImage">
                        <van-icon name="photograph" />
                      </van-uploader>
                    </form> -->
                    
                    <img src="../../images/onload.png" alt="上传">
                    <vue-core-image-upload class="btn btn-primary" style="width:100%;height:100%;position:absolute;top:0" :crop="false"
                      @imageuploaded="imageUploded" :max-file-size="5242880" :multiple="true" :multiple-size="4" :text="''" url="http://192.144.141.33:8081/book/book/uploadImage" >
                    </vue-core-image-upload>
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
           <li v-for="item in 12" :key="item">
             <img src="../../images/title1.jpg" alt="不合格">
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
      modelLists: [
        //模板的详情页面列表
        {
          name: "冬季的旅行",
          imageLists: [
            "../../images/model1.jpg",
            "../../src/images/model2.jpg",
            "../../src/images/model3.jpg",
            "../../src/images/model4.jpg"
          ]
        }
      ],
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
      fileList: []
    };
  },
  methods: {
    imageUploded(res) {
    
    },
    //右侧的点击每一项
    selectPrewImgFn(index, obj) {
      var this_ = this;
      this_.i = index;
      this_.detailListsFn(obj.id);
      this_.photoName = obj.title;
      this_.userid = obj.id;
      this_.changeModelId(obj.id);
      this_.changeModelTypeName(obj.title);
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
      SERVERUTIL.base
        .baseurl(obj)
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data) {
              this_.tabLists = res.data.data;
              console.log(this_.tabLists);
            }
          }
        })
        .catch(error => {
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
      SERVERUTIL.base
        .baseurl(obj)
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data) {
              this_.modelLists = res.data.data;
              this_.modelnum = this_.modelLists.length;
            }
          }
        })
        .catch(error => {
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
      SERVERUTIL.base
        .baseurl(obj)
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data) {
              this_.changebookid(res.data.data.book_id);
            }
          }
        })
        .catch(error => {
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
    add_img(event) {
      // let reader =new FileReader();
      let img1 = document.querySelector("#fileImage").files[0];

      let type = img1.type; //文件的类型，判断是否是图片
      let size = img1.size; //文件的大小，判断图片的大小
      if (this.imgData.accept.indexOf(type) == -1) {
        alert("请选择我们支持的图片格式！");
        return false;
      }
      if (size > 3145728) {
        alert("请选择3M以内的图片！");
        return false;
      }
      var uri = "";
      console.log(img1);
      let formData = new FormData();
      formData.append("file", img1);
      formData.append("type", "test");

      console.log(formData);
      axios.post("http://192.144.141.33:8081/book/book/uploadImage", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          cache: false,
          contentType: false, //不可缺
          processData: false,
          dataType: "json"
        }).then(response => {
          console.log(response);
        }).catch(error => {
          alert("上传图片出错！");
        });
    },
    //上传图片成功的执行函数
    onRead(file) {
      var this_ = this;
      this_.$toast.loading({
        mask: true,
        message: "上传图片5/" + file.length
      });
      let formData = new FormData(this.$refs.form);
      console.log(file)
      file.forEach(item =>{
        formData.append("file", item.file);
      })
      
       console.log(1,formData.get('file'))
      axios.post("http://192.144.141.33:8081/book/book/uploadImage", formData, {
         headers: { "Content-Type": "multipart/form-data" },
          cache: false,
          contentType: false, //不可缺
          processData: false,
          dataType: "json"
        }).then(response => {
          console.log(response);
        }).catch(error => {
          alert("上传图片出错！");
        });
      
    },
    //保存至书架
    savebookFn(){

    },
    //去修改
    gochangeFn(){

    },
    //制作模版
    makeModelFn(){
      var this_ = this;
      var obj = {
        service: "createBook",
        id: this_.vbookid,
        stoken: this_.token
      };
      SERVERUTIL.base .baseurl(obj) .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            if (res.data.data) {
              this_.getBookStatusFn(this_.modelid, this_.token);
            }
          } else {
            this_.nofitflag = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //查看图片的上传请况
    getBookStatusFn(id, token) {
      var this_ = this;
      var obj = { service: "getBookStatus", id: id, stoken: token };
      SERVERUTIL.base
        .baseurl(obj)
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data) {
              this_.modelnum =
                Number(res.data.data.total_num) -
                Number(res.data.data.finish_num);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
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
      //这里有一个调用保存的数据接口，成功后进入保存成功页面
      this.$router.push({
        path: "/savesuccess",
        name: "SAVESUCCESS",
        params: {
          id: this_.$route.params.id,
          flag: true
        }
        // query: {
        //   name:name,
        //   id: id
        // }
      });
    },
    ...mapMutations([
      "changeToken",
      "changeNickname",
      "changeModelTypeId",
      "changeModelTypeName",
      "changeModelId",
      "changebookid"
    ])
  },
  mounted() {
    var this_ = this;
    document.title = "马上制作";
    this_.photoName = this_.modeltypename;
    this_.userid = this_.$route.params.id;
    this_.detailListsFn(this_.modelid);
    this_.getbookidFn(
      this_.modelid,
      this_.token,
      this_.modeltypename,
      this_.vnickname
    );
    this_.modelTypeFn();
  },
  computed: {
    ...mapState([
      "token",
      "vnickname",
      "modeltypeid",
      "modeltypename",
      "modelid",
      "vbookid"
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