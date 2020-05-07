<template>
<div class='fans-container'>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <template>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="粉丝列表" name="粉丝列表">
          <el-row :gutter="20" v-loading="isLoading">
            <el-col :span="3" v-for="(item, i) in fansInfo" :key="i">
              <div class="grid-content bg-purple">
                <el-avatar :size="80" :src="item.photo">
                </el-avatar>
                <span class="userName">{{item.name}}</span>
                <el-button type="primary" plain size="small">+关注</el-button>
              </div>
            </el-col>
          </el-row>
          <el-pagination
            background
            layout="prev, pager, next"
            :page="page"
            :page-size="pageSize"
            :current-page.sync="page"
            @current-change="getFansInfo(page)"
            :total="total"
            :disabled="sure">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="粉丝画像">
          <div style="width: 700px;height: 500px" ref="main"></div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </el-card>
</div>
</template>

<script>
import { getFans } from '@/api/fans'
import echarts from 'echarts'
export default {
  name: 'fansIndex',
  props: {},
  components: {},
  data () {
    return {
      fansInfo: [],
      page: 1, // 页数
      pageSize: 24, // 每页数量
      total: 0, // 数据总数
      isLoading: false,
      sure: false,
      activeName: '粉丝列表'
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    async getFansInfo (page) {
      this.isLoading = true
      this.sure = true
      const res = await getFans({
        page: page,
        per_page: this.pageSize
      })
      // console.log(res)
      this.isLoading = false
      this.sure = false
      this.fansInfo = res.data.data.results
      this.total = res.data.data.total_count
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  created () {
    this.getFansInfo(1)
  },
  mounted () {
    const myChart = echarts.init(this.$refs.main)
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }]
    }
    myChart.setOption(option)
  }
}
</script>
<style lang='less' scoped>
.container-header {
  display: flex;
}
.grid-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: palegreen;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 15px;
}
.userName {
  font-size: 12px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 18px;
}
</style>
