<template>
<div class="setting-container">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col :span="12">
        <el-form :model="user" label-width="70px">
          <el-form-item label="编号">
            {{user.id}}
          </el-form-item>
          <el-form-item label="手机">
            {{user.mobile}}
          </el-form-item>
          <el-form-item label="媒体名称">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍">
            <el-input type="textarea" v-model="user.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onUpdateUser">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" :offset="4">
        <label for="file">
          <el-avatar shape="square" :size="150" fit="cover" :src="user.photo"></el-avatar>
          <p>点击修改头像</p>
        </label>
        <input id="file" type="file" hidden ref="file" @change="onFileChange">
      </el-col>
    </el-row>
  </el-card>
  <el-dialog
    title="修改头像"
    :visible.sync="dialogVisible"
    append-to-body
    @opened="onDialogOpend"
    @closed="onDialogClosed"
    >
    <div class="preview-image-wrap">
      <img  class="preview-image" :src="previewImage" alt="" ref="preview-image">
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onUpdatePhoto">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
  import {getUserProfile,updateUserPhoto,updateUserProfile} from "../../api/user"
  import 'cropperjs/dist/cropper.css'
  import Cropper from 'cropperjs'
  import globalBus from '../../utils/global-bus'

  export default {
    name: "settingIndex",
    data() {
      return {
        user:{
          email: '',
          id: null,
          intro: '',
          mobile: '',
          name: '',
          photo: ''
        },
        dialogVisible: false,
        previewImage: '',
        cropper:'',
      }
    },
    created() {
      this.loadUser()
    },
    methods: {
      onUpdateUser() {
        updateUserProfile(this.user).then(res=>{
          globalBus.$emit('update-user',this.user)
        })
      },
      loadUser(){
        getUserProfile().then(res=>{
          // console.log(res)
          this.user = res.data.data
        })
      },
      onFileChange(){
        // console.log('file change'
        const file = this.$refs.file
        const blobData = window.URL.createObjectURL(file.files[0])
        this.previewImage = blobData

        this.dialogVisible = true
        //解决选择相同图片不触发change事件
        this.$refs.file.value = ''
      },
      onDialogOpend(){
        const image = this.$refs['preview-image']
         this.cropper = new Cropper(image, {
          aspectRatio: 1,       //裁截器比例
           viewMode: 1 ,       //裁截器是否能移出图片
           dragMode: 'none',
           // cropBoxMovable: false,
           cropBoxResizable: false,
           background: false,
           // movable: true
           //移动裁截器，位置的坐标
          // crop(event) {
          //   console.log(event.detail.x);
          //   console.log(event.detail.y);
          //   console.log(event.detail.width);
          //   console.log(event.detail.height);
          //   console.log(event.detail.rotate);
          //   console.log(event.detail.scaleX);
          //   console.log(event.detail.scaleY);
          // },
        });
      },
      onDialogClosed(){
        this.cropper.destroy()
      },
      onUpdatePhoto(){
        this.cropper.getCroppedCanvas().toBlob(file => {
          const fd = new FormData()
          fd.append('photo',file)
          updateUserPhoto(fd).then(res=>{
            this.user.phote = window.URL.createObjectURL(file)
            this.dialogVisible = false

            globalBus.$emit('update-user',this.user)

          })
        })
      },
    },
  }
</script>

<style scoped>
  .preview-image{
    display: block;
    max-width: 100%;
    height: 200px;
  }
</style>
