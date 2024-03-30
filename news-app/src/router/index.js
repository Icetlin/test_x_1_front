import { createRouter, createWebHashHistory } from 'vue-router'
import NewsList from "@/components/NewsList.vue";

const routes = [
  {
    path: '/about',
    name: 'about',
    component: function () {
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
