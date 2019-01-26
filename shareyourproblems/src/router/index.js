import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import AddPost from '@/components/AddPost'
import EditPost from '@/components/EditPost'
import PostDetail from '@/components/PostDetail'
import UserPosts from '@/components/UserPosts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/addPost',
      name: 'AddPost',
      component: AddPost
    },
    {
      path: '/editPost',
      name: 'EditPost',
      component: EditPost
    },
    {
      path: '/postDetail/:postId',
      name: 'PostDetail',
      component: PostDetail
    },
    {
      path: '/userPosts/:userId',
      name: 'UserPosts',
      component: UserPosts
    },
  ]
})
