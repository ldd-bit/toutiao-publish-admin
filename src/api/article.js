import request from '@/utils/axios'
export const articleSearch = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
export const articlechannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
