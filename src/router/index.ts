import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../pages/signIn.vue'
import { useSessionStore } from '@/stores/session-store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SignIn,
    },
  ],
})
router.beforeEach((to, from, next) => {
  const session = useSessionStore()

  if (to.meta.requiresAuth && !session.isloggedIn) {
    next("/login")
  } else {
    next()
  }
})

export default router
