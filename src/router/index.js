import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/Main'
import Book from '@/components/main/Book'
import Detail from '@/components/main/Detail'
import Admin from '@/components/admin/Admin'
import Manage from '@/components/admin/Manage'
import Auth from '@/components/admin/Auth'
import BlackList from '@/components/admin/BlackList'
import Login from '@/components/Login'

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
        {path: 'manage', component: Manage},
        {path: 'auth', component: Auth},
        {path: 'blacklist', component: BlackList},
        {path: '', redirect: 'manage'}
      ]
    }
  ]
})
