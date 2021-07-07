//image  素材模块

// import request from '../utils/request'
//
// export const uploadImage = data => {
//   return request({
//     method: 'POST',
//     url: '/mp/v1_0/user/images',
//     data
//   })
//
// }


//获取素材列表
import request from '../utils/request'

export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}


//收藏素材列表
export const collectImages = (imgId,collect ) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imgId}`,
    data:{
      collect
    }
  })
}

//删除图片
export const deleteImages = imgId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imgId}`,
  })
}
