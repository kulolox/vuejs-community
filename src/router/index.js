import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/page/Home/Home'
import Publish from '@/page/Publish/Publish'
import Message from '@/page/Message/Message'
import Mine from '@/page/Mine/Mine'
import User from '@/page/User/User'
import Content from '@/page/Content/Content'
import Person from '@/page/Person/Person'
Vue.use(Router)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/publish',
    name: 'publish',
    component: Publish
  },
  {
    path: '/message',
    name: 'message',
    component: Message
  },
  {
    path: '/mine',
    name: 'mine',
    component: Mine
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/content',
    name: 'content',
    component: Content
  },
  {
    path: '/person',
    name: 'person',
    component: Person
  },
]

export default new Router({
  routes
})
