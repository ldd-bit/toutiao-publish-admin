import request from '@/utils/axios'
export const getFans = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers',
    params
  })
}
