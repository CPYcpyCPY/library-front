import Vue from 'vue'
import Router from 'vue-router'

// 用户组件
import Login from '@/components/Login'
import Main from '@/components/main/Main'
import Book from '@/components/main/Book'
import Detail from '@/components/main/Detail'
import User from '@/components/main/user/User'
import Info from '@/components/main/user/Info'
import History from '@/components/main/user/History'
import Problem from '@/components/main/user/Problem'

// 管理员组件
import AdminLogin from '@/components/AdminLogin'
import Admin from '@/components/admin/Admin'
import Manage from '@/components/admin/Manage'
import Auth from '@/components/admin/Auth'
import BlackList from '@/components/admin/BlackList'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/main' },
    {
      path: '/main',
      component: Main,
      children: [
        { path: 'book', component: Book},
        { path: 'detail', component: Detail},
        { path: '', redirect: 'book'}
      ]
    },
    {
      path: '/user',
      component: User,
      children: [
        { path: 'info', component: Info },
        { path: 'history', component: History },
        { path: 'problem', component: Problem },
        { path: '', redirect: 'info'}
      ]
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '/adminLogin', component: AdminLogin},
    {
      path: '/admin',
      component: Admin,
      children: [
        {path: 'manage', component: Manage},
        {path: 'auth', component: Auth},
        {path: 'blacklist', component: BlackList},
        {path: '', redirect: 'manage'},
      ]
    }
  ]
})
