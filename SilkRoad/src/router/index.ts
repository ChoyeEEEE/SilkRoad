import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HistoryView from '../views/HistoryView.vue'
import RoutesView from '../views/RoutesView.vue'
import CitiesView from '../views/CitiesView.vue'
import CultureView from '../views/CultureView.vue'
import TradeView from '../views/TradeView.vue'
import HeritageView from '../views/HeritageView.vue'
import SceneryView from '../views/SceneryView.vue'
import ModernView from '../views/ModernView.vue'
import InteractiveView from '../views/InteractiveView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView
    },
    {
      path: '/routes',
      name: 'routes',
      component: RoutesView
    },
    {
      path: '/cities',
      name: 'cities',
      component: CitiesView
    },
    {
      path: '/culture',
      name: 'culture',
      component: CultureView
    },
    {
      path: '/trade',
      name: 'trade',
      component: TradeView
    },
    {
      path: '/heritage',
      name: 'heritage',
      component: HeritageView
    },
    {
      path: '/scenery',
      name: 'scenery',
      component: SceneryView
    },
    {
      path: '/modern',
      name: 'modern',
      component: ModernView
    },
    {
      path: '/interactive',
      name: 'interactive',
      component: InteractiveView
    }
  ],
})

export default router