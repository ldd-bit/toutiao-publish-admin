<template>
<div class='publish-container'>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-form ref="form" :model="article" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
     <el-form-item label="内容">
      <el-input type="textarea" v-model="article.content"></el-input>
    </el-form-item>
    <el-form-item label="封面">
      <el-radio-group v-model="article.cover.type">
        <el-radio :label="1">单图</el-radio>
        <el-radio :label="3">三图</el-radio>
        <el-radio :label="0">无图</el-radio>
        <el-radio :label="-1">自动</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="频道">
      <el-select v-model="article.channel_id" placeholder="请选择">
        <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addArticle1(false)">{{$route.query.id ? '确认修改' : '发表'}}</el-button>
      <el-button @click="addArticle1(true)">存入草稿</el-button>
    </el-form-item>
  </el-form>
</el-card>
</div>
</template>

<script>
import { articlechannels, addArticle, getIdArticle, editIdArticle } from '@/api/article'
export default {
  name: 'publishIndex',
  props: {},
  components: {},
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      channels: []
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    // 获取频道
    getChannel () {
      articlechannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
        // console.log(this.article.channels)
      })
    },
    // 发表文章
    addArticle1 (draft) {
      const editId = this.$route.query.id
      if (editId) {
        editIdArticle(this.article, editId, draft).then(() => {
          this.$message({
            message: draft ? '存入草稿成功' : '修改成功',
            type: 'success'
          })
          this.$router.push('/article')
        })
      } else {
        addArticle(this.article, draft).then(() => {
          this.$message({
            message: draft ? '存入草稿成功' : '发布成功',
            type: 'success'
          })
          this.$router.push('/article')
        })
      }
    }
  },
  created () {
    const id = this.$route.query.id
    if (id) {
      // 获取指定文章
      getIdArticle(id).then(res => {
        this.article = res.data.data
        // console.log(res)
      })
    }
    this.getChannel()
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
