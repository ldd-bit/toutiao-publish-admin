// Vue CLI的配置文件
// 这里可以定义VueCLI内部的webpack配置

// 该配置文件必须导出一个对象(node中的模块语法)
module.exports = {
  // 自定义VueCLI中的webpack配置
  configureWebpack: {
    // 告诉webpack使用script标签加载的那个资源
    externals: {
      // 属性名:你加载的那个包名
      // 属性值:script标签暴露的全局变量
      // 'element-ui': 'ELEMENT'
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      echarts: 'echarts'
    }
  }
}
