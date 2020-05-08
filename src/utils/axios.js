import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'
import { Message } from 'element-ui'
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
// 设置请求拦截器
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
// 设置响应拦截器
request.interceptors.response.use(function (response) {
  // 所有响应码为2xx的响应都会进入这里
  return response
}, function (error) {
  if (error.response && error.response.status === 401) {
    router.push('/login')
    localStorage.removeItem('user')
    Message('登录状态无效,请重新登陆')
  }
  return Promise.reject(error)
})
export default request
