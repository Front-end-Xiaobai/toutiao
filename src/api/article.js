//文章请求接口模块
import request from "../utils/request";

//获取文章列表
export const getArticles = params =>{
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

// 获取文章频道
export const getArticleChannels = () =>{
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels',
  })
}

//删除文章
export const deleteArticle = articleId =>{
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/article/${articleId}`,
  })
}

//发表文章
export const addArticle = (data,draft = false) =>{
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params:{
      draft
    },
    data
  })
}

//编辑文章
export const updateArticle = (articleId,data,draft = false) =>{
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params:{
      draft
    },
    data
  })
}

//获取指定文章
export const getArticle = (articleId) =>{
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`,
  })
}


//修改文章状态
export const updateComentStatus = (articleId,allowComment) =>{
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params:{
      article_id:articleId
    },
    data:{
      allow_comment:allowComment
    }
  })
}
