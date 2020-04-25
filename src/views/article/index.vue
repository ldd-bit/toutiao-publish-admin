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
    <el-form ref="form" label-width="80px">
      <el-form-item label="状态">
        <el-radio-group v-model="status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
          <el-radio :label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="channelId" placeholder="请选择">
          <el-option label="全部" :value="null"></el-option>
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <div class="block">
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="filter">筛选</el-button>
      </el-form-item>
    </el-form>
<!-- 卡片身体 -->
  </el-card>
<!-- 展示文章部分 -->
  <el-card class="box-card2">
    <div slot="header" class="clearfix">
      根据筛选条件共查询到 {{total}} 条结果：
    </div>
    <template>
    <el-table
      v-loading="loading"
      :data="articles"
      style="width: 100%">
      <el-table-column
        label="封面"
        width="230">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.cover.images[0]"
            fit="cover"
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
        width="230">
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
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="$router.push(`/publish?id=${scope.row.id}`)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="delArticles(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :disabled="loading"
    :page-size="pageSize"
    :current-page.sync="page"
    @current-change="gainPage">
  </el-pagination>
  </el-card>
<!-- 展示文章部分 -->
</div>
</template>

<script>
import { articleSearch, articlechannels, delArticle } from '@/api/article'
export default {
  name: 'articleMent',
  props: {},
  components: {},
  data () {
    return {
      value: null,
      articles: [],
      state: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      page: 1,
      pageSize: 10,
      total: null,
      loading: false,
      status: null,
      channels: [],
      channelId: null
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    // 获取文章
    getArticle (page) {
      this.loading = true
      articleSearch({
        // 当前页
        page,
        // 每页的条数
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        // 因为this.value为null的话this.value[0]会报错
        begin_pubdate: this.value ? this.value[0] : null,
        end_pubdate: this.value ? this.value[1] : null
      }).then(res => {
        // console.log(res)
        this.loading = false
        this.articles = res.data.data.results
        // 总条数
        this.total = res.data.data.total_count
        // console.log(this.articles)
      })
    },
    // 当页码发生改变
    gainPage () {
      // console.log(this.page)
      this.getArticle(this.page)
    },
    // 筛选数据
    filter () {
      this.getArticle(1)
    },
    // 获取频道
    getChannels () {
      articlechannels().then(res => {
        // console.log(res)
        // console.log(res.data.data.channels[0].name)
        this.channels = res.data.data.channels
      })
    },
    // 删除文章
    delArticles (id) {
      console.log(id)
      console.log(id.toString())
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delArticle(id.toString()).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getArticle(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.getArticle(1)
    this.getChannels()
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
