<template>
<div class='fans-container'>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container-header">
        <el-link href="https://element.eleme.io" target="_blank" :underline="false" class="fansList">粉丝列表</el-link>
        <el-link href="https://element.eleme.io" target="_blank" :underline="false" class="fansImage">粉丝画像</el-link>
      <div class="container-header-left"></div>
    </div>
    <el-row :gutter="20">
      <el-col :span="3" v-for="(item, i) in fansInfo" :key="i">
        <div class="grid-content bg-purple">
          <el-avatar :size="80" :src="item.photo">
          </el-avatar>
          <span class="userName">{{item.name}}</span>
          <el-button type="primary" plain size="small">+关注</el-button>
        </div>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
import { getFans } from '@/api/fans'
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      fansInfo: []
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    getFansInfo () {
      getFans().then(res => {
        // console.log(res)
        this.fansInfo = res.data.data.results
      })
    }
  },
  created () {
    this.getFansInfo()
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.container-header {
  display: flex;
}
.fansList {
  width: 70px;
  padding: 10px 15px;
  border: 1px solid #e4e7ed;
}
.fansImage {
  width: 70px;
  padding: 10px 15px;
  border: 1px solid #e4e7ed;
  border-left: 0 none;
}
.container-header-left {
  width: 100%;
  border-bottom: 1px solid #e4e7ed;
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
