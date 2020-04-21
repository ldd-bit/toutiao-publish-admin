<template>
<div class='header-containter'>
  <div class="header-title">
    <i class="el-icon-s-fold"></i>
    <span>江苏传智播客科技教育有限公司</span>
  </div>
  <el-dropdown>
    <span class="el-dropdown-link">
      <img :src="user.photo" alt="" class="avatarUser">
      <span>{{user.name}}</span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <i class="el-icon-setting"></i>
        <span>个人设置</span>
      </el-dropdown-item>
      <el-dropdown-item>
        <i class="el-icon-unlock"></i>
        <span>退出登录</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  name: 'indexHeader',
  props: {},
  components: {},
  data () {
    return {
      user: {}
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    getUserInfo () {
      getUserInfo().then(res => {
        this.user = res.data.data
      })
    }
  },
  created () {
    this.getUserInfo()
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.header-containter {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .header-title {
    display: flex;
    align-self: center;
    .el-icon-s-fold {
    margin-right: 5px;
    font-size: 22px;
    vertical-align:center
    }
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #409EFF;
    .avatarUser {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .el-icon-arrow-down {
    font-size: 12px;
    }
  }
}
</style>
