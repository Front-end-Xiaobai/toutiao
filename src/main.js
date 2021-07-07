import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import JSONbid from 'json-bigint'         这个是处理数据过长，JSON.parse不能转成一样的，可以使用该  JSONbig.parse(str).id.toString()来获取
// import './styles/index.less'
// import { ElementTiptapPlugin } from 'element-tiptap';
// import 'element-tiptap/lib/index.css';

// Vue.use(ElementTiptapPlugin, { /* 插件配置项 */ lang: 'zh' })
Vue.use(Element)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
