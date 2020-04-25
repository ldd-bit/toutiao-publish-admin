import request from '@/utils/axios'
// 获取文章
export const articleSearch = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
// 获取频道
export const articlechannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
// 删除文章
export const delArticle = id => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${id}`
  })
}
// 添加文章
export const addArticle = (data, draft) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}
// 获取指定文章
export const getIdArticle = (id) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${id}`
  })
}
// 编辑指定文章
export const editIdArticle = (data, id, draft) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${id}`,
    params: {
      draft
    },
    data
  })
}
