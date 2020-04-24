import request from '@/utils/axios'
export const articleSearch = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles'
  })
}
