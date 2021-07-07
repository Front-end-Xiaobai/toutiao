//用户请求模块

//用户登录
import request from "../utils/request";

export const login = data =>{
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}
//获取用户信息
//该端口出错，不适用该端口，改从登录时拿数据
export const getUserProfile = () =>{
  // const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile '
    // //后端需要将你的身份传过去
    // headers: {
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}

//修改用户头像
//注意data必须传递Formdata对象
export const  updateUserPhoto =data=> {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}


//修改用户基本信息
export const  updateUserProfile =data=> {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}

