import Vue from 'vue'
import VueRouter from 'vue-router'

const originalReplace = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const Login = () => import('../views/login/index')
const Home = () => import('../views/home/index')
const Layout = () =>import('../views/layout/index')
const Article = () =>import('../views/article/index')
const Publish = () =>import('../views/publish/index')
const Image = () =>import('../views/image/index')
const Comment = () =>import('../views/comment/index')
const Setting = () =>import('../views/setting/index')
const Fans = () =>import('../views/fans/index')




const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'login',
      component:Login
    },
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/article',
          name: 'article',
          component: Article
        },
        {
          path: '/publish',
          name: 'publish',
          component: Publish
        },
        {
          path: '/image',
          name: 'image',
          component: Image
        },
        {
          path: '/comment',
          name: 'comment',
          component: Comment
        },
        {
          path: '/setting',
          name: 'setting',
          component: Setting
        },
        {
          path: '/fans',
          name: 'fans',
          component: Fans
        }
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path !== '/'){
    //不是去登陆界面不放行
    if (user){
      next()
    }else {
      next('/')
    }
  }else {
    next()
  }
})

export default router

