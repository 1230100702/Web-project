import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import UploadView from '../views/UploadView.vue'
import SummaryView from '../views/SummaryView.vue'
import HistoryView from '../views/HistoryView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: '/', component: HomeView },
    { path: '/upload', component: UploadView },
    { path: '/summary', component: SummaryView },
    { path: '/history', component: HistoryView },
    { path: '/login', component: LoginView },
  ],
})

export default router
