<template>
<div class='fans-container'>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </el-card>
</div>
</template>

<script>

export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
