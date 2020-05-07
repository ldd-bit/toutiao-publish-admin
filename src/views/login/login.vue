<!--  -->
<template>
    <div class="login-container">
        <!-- //做登录页面 -->
      <el-form ref="login-from" :model="user" :rules="rules" class="login-from">
        <div class="login-img">
          <img src="./logo_index.png" alt="" class="login-logo">
        </div>
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="user.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="login-button" :loading="loginLoading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import { userLogin } from '@/api/user'
// import indexView from '@/views/home/index.vue'
export default {
  name: 'loginIndex',
  props: {},
  components: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        checked: false
      },
      loginLoading: false,
      rules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请正确输入号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请正确输入验证码格式', trigger: 'change' }
        ],
        checked: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    onSubmit () {
      // 调用validate,完成对表单的验证
      this.$refs['login-from'].validate(valid => {
        // 如果表单验证不通过,阻止下边代码执行
        if (!valid) {
          return
        }
        // 表单验证通过,发送ajax请求等操作
        this.login()
      })
    },
    async login () {
      // 将按钮变成加载状态
      this.loginLoading = true
      try {
        const res = await userLogin(this.user)
        // 登陆成功跳转页面
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        this.$router.push({ name: 'indexRouter' })
        // console.log(res)
        // 按钮取消记载状态
        this.loginLoading = false
      } catch {
        this.$message.error('登陆失败')
        // 按钮取消加载状态
        this.loginLoading = false
        // console.log(err)
      }
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
