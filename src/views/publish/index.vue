<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
<!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$route.query.id? '修改文章':'发表文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="article" label-width="40px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
<!--          <el-tiptap v-model="article.content" :extensions="extensions"></el-tiptap>-->
<!--          <el-tiptap v-model="article.content" :extensions="extensions"></el-tiptap>-->
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option v-for="(channel,index) in channels" :key="index" :label="channel.name" :value="channel.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">{{this.$route.query.id? '修改文章':'发表文章'}}</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {getArticleChannels,addArticle,updateArticle,getArticle} from "../../api/article"
  // import { ElementTiptap } from 'element-tiptap'
  // import {
  //   Doc,
  //   Text,
  //   Paragraph,
  //   Heading,
  //   Bold,
  //   Underline,
  //   Italic,
  //   Strike,
  //   ListItem,
  //   BulletList,
  //   OrderedList
  // } from 'element-tiptap'

  export default {
    name: "PublishIndex",
    data() {
      return {
        channels:[],          //文章频道列表
        article:{
          title:'',                  //文章标题
          content: '',              //文章内容
          cover:{
            type: 0,               //文章类型    -1：自动  0：无图   1：一张图  3： 三张图
            images: [],
          },
          channel_id: null,
        },
        // extensions: [
        //   new Doc(),
        //   new Text(),
        //   new Paragraph(),
        //   new Heading({ level: 5 }),
        //   new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        //   new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        //   new Italic(),
        //   new Strike(),
        //   new ListItem(),
        //   new BulletList(),
        //   new OrderedList()
        // ]
      }
    },
    created() {
      this.loadChannels()
      if (this.$route.query.id){
        this.loadArticle()
      }
    },
    methods: {
      onPublish(draft = false) {
        if(this.$route.query.id){
          const ArticleId = this.$route.query.id
          updateArticle(ArticleId,this.article,draft).then(res=>{
          })
          this.$router.push('/article')
        }else {
          addArticle(this.article,draft).then(res=>{
            console.log(res);
            this.$router.push('/article')
          })
        }
      },
      loadChannels(){
        getArticleChannels().then(res=>{
          // console.log(res)
          this.channels = res.data.data.channels
        })
      },
      loadArticle(){
        getArticle(this.$route.query.id).then(res=>{
          this.article = res.data.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
