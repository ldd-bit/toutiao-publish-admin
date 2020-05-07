<template>
<div class='publish-container'>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-form ref="publish" :model="article" :rules="publishRules" label-width="80px">
    <el-form-item label="标题" prop="title">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-tiptap v-model="article.content" :extensions="extensions" height="400px" placeholder="请输入内容">
      </el-tiptap>
    </el-form-item>
    <el-form-item label="封面">
      <el-radio-group v-model="article.cover.type">
        <el-radio :label="1">单图</el-radio>
        <el-radio :label="3">三图</el-radio>
        <el-radio :label="0">无图</el-radio>
        <el-radio :label="-1">自动</el-radio>
      </el-radio-group>
      <div class="uploadImage" >
        <template v-if="article.cover.type > 0">
          <upload-cover
            v-for="(item,i) in article.cover.type"
            :key="i"
            style="margin-right: 10px"
            v-model="article.cover.images[i]"
          >
          </upload-cover>
        </template>
      </div>
    </el-form-item>
    <el-form-item label="频道" prop="channel_id">
      <el-select v-model="article.channel_id" placeholder="请选择">
        <el-option
          v-for="item in channels"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
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
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  ListItem,
  BulletList,
  OrderedList,
  Strike,
  Blockquote,
  CodeBlock,
  Fullscreen
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
import { postImage } from '@/api/image'
import UploadCover from '@/views/publish/component/upload-cover'
export default {
  name: 'publishIndex',
  props: {},
  components: {
    'el-tiptap': ElementTiptap,
    UploadCover
  },
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 1, // 单图
          images: []
        },
        channel_id: null
      },
      channels: [],
      // 配置富文本
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 2 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline(),
        new Italic(),
        new Image({
          uploadRequest (file) {
            const data = new FormData()
            data.append('image', file)
            return postImage(data).then(res => {
              console.log(res)
              return res.data.data.url
            })
          }
        }),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Strike(),
        new Blockquote(),
        new CodeBlock(),
        new Fullscreen()
      ],
      // 验证规则
      publishRules: {
        title: [
          { required: true, message: '请输入标题名称', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容名称', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (value === '<p></p>') {
                callback(new Error('请输入内容名称'))
              } else {
                callback()
              }
            }
          }
        ],
        channel_id: [
          { required: true, message: '请输入频道名称', trigger: 'change' }
        ]
      }
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
      this.$refs.publish.validate(async valid => {
        if (!valid) {
          return false
        }
        // console.log(222)
        const editId = this.$route.query.id
        if (editId) {
          await editIdArticle(this.article, editId, draft)
          this.$message({
            message: draft ? '存入草稿成功' : '修改成功',
            type: 'success'
          })
          this.$router.push('/article')
          return
        }
        console.log(1223)
        await addArticle(this.article, draft)
        this.$message({
          message: draft ? '存入草稿成功' : '发布成功',
          type: 'success'
        })
        this.$router.push('/article')
      })
    }
  },
  async created () {
    this.getChannel()
    const id = this.$route.query.id
    if (id) {
      // 获取指定文章
      const res = await getIdArticle(id)
      this.article = res.data.data
      // console.log(res)
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.uploadImage {
  display: flex;
}
</style>
