<template>
<div>
  <el-card class="box-card">
    <!-- 卡片头部 -->
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 卡片头部 -->
    <!-- 卡片身体 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="状态">
        <el-radio-group v-model="form.resource">
          <el-radio label="全部"></el-radio>
          <el-radio label="草稿"></el-radio>
          <el-radio label="待审核"></el-radio>
          <el-radio label="审核通过"></el-radio>
          <el-radio label="审核失败"></el-radio>
          <el-radio label="已删除"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="开发者资讯" value="kaifa"></el-option>
          <el-option label="ios" value="ios"></el-option>
          <el-option label="c++" value="c"></el-option>
          <el-option label="android" value="android"></el-option>
          <el-option label="css" value="css"></el-option>
          <el-option label="数据库" value="mysql"></el-option>
          <el-option label="区块链" value="qukuai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">筛选</el-button>
      </el-form-item>
    </el-form>
<!-- 卡片身体 -->
  </el-card>
<!-- 展示文章部分 -->
  <el-card class="box-card2">
    <div slot="header" class="clearfix">
      根据筛选条件共查询到 46147 条结果：
    </div>
    <template>
    <el-table
      :data="articles"
      style="width: 100%">
      <el-table-column
        label="封面"
        width="230">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.cover.images[0]"
            :fit="cover"
            lazy>
            <div slot="placeholder" style="text-align: center">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="230">
      </el-table-column>
      <el-table-column
        label="状态"
        width="230"
        >
        <template slot-scope="scope">
          <el-tag :type="state[scope.row.status].type">{{state[scope.row.status].text}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间"
        width="230">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>
  </template>
  </el-card>
<!-- 展示文章部分 -->
</div>
</template>

<script>
import { articleSearch } from '@/api/article'
export default {
  name: 'articleMent',
  props: {},
  components: {},
  data () {
    return {
      form: {
        resource: '',
        region: ''
      },
      value1: '',
      articles: [],
      state: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ]
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    getArticle () {
      articleSearch({
        page: 2
      }).then(res => {
        console.log(res)
        this.articles = res.data.data.results
        console.log(this.articles)
      })
    }
  },
  created () {
    this.getArticle()
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.box-card {
  margin-bottom: 20px;
}
.box-card2 {
  margin-bottom: 20px;
}
</style>
