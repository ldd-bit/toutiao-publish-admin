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
      <el-radio-group v-model="collect" size="small" @change="selectImage">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button style="float: right" type="success" size="small" @click="dialogVisible = true">添加素材</el-button>
    </div>
    <el-row :gutter="15" style="margin-bottom: 20px">
      <el-col :xs="12" :sm="8" :md="6" :lg="4" v-for="item in images" :key="item.id">
        <div class="grid-content bg-purple imageItem">
           <el-image
            style="width: 100%; height: 160px"
            :src="item.url"
            fit="cover"
            v-loading="loadingImage">
          </el-image>
          <div class="bottom-rgba">12345
          </div>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="per_page"
      :current-page.sync="page"
      @current-change="currentPage">
    </el-pagination>
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
      ref="upload">
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
  name: 'imageIndex',
  props: {},
  components: {},
  data () {
    return {
      collect: false,
      page: 1,
      per_page: 12,
      images: [],
      dialogVisible: false,
      headers: {
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('user')).token}`
      },
      total: 0,
      loadingImage: false
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    // 获取图片素材
    getImages (page) {
      // 启动图片加载
      this.loadingImage = true
      // 重置分页按钮高亮
      this.page = page
      getImage({
        collect: this.collect,
        page,
        per_page: this.per_page
      }).then(res => {
        // console.log(res)
        this.total = res.data.data.total_count
        this.images = res.data.data.results
        this.loadingImage = false
      })
    },
    // 获取收藏图片
    selectImage () {
      this.getImages(1)
    },
    success () {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.$refs.upload.clearFiles()
      this.getImages(this.page)
    },
    // 确定上传
    uploadSure () {
      this.dialogVisible = false
      this.$refs.upload.submit()
    },
    // 实现分页
    currentPage () {
      this.getImages(this.page)
    }
  },
  created () {
    this.getImages(2)
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.uploadImage {
  width: 50%;
}
.imageItem {
  position: relative;
}
.bottom-rgba {
  position: absolute;
  height: 35px;
  bottom: 4px;
  left: 0px;
  right: 0px;
  background-color: rgba(42, 230, 73,.5);
}
</style>
