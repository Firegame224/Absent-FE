import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../pages/SignIn.vue'
import dashboard from '@/layouts/Dashboard.vue'
import Analitycs from '@/pages/Analytics.vue'
import { useSessionStore } from '@/stores/session-store'
import Home from '@/pages/Home.vue'
import Absen from '@/pages/Absen.vue'
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
      { path: "", component: Analitycs },
      { path: "home", component: Home },
      { path: "home/:absenId", component: Absen }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, _from, next) => {
  const { isloggedIn, fetchSession, profile } = useSessionStore()
  // cek sudah login atau belum
  await fetchSession()
  if (to.path === "/" && isloggedIn && profile?.role === "Admin") {
    return next("/dashboard")
  } else if (to.path === "/" && isloggedIn && profile?.role === "User") {
    return next("/dashboard/home")
  } else if (to.meta.requiresAuth && !isloggedIn) {
    return next("/")
  }
  return next();
})

export default router
