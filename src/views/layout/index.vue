<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto"><AppAside class="aside-menu" :collapse="isCollapse"/></el-aside>

    <el-container>
      <el-header class="header">
        <div>
          <i :class="{'el-icon-s-unfold': isCollapse,'el-icon-s-fold': !isCollapse}" @click="isCollapse = !isCollapse"></i>
          <span>管理</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
          </div>
<!--          <span>-->
<!--    下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--          </span>-->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
<!--  <div class="layout-container">-->
<!--    <div>顶部导航栏</div>-->
<!--    <router-view/>-->
<!--    <div>侧边导航栏</div>-->
<!--  </div>-->
</template>

<script>
  import AppAside from './components/aside'
  import { getUserProfile } from "../../api/user"
  import globalBus from '../../utils/global-bus'


  export default {
    name: "LayoutIndex",
    data(){
      return{
        user:{},
        isCollapse: false
      }
    },
    components:{
      AppAside
    },
    created() {
      //组件初始化成功，申请用户资料
      this.loadUserProfile()

      globalBus.$on('update-user',data=>{
        // console.log(data);
        //注意设置的名字长度为7，长度不符会报400
        this.user.name = data.name
        this.user.photo = data.photo
      })
    },
    methods:{
      //除了登录接口，其他接口都需要授权才能使用（需要你的身份）
      loadUserProfile(){
        getUserProfile().then(res=>{
        this.user = res.data.data
        })
      },
      onLogout(){
        this.$confirm('是否确定退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.localStorage.removeItem('user')
          this.$router.push('/login')
        })
      }
    },

  }
</script>

<style scoped>
  .layout-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .aside {
    /*width: 200px;*/
    background-color: #d3dce6;
  }
  .aside-menu{
    height: 100%;
  }
.header {
  background-color: #b3c0d1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*border: 1px #fff solid;*/
}
  .main{
    background-color: #e9eef3;
  }
  .avatar-wrap{
    display: flex;
    align-items: center;
  }
  .avatar {
    width: 40px;
    height: 40px;border-radius: 50%;
    margin-right: 10px;
  }
</style>
