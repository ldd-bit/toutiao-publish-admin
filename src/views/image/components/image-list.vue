<template>
<div class='imageList-container'>
  <div style="margin-bottom: 20px">
    <el-radio-group v-model="collect" size="small" @change="selectImage">
      <el-radio-button :label="false">全部</el-radio-button>
      <el-radio-button :label="true">收藏</el-radio-button>
    </el-radio-group>
    <el-button
      style="float: right"
      type="success"
      size="small"
      @click="dialogVisible = true"
    >添加素材</el-button>
  </div>
  <el-row :gutter="15" style="margin-bottom: 20px">
    <el-col :xs="12" :sm="8" :md="6" :lg="4" v-for="item in images" :key="item.id">
      <div class="grid-content bg-purple imageItem">
        <el-image
          style="width: 100%; height: 160px"
          :src="item.url"
          fit="cover"
          v-loading="loadingImage"
        ></el-image>
        <div class="bottom-rgba">
          <el-link
            ref="start"
            type="info"
            :disabled="item.loading"
            @click="start(item)"
            :underline="false"
            :icon="item.is_collected?'el-icon-star-on':'el-icon-star-off'"
            :class="!item.is_collected?'el-link el-link--info':'start1 el-link el-link--info'"
          ></el-link>
          <el-link
            type="info"
            @click="delect(item)"
            :underline="false"
            icon="el-icon-delete"
            class="start"
          ></el-link>
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
    @current-change="currentPage"
  ></el-pagination>
  <el-dialog title="上传文件" :visible.sync="dialogVisible" width="30%" :append-to-body="true">
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
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <!-- <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>-->
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="uploadSure">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { getImage, collectImage, selectImage } from '@/api/image'
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
        Authorization: `Bearer ${
          JSON.parse(window.localStorage.getItem('user')).token
        }`
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
    async getImages (page) {
      // 启动图片加载
      this.loadingImage = true
      // 重置分页按钮高亮
      this.page = page
      const res = await getImage({
        collect: this.collect,
        page,
        per_page: this.per_page
      })
      // console.log(res)
      this.total = res.data.data.total_count
      this.images = res.data.data.results
      this.images = this.images.map(item => {
        item.loading = false
        return item
      })
      this.loadingImage = false
      // console.log(this.images)
    },
    // 获取收藏图片
    selectImage () {
      this.getImages(1)
    },
    // 上传成功
    success () {
      this.dialogVisible = false
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.$refs.upload.clearFiles()
      this.getImages(this.page)
    },
    // 确定上传
    uploadSure () {
      this.$refs.upload.submit()
    },
    // 实现分页
    currentPage () {
      this.getImages(this.page)
    },
    // 收藏素材
    async start (data) {
      data.loading = true
      // console.log(data.loading)
      // this.images = this.images.map(item => {
      //   if (data.id === item.id) {
      //     item.is_collected = !data.is_collected
      //     return item
      //   } else {
      //     return item
      //   }
      // })
      data.is_collected = !data.is_collected
      // console.log(this.images)
      await collectImage(data.id, data.is_collected)
      data.loading = false
    },
    // 删除素材
    delect (data) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await selectImage(data.id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getImages(this.page)
        })
        .catch(() => {
          return false
        })
    }
  },
  created () {
    this.getImages(1)
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
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgba(19, 41, 23, 0.5);
}

.el-link.el-link--info {
  color: white;
  font-size: 20px;
}
.start1.el-link.el-link--info {
  color: orange;
  font-size: 20px;
}
.button {
  background-color: transparent;
}
</style>
