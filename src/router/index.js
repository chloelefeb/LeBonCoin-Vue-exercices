import { createRouter, createWebHistory } from 'vue-router'

import { inject } from 'vue'

import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import PaymentView from '../views/PaymentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: (route) => {
        return {
          page: parseInt(route.query.page) || 1,
          title: route.query.title || '',
          sort: route.query.sort || '',
          pricemin: Number(route.query.pricemin) || '',
          pricemax: Number(route.query.pricemax) || '',
        }
      },
    },
    {
      path: '/offer/:id',
      name: 'offer',
      props: true,
      component: () => import('../views/OfferView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('../views/PublishView.vue'),
      meta: { requireAuth: true },
    },
    {
      path: '/payment/:id',
      name: 'payment',
      props: true,
      meta: { requireAuth: true },
      component: PaymentView,
    },
  ],
})

router.beforeEach((to, from) => {
  const GlobalStore = inject('GlobalStore')

  if (to.meta.requireAuth && !GlobalStore.userInfos.value?.token) {
    return { name: 'login', query: { redirect: to.path } }
  }
})

export default router
