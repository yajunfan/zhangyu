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
                   <img  :src="item.imgtrueurl" alt="1"/>
                   <!-- <img :src="item.imgurl " alt="" class="upload_img"> -->
                   <i class="warning_icon" v-if="item.warnflag" ></i>
                 </div>
              </li>
            </ul>
            <div class="iconcontainer">
              <van-row>
                <van-col span="8">
                  <span class="preview_icon d-i-b" @click="saveFn('preview')">
                    <img src="../../images/preview.png" alt="预览">
                  </span>
                </van-col>
                <van-col span="8">
                  <span class="onload_icon d-i-b">
                    <!-- <form ref="form"></form> -->
                    <van-uploader :after-read="onRead"  accept="image/gif, image/jpeg" multiple class="fileImage" v-if="modelnum>0">
                      <van-icon name="photograph" />
                    </van-uploader>
                    <img src="../../images/onload.png" alt="上传" @click="completeFn()">
                    <span class="mark tc" v-text="modelnum"></span>
                  </span>
                </van-col>
                <van-col span="8">
                  <span class="save_icon d-i-b">
                    <img src="../../images/save.png" alt="保存" @click="saveFn('save')">
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
                   <img  v-lazy="item.imgtrueurl"alt="1"/>
                   <!-- <img :src="item.imgurl " alt="" class="upload_img"> -->
                </div>
              </li>
            </ul>
            <div class="iconcontainer iconcontainershow">
              <van-row>
                <van-col span="8">
                  <span class="preview_icon d-i-b" @click="saveFn('preview')">
                    <img src="../../images/preview.png" alt="预览">
                  </span>
                </van-col>
                <van-col span="8">
                  <span class="onload_icon d-i-b" @click="markflag=true;">
                    <!-- <form ref="form">  </form> -->
                      <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple class="fileImage" v-if="modelnum>0">
                        <van-icon name="photograph" />
                      </van-uploader>
                    <img src="../../images/onload.png" alt="上传" @click="completeFn()">
                    <span class="mark tc" v-text="modelnum"></span>
                  </span>
                </van-col>
                <van-col span="8">
                  <span class="save_icon d-i-b">
                    <img src="../../images/save.png" alt="保存" @click="saveFn('save')">
                  </span>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-col>
        <van-col span="7">
          <div class="scaling ">
             <img src="../../images/scale.png" alt="" @click="showflag=true;" class="icon_img"/>
             <div class="option_container" >
               <van-collapse v-model="activeNames" accordion id="myselect">
                 <van-collapse-item :title="modeltypevalue" name='1'>
                   <ul class="tc modeltype_list">
                     <li class="tc" v-for="item in tabarys" :key="item.id" v-text="item.name" @click="getvalueFn(item.name,item.id)"></li>
                   </ul>
                </van-collapse-item>
               </van-collapse>
             </div>
             <ul class="prewimg">
               <li v-for="(item,index) in tabLists" :key="index">
                 <div @click="selectPrewImgFn(index,item)" :class="item.id==modelid?'selDiv':''">
                   <img v-lazy="item.img" alt="1" />
                 </div>
               </li>
             </ul>
          </div>  
        </van-col>
        </van-row>
    </div>
    <!-- 当图片出现不合格的时候弹框 -->
    <div class="imgnofit_container" v-if="nofitflag" :style="{'position':nofitflag?'fixed':'absolute'}">
      <div class="img_container">
         <h4 class="tc"><span class="tc" style="color:#ff5547;" v-text="nofitnum"></span><span>张照片像素过低或大小不合格<br>建议删除再重新上传</span></h4>
         <ul class="img_list">
           <li v-for="(item,index) in fileList" :key="index">
             <img v-lazy="item.url" alt="不合格">
            </li>
         </ul>
         <div class="img_operate w100">
           <van-row class="w100">
            <van-col span="12">
              <van-button class="w100" type="default" bottom-action style="background:none;color:black;" @click="cancleImgFn">取消</van-button >
            </van-col>
            <van-col span="12">
              <van-button  class="w100" type="default"  bottom-action style="background:none;color:#ff5547;" @click="deleteImgFn">删除</van-button >
            </van-col>
          </van-row>
         </div>
      </div>
    </div>
    <!-- 提示未制作完成， -->
    <div class="imgnosucce_container" v-if="nosucceeflag" :style="{'position':nosucceeflag?'fixed':'absolute'}">
      <div class="img_container tip_container">
         <h4 class="tc">提示</h4>
         <p class="tc">本书尚未制作完成<br>还需上传<span v-text="modelnum" style="color:#ff5547"></span>张照片</p>
         <div class="img_operate w100">
           <van-row class="w100">
            <van-col span="12">
              <van-button class=" w100 ft14" type="default" bottom-action style="background:none;font-size:0.28rem;color:black;" @click="savebookFn()">先保存至书架</van-button >
            </van-col>
            <van-col span="12">
              <van-button  class=" w100 ft14" type="default"  bottom-action style="background:none;font-size:0.28rem;color:black;">继续上传</van-button >
               <van-uploader :after-read="nextonRead" accept="image/gif, image/jpeg" multiple class="fileImage">
                  <van-icon name="photograph" />
              </van-uploader>
            </van-col>
          </van-row>
         </div>
      </div>
    </div>
     <!-- 提示照片清晰度不足， -->
    <div class="imgnosucce_container" v-if="noprefactflag" :style="{'position':noprefactflag?'fixed':'absolute'}">
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
      activeNames: '',
      modeltypevalue:"",
      photoName: "",
      tabarys: [], //模板类型列表
      liid: "1",
      userid: "", //相册模板id
      modelnum: 1, //模板总共有几张，上传成功之后，剩余多少张需要上传，动态计算
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
      bookinfos:{}, //获取到的图书的信息
      fileList: [],  //不合格的图片的数据集
      imgindex:0,  // 上传的图片的数量 执行一次上传，增加1
      allsuccess:false,  //所有都上传成功，就可以点击保存按钮
      loadflag:false,  //判断是否点击了上传按钮
      canusenum:0, //从制作成功返回的可用的图片张数
      makenum:0,  //制作成功的数量
      totalnum:0, //获取当前模板可以上传的最大图片数
      finishnum:0, //获取当前模板已经上传成功的图片数量
      maxnum:0, //最大值
      failimgflag:false , //当图片大小不合格的时候，仍然坚持上传
      savebookflag:false , //未制作完成，先保存到书架
      
    };
  },
  methods: {
    //获取图书所有页面详情 -- 为了获取模板中是否已经有上传的图片了
    getBookDetailInfoFn(id,token){
      var this_ = this;
      var obj = { service: "getBookDetailInfo" , id: id, stoken: token };
      SERVERUTIL.base.baseurl(obj).then(res => {
        if (res.data.code == 0) {
          if (res.data.data) {
            if (res.data.data.length) {
              this_.modelLists = res.data.data;
              console.log(this_.modelLists);
              // 给每个页面增加一个上传图片的url属性
              var num = 0;
              this_.modelLists.forEach(item=>{
                if(item.result_img.length){
                  item.imgtrueurl = item.result_img;
                }else{
                  item.imgtrueurl = item.template_img;
                }
              });
            }else{
              this_.modelLists = [];
            }
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    //右侧的点击每一项更换模板 - 查询上一本书的制作情况，确认更换后 调用选择模板的接口获取新的bookid
    selectPrewImgFn(index, obj) {
      var this_ = this;
      this_.$toast.loading({
        mask: false,
        message: "正在更换模板...",
        duration:0
      });
      //如果loadflag为false，说明就没有点击上传，那就可以直接更换模板
      if(this_.loadflag){
        this_.getBookStatusFn(this_.vbookid,this_.token,index, obj); 
      }else{
        this_.changeModelId(obj.id);
        this_.changeModelTypeName(obj.title);
        this_.photoName = obj.title;
        this_.userid = obj.id;
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
      SERVERUTIL.base.baseurl(obj).then(res => {
        if (res.data.code == 0) {
          if (res.data.data) {
            this_.tabarys = res.data.data;
            this_.modeltypevalue = this_.tabarys[0].name;
            this_.modelListFn(this_.modeltypeid);
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    //更改右侧模板类型下拉对应的模板列表变化
    getvalueFn(value,id){
      var this_ = this;
      this_.modeltypevalue = value;
      this_.activeNames='';
      this_.$toast.loading({
        mask: false,
        message: "正在更换模板类型...",
        duration:0
      });
      this_.changeModelTypeId(id);
      this_.modelListFn(id);
    },
    //获取右侧不同模板类型下不同模板列表
    modelListFn(typeId) {
      var this_ = this;
      var obj = { service: "getTemplateList", type_id: typeId };
      SERVERUTIL.base.baseurl(obj).then(res => {
          if (res.data.code == 0) {
            this_.$toast.clear();
            if (res.data.data) {
              this_.tabLists = res.data.data;
            }
          }
        }).catch(error => {
          console.log(error);
        });
    },
    //获取左侧的模板每一页详情列表 -- 获取模板详情列表
    detailListsFn(id) {
      var this_ = this;
      var obj = { service: "getTemplateDetailInfo", id: id };
      SERVERUTIL.base.baseurl(obj).then(res => {
        if (res.data.code == 0) {
          this_.$toast.clear();
          if (res.data.data.length) {
            this_.modelLists = res.data.data;
            // 给每个页面增加一个上传图片的url属性
            this_.modelLists.forEach(item=>{
              item.imgurl ="";
            });
            //判断是否有从保存页面返回的图片数组
            if(this_.vloadimg.length){
              this_.canusenum = 0;
              this_.vloadimg.forEach((item,index) =>{
                if(item.length){
                  if(index < this_.modelLists.length){
                    this_.modelLists[index].imgurl = item;
                    this_.canusenum++;
                  };
                  
                }
              });
              //给不合格的加上标记
              this_.modelLists.forEach((item,index)=>{
                this_.vfailimgary.forEach(itemfail=>{
                  if(item.imgurl == itemfail.url){
                    item.warnflag = true;
                  }
                })
              });
              //给已经上传了的图片算总数，以便计算还可以上传几张
              this_.imgindex =this_.canusenum;
              //计算出可以
              this_.modelnum = this_.totalnum-this_.finishnum;
              if(this_.modelnum>0){
                this_.savebookflag = false;
              }else{
                this_.savebookflag = true;
              }
            }else{
              //this_.modelnum = this_.modelLists.length;
            };
          }else{
            this_.modelLists = [];
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
            this_.getBookDetailInfoFn(res.data.data.book_id,this_.token);
            this_.getBookStatusFn(res.data.data.book_id,this_.token); 
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    //上传图片
    unloadImg(file,index){
      var this_ = this;
      this_.loadflag = true;
      let formData = new FormData();
      var type = file.type;
      if (type !="image/jpg" && type !="image/jpeg" && type !="image/bmp" && type !="image/png"&& type !="image/gif") {
        this_.$toast({
          mask: true,
          forbidClick:true,
          message: "请选择图片格式文件上传(jpeg,jpg,png,gif, bmp)！"  
        });
        return false;
      };
      formData.append("file", file);
      $.ajax({
        url:'http://192.144.141.33:8081/book/upload/uploadImage',
        type:'POST',
        data:formData,
        cache: false,
        contentType: false,
        processData: false,
        async: false,
        success:function(res){
          this_.$toast.clear();
          if(res.data.url){
            var imgurl=res.data.url;
            if (file.size > 3145728 || file.size < 102400) {
              this_.fileList.push({url:imgurl,index:this_.imgindex});
            };0
            //this_.modelLists[this_.imgindex].imgtrueurl = imgurl;
            //this_.$set(this_.modelLists,this_.imgindex,this_.modelLists[this_.imgindex]);
            
            this_.getBookStatusFn(this_.vbookid, this_.token);
            this_.getBookDetailInfoFn(this_.vbookid, this_.token);
            this_.$toast.loading({
              mask: true,
              message: "上传图片"+(index)+"/" + this_.modelnum
            });
            //this_.modelnum--;
            this_.imgindex++;
            //每上传一张图片，创建一次图书
            this_.makeModelFn(imgurl,this_.imgindex);
          }else{
            this_.$toast({
              mask: false,
              message: res.message
            });
          }
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
    onRead(file,nextflag) {
      var this_ = this;
      var morenum=9;
      var meassage="一次最多上传9张照片";
      //如果是从保存页面返回的，有之前保存的图片的情况
      if(morenum>9){
        meassage="一次最多上传9张照片";
      }else{
        morenum = this_.modelnum;
        meassage = "还可以上传"+morenum+'照片';
      }
      this_.$toast({
        mask: true,
        forbidClick:true,
        message: meassage
      });
      if(file.length){//不止上传一张
        //判断上传的张数和最多可以上传的张数之间的差异
        if(file.length>morenum){
          this_.$toast({
            mask: true,
            forbidClick:true,
            message: meassage
          });
        }else{ //正常情况下，多张上传，并且上传的张数没有超出最多可上传的张数
          if(file.length>morenum){
            this_.$toast({
              mask: true,
              forbidClick:true,
              message: '该模板最多上传'+this_.modelLists.length+'张照片,请重新选择'
            });
          }else{
            file.forEach((item,index)=>{
              this_.unloadImg(item.file,index+1);
            });
          }
        }
      }else{  //只上传一张
        if(this_.modelnum>0){
          this_.unloadImg(file.file,1);
        }else{
          this_.$toast({
            mask: true,
            forbidClick:true,
            message: "已全部上传完毕，不可再传",
            duration:1000
          }); 
        }
        
      };
    },
     //当上传的图片数未满时，继续上传的操作   这里需要设置最多还能上传几张的提示
    nextonRead(file){
      var this_ = this;
      this_.nosucceeflag = false; 
      this_.onRead(file,true);
      this_.nosucceeflag = false; 
    },
     //当上传的图片数已满时，继续上传的操作 提示不可再传
    completeFn(){
      var this_ = this;
      this_.$toast({
        mask: false,
        forbidClick:true,
        message: "已全部上传完毕,可点击保存相册",
        duration:1000
      });
    },
     //制作模版
    makeModelFn(url,index){
      var this_ = this;
      var obj = {
        service: "createBook",
        id: this_.vbookid,
        stoken: this_.token,
        url:url
      };
     
      SERVERUTIL.base .baseurl(obj) .then(res => {
        if (res.data.code == 0) {
          if (res.data.data) {
            
            this_.allsuccess = res.data.data; 
            this_.makenum = index;  
            this_.makenum++;
            if(this_.maxnum<this_.makenum){
              this_.maxnum = this_.makenum;
            }
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
            console.log(res.data.data)
             this_.totalnum = res.data.data.total_num;
             this_.finishnum = res.data.data.finish_num;
             this_.modelnum = this_.totalnum-this_.finishnum;
             var content = "当前图书未制作完成";
            if(res.data.data.finish_num<res.data.data.total_num){
              content = "当前模板中图片未全部上传，确定更换模板";
            };
            if(objparams){
              this_.$dialog.confirm({
                title: '确认更换',
                message: content
              }).then(() => {
                this_.$toast.loading({
                  mask: false,
                  message: "正在更换模板...",
                  duration:0
                });
                this_.modelLists.forEach(item=>{
                  item.imgurl ="";
                });
                this_.i = index;
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
     var this_ = this;
     this_.savebookflag=true;
     this_.saveFn();
    },
   
    //去修改
    gochangeFn(){

    },
    //大小不合格的取消操作
    cancleImgFn(){
      var this_ = this;
      this_.nofitflag=false;
      this_.fileList.forEach((item,index)=>{
        this_.modelLists[item.index].warnflag =true;
      });
      this_.failimgflag = true;
      this_.changefailimg(this_.fileList);
      this_.saveFn();
    },
    //删除图片
    deleteImgFn(){
      var this_ = this;
      this_.nofitflag = false;
      this_.fileList.forEach((item,index)=>{
        this_.modelLists[item.index].imgtrueurl ="";
        this_.modelnum++;
        this_.imgindex--;
      });
      this_.fileList=[];
      this_.changefailimg(this_.fileList);
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
      });
    },
    //保存公共部分
    savecommonFn(titlename){
      var this_ = this;
      if(titlename == 'preview'){
        titlename = '预览';
      }else  if(titlename == 'save'){
        titlename = '保存成功';
      }{}
      var timer;
      //如果没有，判断创建图书返回的是否都为true，如果有不为的，不跳转，不清晰的图书弹框出现；如果全部都是true，就跳转
      //执行制作的调用
       // 判断是否是模板中的所有图片都已上传，这是等于的情况
      this_.$toast.loading({
        mask: false,
        message: "正在提交模板...",
        duration:0
      });
      if(this_.maxnum < this_.imgindex || this_.maxnum == this_.imgindex){
        this_.modelLists.forEach((item,index)=>{
          if(!item.result_img.length){
             this_.makeModelFn(item.imgtrueurl,index);
          }
         
        });
      };
      //判断当所有的图片都已经制作成功了，就可以跳转到成功页面 -- 分为就在当前页面上传和从成功页面返回来两种情况
      //判断制作的num和我上传的图片的总数是一样的时候，就可以跳转
     timer = setTimeout(function(){
        this_.$router.push({
          path: "/savesuccess",
          name: "SAVESUCCESS",
          params: {
            id: this_.$route.params.id,
            flag: true,
            title: titlename
          }
        });
        this_.$toast.clear();
      },this_.imgindex*1000);
    },
    //保存功能并跳到保存成功页面
    saveFn(name) {
      var this_ = this;
      var num=0;
      //对列表中有上传图片的进行计算总数
      num = this_.modelLists.length - this_.modelnum;
      //判断是都有图片上传
      if(this_.modelnum>0){
        if(this_.modelnum === this_.modelLists.length){
          this_.$toast({
            mask: false,
            message: "请先选择上传图片",
          });
        }else{
          if(num == this_.modelLists.length){
            //判断是否有不合格的图片，如果有，显示
            if(this_.fileList.length){
              this_.nofitnum = this_.fileList.length;
              if(!this_.failimgflag){
                if(name == 'save'){
                  this_.nofitflag = true;
                }else{
                  this_.savecommonFn(name);
                };
                return;
              }else{
                this_.savecommonFn(name);
              }
            }else{  
              this_.savecommonFn(name);
            };
          }else{
            this_.$toast.clear();
            if(this_.savebookflag){
              this_.nosucceeflag=false;
              //判断是否有不合格的图片，如果有，显示
              if(this_.fileList.length){
                this_.nofitnum = this_.fileList.length;
                if(!this_.failimgflag){
                  if(name == 'save'){
                    this_.nofitflag = true;
                  }else{
                    this_.savecommonFn(name);
                  };
                  return;
                }else{
                  this_.savecommonFn(name);
                }
              }else{  
                this_.savecommonFn(name);
              };
            }else{
              if(name == 'save'){
                this_.nosucceeflag=true;
              }else{
                this_.savecommonFn(name);
              };
              
            }
          }
        };
      }else{
        this_.$router.push({
          path: "/savesuccess",
          name: "SAVESUCCESS",
        });
      }
     
    },
    ...mapMutations([ "changeToken", "changeNickname", "changeModelTypeId", "changeModelTypeName",
      "changeModelId", "changebookid","changeimg","changefailimg","changesaveflag"
    ])
  },
  mounted() {
    var this_ = this;
    document.title = "马上制作";
    if(this_.vsavetoeditflag){
      this_.$router.push({
        path: '/editimg',
        name: 'EDITIMG'
      });
    }else{
      this_.photoName = this_.modeltypename;
      this_.modelTypeFn();
      this_.liid = this_.modeltypeid; 
      if(!this_.vloadimg.length){
        this_.getbookidFn(this_.modelid,this_.token,this_.modeltypename,this_.vnickname);              
      };
      
      if(this_.vbookid){
        this_.getBookDetailInfoFn(this_.vbookid,this_.token);
        this_.getBookStatusFn(this_.vbookid,this_.token); 
      }
      
    };
    this_.changesaveflag(false);
    
  },
  computed: {
    ...mapState([
      "token",
      "vnickname",
      "modeltypeid",
      "modeltypename",
      "modelid",
      "vbookid","vloadimg","vfailimgary","vsavetoeditflag"
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
        #myselect{
          width: 1.8rem;
          position: fixed;
          text-align: center;
          background: none;
          right:0.1rem;
          div{
            padding: 0;
            font-size: 0.28rem;
            div{
              padding: 0;
              .van-cell__value--alone{
                text-align: center;
                font-size: 0.28rem;
              }
            }
            
          }
          .van-collapse-item__content{
            padding:0;
            background: red;
            .modeltype_list{
              padding: 0;
              background: none;
              li{
                padding: 0.06rem;
                font-size: 0.28rem;
                box-sizing: border-box;
              }
            }
          }
        }
        
        
      }

      .prewimg {
        display: flex;
        flex-direction: column;
        margin-top: 0.88rem;
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
            position: relative;
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
            .warning_icon{
              display: inline-block;
              position: absolute;
              width: 0.64rem;
              height: 0.64rem;
              top:0;
              right: 14px;
              background: url(../../images/warning.png) no-repeat;
              background-size: 100% 100%;
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