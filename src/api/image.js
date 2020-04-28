import request from '@/utils/axios'
// 上传图片材料
export const postImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}
// 获取图片素材
export const getImage = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
// 收藏图片素材
export const collectImage = (id, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${id}`,
    data: {
      collect
    }
  })
}
// 删除图片素材
export const selectImage = (id) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${id}`
  })
}
