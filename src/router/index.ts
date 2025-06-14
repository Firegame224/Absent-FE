import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../pages/signIn.vue'
import dashboard from '@/pages/Dashboard.vue'
import Analitycs from '@/pages/Analitycs.vue'
import { useSessionStore } from '@/stores/session-store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: SignIn,
  },
  {
    path: "/dashboard",
    meta: { requiresAuth: true },
    name: "dashboard",
    component: dashboard,
    children: [
      { path: "", component: Analitycs }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, _from, next) => {
  const { isloggedIn, fetchSession } = useSessionStore()
  // cek sudah login atau belum
  await fetchSession()
  if (to.path === "/" && isloggedIn) {
    next("/dashboard")
  } else if (to.meta.requiresAuth && !isloggedIn) {
    next("/")
  }
  next();
})

export default router
