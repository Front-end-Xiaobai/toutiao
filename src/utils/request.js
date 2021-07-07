import axios from 'axios'
import JSONbig from 'json-bigint'
// import ca from "element-ui/src/locale/lang/ca";

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  //对后端原始返回数据的处理
  //data就是后端返回的原始数据，未经JSON.parse转会的数据（默认是通过该方式转化的）
  transformResponse:[function (data) {
    try {
      return JSONbig.parse(data)
    }catch (e) {
      return data
    }
  }]
})

//请求拦截    将headers 中放入token在发送请求
request.interceptors.request.use(function (config) {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user){
    config.headers.Authorization = `Bearer ${user.token }`
  }

  return config
},function (error) {
  return Promise.reject(error)
})

export default request
