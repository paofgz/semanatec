import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pokemon from '../views/Pokemon'
import Bitcoin from '../views/Bitcoin'
import Todo from '../views/Todo'
import Covid from '../views/Covid'
import CovidSearch from '../views/CovidSearch'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pokemon/:pokemon',
    name: 'Pokemon',
    component: Pokemon
  },  
  {
    path:'/bitcoin',
    name:'Bitcoin',
    component:Bitcoin
  },
  {
    path:'/todo',
    name:'Todo',
    component:Todo
  },
  {
    path: '/covid',
    name: 'Covid',
    component: Covid
  },
  {
    path: '/covid/search',
    name: 'CovidSearch',
    component: CovidSearch
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router