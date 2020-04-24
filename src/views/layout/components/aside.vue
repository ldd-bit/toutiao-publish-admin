<template>
  <!-- 后台界面侧边栏 -->
<el-row class="tac">
  <el-col>
    <el-menu
      default-active="/"
      router
      background-color="#002033"
      text-color="#fff"
      :collapse="isCollapse"
      active-text-color="#ffd04b">
      <div class="imgAside">
      <div class="imgMin"><img src="./logo_min.png" alt="" class="logomin" v-show="isCollapse"></div>
       <img src="./logo_admin.png" alt="" class="logoAdmin" v-show="!isCollapse">
      </div>
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-document"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="el-icon-chat-dot-round"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="el-icon-present"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/settings">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</template>

<script>

export default {
  name: 'indexAside',
  props: ['is-collapse'],
  components: {},
  data () {
    return {
      // isCollapse: false,
      // isShowMin: false,
      // isShowMax: true
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
  },
  created () {
  },
  mounted () {
  }
}
</script>
<style lang='less' scoped>
.tac {
  height: 100%;
  background-color: #002033;
  .imgAside {
    // text-align: center;
    width: 100%;
    margin-left: 20px;
    .imgMin {
      width: 100%;
      .logomin {
      width: 50px;
      margin: 12px 0 9px 0;
      margin-left: -7px;
      }
    }
    .logoAdmin {
      // display: none;
      // width: 140px;
      margin: 12px 0 9px 0;
  }
  }
  .el-menu-item {
    width: 200px;
  }
}
</style>
