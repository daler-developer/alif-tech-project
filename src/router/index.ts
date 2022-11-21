import { createRouter, createWebHistory } from 'vue-router'
import AuthorsPage from '../components/pages/AuthorsPage.vue'
import HomePage from '../components/pages/HomePage.vue'
import RandomPage from '../components/pages/RandomPage.vue'

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
