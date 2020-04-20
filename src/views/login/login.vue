<!--  -->
<template>
    <div class="login-container">
        <!-- //做登录页面 -->
      <el-form ref="form" :model="user" class="login-from">
        <div class="login-img">
          <img src="./logo_index.png" alt="" class="login-logo">
        </div>
        <el-form-item>
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.code" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="login-button" :loading="loginLoading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import request from '@/utils/axios'
export default {
  name: 'loginIndex',
  props: {},
  components: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      checked: false,
      loginLoading: false
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    onSubmit () {
      this.loginLoading = true
      request({
        method: 'post',
        url: '/mp/v1_0/authorizations',
        data: this.user
      }).then(res => {
        console.log(res)
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.loginLoading = false
      }).catch(() => {
        this.$message.error('登陆失败')
        this.loginLoading = false
      })
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
.login-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(./login_bg.jpg),no-repeat;
  background-size: cover;
  .login-from {
    width: 300px;
    padding: 8px 50px;
    // text-align: center;
    background-color: white;
    .login-img {
      text-align: center;
      .login-logo {
      width: 150px;
      margin: 20px 0 20px 0;
     }
    }
    .login-button {
      width: 100%;
    }
  }
}
</style>
