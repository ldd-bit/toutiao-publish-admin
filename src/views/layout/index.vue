<!--  -->
<template>
  <el-container class="index-container">
    <el-aside width="200px">
      <index-aside></index-aside>
    </el-aside>
    <el-container>
      <el-header>
        <index-header></index-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import IndexAside from './components/aside'
import indexHeader from './components/header'
export default {
  name: 'indexLayout',
  props: {},
  components: {
    IndexAside,
    indexHeader
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {
  },
  // 方法集合
  methods: {
  },
  created () {
  },
  mounted () {
  }
}
</script>
<style lang='less' scoped>
.index-container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
