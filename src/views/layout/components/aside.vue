<template>
  <el-menu
    default-active="/home"
    class="nav-menu"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="collapse"
  >
    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-document"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image" >
      <i class="iconfont iconimg"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="iconfont iconpublish"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="iconfont iconcomment"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="el-icon-sugar"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/setting">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "AppAside",
    data(){
      return {
      }
    },
    props:['collapse'],
    methods: { }
  }
</script>

<style scoped>
  @font-face {
    font-family: "iconfont"; /* Project id 2637176 */
    src: url('//at.alicdn.com/t/font_2637176_x18zh2t3ii.woff2?t=1624851329665') format('woff2'),
    url('//at.alicdn.com/t/font_2637176_x18zh2t3ii.woff?t=1624851329665') format('woff'),
    url('//at.alicdn.com/t/font_2637176_x18zh2t3ii.ttf?t=1624851329665') format('truetype');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .iconcomment:before {
    content: "\e64f";
  }

  .iconpublish:before {
    content: "\e645";
  }

  .iconimg:before {
    content: "\e61b";
  }
  .nav-menu .iconfont{
    margin-right: 10px;
    padding-left: 5px;
  }
</style>
