<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        :data="articles"
        style="width: 100%"
        stripe
        class="table-list"
      >
        <el-table-column
          prop="title"
          label="标题"
          >
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
          >
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          prop="address"
          label="评论状态">
          <template slot-scope="scope">
            {{ scope.row.comment_status ? '正常' : '关闭'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onStatusChange(scope.row)"
              :disabled="false"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
<!--      分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import {getArticles,updateComentStatus} from "../../api/article";

  export default {
    name: "index",
    data() {
      return {
        articles:[],
        totalCount:0,
        pageSize: 10,
        page: 1
      }
    },
    created() {
      this.loadArticles()
    },
    methods: {
      handleSizeChange() {
        this.loadArticles(1)
      },
      handleCurrentChange(page) {
        // console.log(page);
        this.loadArticles(page)
      },
      loadArticles(page = 1){
        this.page = page
        getArticles({
          response_type: 'comment',
          page,
          per_page:this.pageSize
        }).then(res=>{
          // console.log(res);
          const results = res.data.data.results
          results.forEach(article=>{
            article.statusDisabled = false
          })
          this.articles = res.data.data.results
          this.totalCount = res.data.data.total_count
        })
      },
      onStatusChange(article){
        // console.log(article);
        article.statusDisabled = true
         updateComentStatus(article.id.toString(),article.comment_status).then(res=>{
           article.statusDisabled = true
         })
      },
    },
  }
</script>


<style scoped>
  .table-list{
    margin-bottom: 30px;
  }
</style>
