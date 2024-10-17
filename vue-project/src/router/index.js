import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  //используем createMemoryHistory для работы без браузерного роутинга
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Main.vue'),
    },
    {
      path: '/connect',
      name: 'connect',
      component: () => import('../views/Connect.vue'),
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('../views/Success.vue'),
    },
  ]
})

export default router
