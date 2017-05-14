import Vue from 'vue'
import Router from 'vue-router'

// 用户组件
import Login from '@/components/Login'
import Main from '@/components/main/Main'
import Book from '@/components/main/Book'
import Detail from '@/components/main/Detail'

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
      name: 'Main',
      component: Main,
      children: [
        { path: 'book', component: Book},
        { path: 'detail', component: Detail},
        { path: '', redirect: 'book'}
      ]
    },
    { path: '/login', name: 'Login', component: Login },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {path: 'login', component: AdminLogin},
        {path: 'manage', component: Manage},
        {path: 'auth', component: Auth},
        {path: 'blacklist', component: BlackList},
      ]
    }
  ]
})
