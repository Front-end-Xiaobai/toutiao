<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="action-head">
        <el-radio-group  size="mini">
          <el-radio-button :label="false">粉丝列表</el-radio-button>
          <el-radio-button :label="true">粉丝画像</el-radio-button>
        </el-radio-group>
      </div>
      <el-row>
        <el-col :span="3" style="margin-left: 10px" v-for="(fan,index) in fans" :key="index">
          <div class="block">
            <el-avatar shape="circle"  :size="100" fit="cover" :src="fan.photo"></el-avatar>
            <span class="fans-name">{{fan.name}}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import {getFansMessage} from "../../api/fans";

  export default {
    name: "index",
    data(){
      return{
        fans:[],
      }
    },
    created() {
      this.loadFansMessage()
    },
    methods:{
      loadFansMessage(){
        getFansMessage().then(res=>{
          console.log(res);
          this.fans = res.data.data.results
        })
      }
    }
  }
</script>

<style scoped>
  .action-head{
    margin-bottom: 20px;
  }
  .block{
    text-align: center;
  }
</style>
