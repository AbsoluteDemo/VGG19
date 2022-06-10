import Vue from 'vue'
import VueRouter from 'vue-router'
import Image from '../views/Image'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Image',
    component: Image
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
