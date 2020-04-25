import axios from 'axios'
import JSONbig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    try {
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }]
})
// 设置拦截器
request.interceptors.request.use(
  (config) => {
    // console.log(config)
    // 获取本地存储的信息
    const message = JSON.parse(localStorage.getItem('user'))
    // 找到token
    // 如果有message,就从中取token 来配置token
    if (message) {
      // const token = message.token ? message.token : ''
      config.headers.Authorization = 'Bearer ' + message.token
    }
    return config
  }
)
export default request
