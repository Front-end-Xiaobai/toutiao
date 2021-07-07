<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
<!--        <el-button style="float: right; padding: 3px 0" type="text">操作按钮  -->
      </div>
      <div class="action-head">
        <el-radio-group v-model="collect" @change="onCollectChange(1)" size="mini">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button size="mini" type="success" @click="dialogUploadVisible = true">上传素材</el-button>
      </div>
<!--      素材列表-->
      <el-row :gutter="20">
        <el-col  :xs="12" :sm="6" :md="6" :lg="4" v-for="(img,index) in images" :key="index" class="image-item">
          <el-image
            style="height: 100px"
            :src='img.url'
            fit="cover"
          ></el-image>
          <div class="image-action">
            <el-button
            type="warning"
            :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            circle
            size="mini"
            @click="onCollect(img)"
            :loading="img.loading"
            ></el-button>
<!--            <i-->
<!--              :class="{-->
<!--              'el-icon-star-on': img.is_collected,-->
<!--              'el-icon-star-off': !img.is_collected,-->
<!--              }"-->
<!--              @click="onCollect(img)"-->
<!--            ></i>-->
            <el-button
              icon="el-icon-delete-solid"
              circle
              size="mini"
              type="danger"
              @click="onDelete(img)"
              :loading="img.deleteLoading"
            ></el-button>
          </div>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :current-page.sync="page"
        @current-change = 'onPageChange'
      >
      </el-pagination>
    </el-card>

    <el-dialog title="上传素材" :visible.sync="dialogUploadVisible" :append-to-body="true">
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        multiple
        :show-file-list="false"
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
  import {getImages,collectImages,deleteImages} from "../../api/image";

  export default {
    name: "ImageIndex",
    data(){
      const user = JSON.parse(window.localStorage.getItem('user'))
      return{
        collect: false,
        images:[],
        dialogUploadVisible: false,
        uploadHeaders:{
          Authorization: `Bearer ${user.token }`
        },
        totalCount: 0,
        page: 1,
      }
    },
    created() {
      this.loadImages(1,false)
    },
    methods:{
      loadImages(page,collect = false){
        this.page = page
        getImages({
          collect: this.collect,
          page,
          per_page: 24
        }).then(res=>{
          const results = res.data.data.results
          results.forEach(img=>{
            img.loading = false
            img.deleteLoading = false
          })
          this.images = res.data.data.results
          this.totalCount = Math.ceil((res.data.data.total_count*10)/25)
        })
      },
      onCollectChange(value){
        this.loadImages(1,  value)
      },
      onUploadSuccess(){
        this.dialogUploadVisible = false
        this.loadImages(this.page,)
      },
      onPageChange(page){
        this.loadImages(page)
      },
      onCollect(img){
        //简单用法
        img.loading = true
        collectImages(img.id,!img.is_collected).then(res=>{
          // console.log(res);
          img.is_collected = !img.is_collected
          img.loading = false
        })
         // if (img.is_collected){
         //   collectImages(img.id,false)
         // }else {
         //   collectImages(img.id,true)
         // }
      },
      onDelete(img){
        img.deleteLoading = true
        deleteImages(img.id).then(res=>{
          this.loadImages(this.page)
          img.deleteLoading = false
        })
      }
    },
  }
</script>

<style scoped>
  .action-head {
    padding-bottom:20px;
    display: flex;
    justify-content: space-between;
  }
  .image-item{
    position: relative;
  }
  .image-action{
    display: flex;
    font-size: 25px;
    justify-content: space-evenly;
    align-items: center;
    color: #ffffff;
    height: 40px;
    background-color: rgba(204,204,204,.3);
    position: absolute;
    bottom: 4px;
    left: 5px;
    right: 5px;
  }

</style>
