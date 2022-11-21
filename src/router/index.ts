import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/pages/Home.vue'
import RandomPage from '../components/pages/Random.vue'
import AuthorsPage from '../components/pages/Authors.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/random',
      name: 'random',
      component: RandomPage,
    },
    {
      path: '/authors',
      name: 'authors',
      component: AuthorsPage,
    },
  ],
})

export default router
