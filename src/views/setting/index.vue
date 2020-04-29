<template>
<div class='setting-container'>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
     <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row type="flex" class="row-bg" justify="center" :gutter="20">
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-form ref="form" :model="message" :rules="rules" label-width="80px">
            <el-form-item label="编号">
              {{message.id}}
            </el-form-item>
            <el-form-item label="手机">
              {{message.mobile}}
            </el-form-item>
            <el-form-item label="媒体名称" prop="name">
              <el-input v-model="message.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍" prop="intro">
              <el-input type="textarea" v-model="message.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="message.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存设置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="7" :offset="3">
        <el-avatar shape="square" :size="150" fit="cover" class="demonstration" :src="message.photo"></el-avatar><br>
        <span class="demonstration">点击此处上传头像</span>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  name: 'settingIndex',
  props: {},
  components: {},
  data () {
    return {
      message: {},
      rules: {
        name: [
          { required: true, message: '请输入媒体名称', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入媒体介绍', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    getMessage () {
      getUserInfo().then(res => {
        // console.log(res)
        this.message = res.data.data
      })
    }
  },
  created () {
    this.getMessage()
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.demonstration {
  margin-bottom: 16px;
}
</style>
