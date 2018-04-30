import Vue from 'vue'
import Router from 'vue-router'
import goodsList from '@/components/goodsList'
import login from '@/components/login'
import regist from '@/components/regist'
import detail from '@/components/detail'
import manage from '@/components/manage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/regist',
      name: 'regist',
      component: regist
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: goodsList
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage
    },
    {
      path: '/*',
      name: 'login',
      component: login
    }
  ]
})
