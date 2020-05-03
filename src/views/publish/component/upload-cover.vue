<template>
<div class='upload-cover-container'>
  <div class="imageSquare" @click="dialogVisible = true">
    <img style="width:150px;height:150px" ref="cover-image">
    <!-- <img v-else src="./pic_bg.png" style="width:150px;height:150px"> -->
  </div>
  <el-dialog
    :visible.sync="dialogVisible"
    width="50%"
    :append-to-body="true">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="素材库" name="first">素材库</el-tab-pane>
      <el-tab-pane label="上传图片" name="second">
        <label for="file">
          <div class="imageSquare1">
            <img ref="preview-image" style="width:180px">
          </div>
        </label>
        <input ref="file" type="file" id="file" hidden @change="showImage">
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="uploadCover">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { postImage } from '@/api/image'
export default {
  name: 'uploadCover',
  props: {},
  components: {},
  data () {
    return {
      dialogVisible: false,
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    showImage (file) {
      // console.log(this.$refs.file.files[0])
      const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      this.$refs['preview-image'].src = blob
      // console.log(this.image)
    },
    // 确认上传图片
    uploadCover () {
      // 判断是否是上传图片模块
      if (this.activeName === 'second') {
      // 判断file是否为空
        if (this.$refs.file.files[0] === '') {
          this.$message({
            showClose: true,
            message: '请选择要上传的图片'
          })
          return
        }
        // 上传素材
        const file = new FormData()
        file.append('image', this.$refs.file.files[0])
        postImage(file).then(res => {
          // console.log(res)
          this.$refs['cover-image'].src = res.data.data.url
        })
        this.dialogVisible = false
      }
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.imageSquare {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
}
.imageSquare1 {
  width: 180px;
  height: 180px;
  margin: 0 auto;
  font-size: 50px;
  font-weight: 50;
  line-height: 180px;
  text-align: center;
  border: 1px dashed #ccc;
}
</style>
