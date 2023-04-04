import { createRouter, createWebHashHistory } from 'vue-router/dist/vue-router.esm-bundler'
import { ErrorScreen, SecondScreen, LoginScreen, MonsterFetch } from "@/renderer/screens";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: MonsterFetch,
      meta: {
        titleKey: 'title.monster'
      }
    },
    {
      path: '/second',
      component: SecondScreen,
      meta: {
        titleKey: 'title.second'
      }
    },
    {
      path: '/login',
      component: LoginScreen,
      meta: {
        titleKey: 'title.login'
      }
    },
    {
      path: '/error',
      component: ErrorScreen,
      meta: {
        titleKey: 'title.error'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})
