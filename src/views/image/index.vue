<template>
<div class='image-container'>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom: 20px">
      <el-radio-group v-model="dataImage.collect" size="small" @change="selectImage">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button style="float: right" type="success" size="small" @click="dialogVisible = true">添加素材</el-button>
    </div>
    <el-row :gutter="10">
      <el-col :xs="12" :sm="8" :md="6" :lg="4" v-for="item in images" :key="item.id">
        <div class="grid-content bg-purple">
           <el-image
            style="width: 150px; height: 150px"
            :src="item.url"
            fit="cover">
          </el-image>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <el-dialog
    title="上传文件"
    :visible.sync="dialogVisible"
    width="30%"
    :append-to-body="true">
    <el-upload
      action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
      :headers="headers"
      list-type="picture-card"
      drag
      class="uploadImage"
      name="image"
      :on-success="success"
      :auto-upload="false"
      ref="upload"
      multiple>
      <i class="el-icon-plus"></i>
    </el-upload>
    <!-- <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog> -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="uploadSure">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { getImage } from '@/api/image'
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      dataImage: {
        collect: false
      },
      images: [],
      dialogVisible: false,
      headers: {
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('user')).token}`
      }
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    // 获取图片素材
    getImages (data = false) {
      getImage(data).then(res => {
        console.log(res)
        this.images = res.data.data.results
        // console.log(images)
      })
    },
    // 获取收藏图片
    selectImage () {
      this.getImages(this.dataImage)
    },
    success () {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.$refs.upload.clearFiles()
      this.getImages()
    },
    // 确定上传
    uploadSure () {
      this.dialogVisible = false
      this.$refs.upload.submit()
    }
  },
  created () {
    this.getImages()
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.uploadImage {
  width: 50%;
}
</style>
