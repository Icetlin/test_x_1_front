import { createRouter, createWebHashHistory } from 'vue-router'
import NewsList from "@/components/NewsList.vue";

const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: '/',
    name: 'NewsList',
    component: NewsList
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
