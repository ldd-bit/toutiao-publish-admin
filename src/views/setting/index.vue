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
          <el-form ref="message" :model="message" :rules="rules" label-width="80px">
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
              <el-button type="primary" @click="onSubmit" :loading="submit">保存设置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="7" :offset="3">
        <label for="avatar">
          <el-avatar shape="square" :size="150" fit="cover" class="demonstration" :src="message.photo"></el-avatar><br>
          <span class="demonstration">点击此处上传头像</span>
        </label>
        <input type="file" hidden id="avatar" @change="selectAvatar" ref="avatar">
      </el-col>
    </el-row>
  </el-card>
  <el-dialog
    title="修改头像"
    :visible.sync="dialogVisible"
    width="30%"
    :append-to-body="true"
    @opened="opened">
    <div class="avatarArea">
      <img :src="avatarURL" fit="cover" class="avatar" ref="cuteImage"/>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="uploadAvatar" :loading="IsSure">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { getUserInfo, getUserAvatar, editUserInfo } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'settingIndex',
  props: {},
  components: {},
  data () {
    return {
      // 表单需要渲染的数据
      message: {},
      // 表单验证规则
      rules: {
        name: [
          { required: true, message: '请输入媒体名称', trigger: 'blur' },
          { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入媒体介绍', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      dialogVisible: false, // 对话框是否开启
      avatarURL: '', // 对话框的图片地址
      cropper: '',
      submit: false, // 提交加载
      IsSure: false // 提交头像加载
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    // 提交左侧表单
    onSubmit () {
      this.submit = true
      this.$refs.message.validate(valid => {
        if (!valid) {
          return false
        } else {
          editUserInfo(this.message).then(res => {
            this.submit = false
          })
        }
      })
    },
    // 获取左边表单的数据
    getMessage () {
      getUserInfo().then(res => {
        // console.log(res)
        this.message = res.data.data
      })
    },
    // 当选择头像的input标签发生改变时
    selectAvatar () {
      const file = this.$refs.avatar
      const avatarURL = window.URL.createObjectURL(file.files[0])
      // console.log(avatarURL)
      this.avatarURL = avatarURL
      // 启动对话框裁剪头像
      this.dialogVisible = true
      // 可以重复选择一张图片
      this.$refs.avatar.value = ''
    },
    // 当对话框打开时
    opened () {
      const image = this.$refs.cuteImage
      // 如果之前选过图片,就把之前的图片裁剪器里边的图片换掉
      if (this.cropper) {
        this.cropper.replace(this.avatarURL)
        return
      }
      this.cropper = new Cropper(image, {
        viewMode: 1,
        aspectRatio: 1,
        dragMode: 'none'
      })
    },
    // 点击上传图片
    uploadAvatar () {
      this.IsSure = true
      this.cropper.getCroppedCanvas().toBlob(blob => {
        // console.log(blob)
        const file = new FormData()
        file.append('photo', blob)
        // console.log(file)
        getUserAvatar(file).then(res => {
          // console.log(res)
          this.IsSure = true
          this.dialogVisible = false
          this.message.photo = window.URL.createObjectURL(blob)
        })
      })
    }
  },
  created () {
    this.getMessage()
  },
  mounted () {
  }
}
</script>
<style lang='less' scoped>
.demonstration {
  margin-bottom: 16px;
}
.avatar {
  display: block;
  max-width: 100%;
  height: 200px;
}
</style>
