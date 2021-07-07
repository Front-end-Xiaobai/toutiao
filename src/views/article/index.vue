<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!--        面包屑路径导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--    数据筛选表单-->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option :label="channel.name" :value="channel.id" v-for="(channel,index) in channels" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"

          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticles(1)" :disabled="loading">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共筛选到 {{totalCount}} 条消息:
      </div>
      <!--    数据列表-->
<!--      表格组件
      把需要展示的列表数据绑定给table组件的data属性
      注意：自己不用遍历，它自己会遍历
      设置表格列：el-table-column
      width:设置表格的宽度
      label设置标题
      prop 用来渲染的字段，默认只能展示文本
-->
      <el-table
        :data="articles"
        style="width: 100%"
        stripe
        class="list-table"
        size="mini"
        v-loading="loading"
      >
        <el-table-column
          label="封面"
          >
          <template slot-scope="scope">
            <el-image style="width: 100px;height: 100px;"
            :src="scope.row.cover.images[0]"
            fit="cover"
            ></el-image>

<!--            <img v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" alt="" class="article-cover">-->
<!--            <img v-else src="./Capture001.png" alt="" class="article-cover">-->
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          >
        </el-table-column>
        <el-table-column
          label="状态">
<!--          如果需要在自定义模板中获取当前遍历项数据，那么就在template上声明
              solt-scope = "scope"
-->
          <template slot-scope = "scope">
<!--            <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>-->
<!--            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>-->
<!--            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>-->
<!--            <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>-->
<!--            <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag>-->

<!--            简便方法-->
            <el-tag  :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              circle
              icon="el-icon-edit"
              type="primary"
              @click="$router.push('/publish/?id='+scope.row.id.toString())"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              circle
              icon="el-icon-delete"
              @click="onDeleteArticle(scope.row.id)"
              ></el-button>
          </template>

        </el-table-column>
      </el-table>
      <!--    页码-->
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        background
        :disabled="loading"
        @current-change="onCurrentChange"
        :page-size="pageSize"
        :current-page.sync="page"
      />
<!--   :current-page.sync="page" 拿到实时的页码   -->
    </el-card>
  </div>
</template>

<script>
  import {getArticles,getArticleChannels,deleteArticle} from "../../api/article";
  export default {
    name: "ArticleIndex",
    data(){
      return{
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        articles:[],
        articleStatus:[
          {status: 0,text: '草稿',type: 'info'},
          {status: 1,text: '待审核',type: ''},
          {status: 2,text: '审核通过',type: 'success'},
          {status: 3,text: '审核失败',type: 'warning'},
          {status: 4,text: '已删除',type: 'danger'}
        ],
        totalCount: 0,   //数据总条数
        pageSize: 10,     //每页多少条数据
        status: null,       //查询文章状态，不传就是全部
        channels:[],
        channelId:null,
        rangeDate:[],
        loading:true,
        page:1
       }
    },
    created() {
      this.loadArticles(1)
      this.loadChannels()
    },
    methods:{
      loadArticles(page){
        this.loading = true
        getArticles({
          page,
          per_page:this.pageSize,
          status:this.status,
          channel_id:this.channelId,
          begin_pubdate:this.rangeDate ? this.rangeDate[0] : null ,
          end_pubdate:this.rangeDate ? this.rangeDate[1] : null,
        }).then(res=>{
          // const {results,totalCount} = this.data.data
          this.articles = res.data.data.results
          this.totalCount = res.data.data.total_count
          this.loading = false
        })
      },
      loadChannels(){
        getArticleChannels().then(res=>{
          this.channels = res.data.data.channels
        })
      },
      onCurrentChange(page){
        this.loadArticles(page)
      },
      onDeleteArticle(articleId){
        //找到数据接口
        deleteArticle(articleId.toString()).then(res=>{
          //删除成功更新当前页的数据列表
             this.loadArticles(this.page)
        })
        //封装请求调用
        //删除请求调用
        //处理响应结果
      }
    }
  }
</script>

<style scoped>
  .filter-card{
    margin-bottom: 30px;
  }
  .list-table{
    margin-bottom: 20px;
  }
  .article-cover{
    width: 60px;
    background-size: cover;
  }

</style>
