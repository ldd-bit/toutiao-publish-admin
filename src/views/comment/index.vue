<template>
<div class='comment-container'>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table
      class="comment-list"
      :data="comment"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数">
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <div>
            {{scope.row.comment_status ? '开启' : '关闭'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="scope.row.loading"
            @change="commentStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <!-- //分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</div>
</template>

<script>
import {
  articleSearch,
  editcomment
} from '@/api/article'
export default {
  name: 'commentIndex',
  props: {},
  components: {},
  data () {
    return {
      comment: [],
      currentPage: 1,
      total: 0,
      pageSize: 10
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    // 当每页的数量发生改变时
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.currentPage = 1
      this.getComment()
    },
    // 当页码发生改变时
    handleCurrentChange (page) {
      this.getComment()
    },
    // 获取评论列表
    getComment () {
      articleSearch({
        per_page: this.pageSize,
        page: this.currentPage,
        response_type: 'comment'
      }).then(res => {
        console.log(res)
        this.comment = res.data.data.results
        this.comment = this.comment.map(item => {
          item.loading = false
          return item
        })
        // console.log(this.comment)
        this.total = res.data.data.total_count
      })
    },
    // 更改评论状态
    commentStatus (item) {
      // console.log(item)
      item.loading = true
      editcomment(item.id.toString(), item.comment_status).then(res => {
        // console.log(res)
        item.loading = false
        this.getComment()
      })
    }
  },
  created () {
    this.getComment()
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.comment-list {
  margin-bottom: 20px;
}
</style>
