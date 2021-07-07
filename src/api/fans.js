import request from "../utils/request";

//请求粉丝信息
export const getFansMessage = params =>{
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers',
    params
  })
}
