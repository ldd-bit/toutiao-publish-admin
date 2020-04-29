<template>
<div class='header-containter'>
  <div class="header-title">
    <i class="el-icon-s-fold" @click="isCollapse"></i>
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
      <el-dropdown-item @click.native="exitLogin">
        <i class="el-icon-unlock"></i>
        <span>退出登录</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import globalBus from '@/utils/global-bus'
export default {
  name: 'indexHeader',
  props: {},
  components: {},
  data () {
    return {
      user: {},
      msg: false
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
    },
    isCollapse () {
      this.msg = !this.msg
      this.$emit('myEvent', this.msg)
    },
    exitLogin () {
      this.$confirm('您确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.getUserInfo()
    globalBus.$on('update-user', (data) => {
      this.user.name = data.name
      this.user.photo = data.photo
      // console.log(data)
    })
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
