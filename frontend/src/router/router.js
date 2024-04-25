import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import movieView from '../views/movieView.vue';
import DirectorsView from '../views/directorsView.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/movies",
      component: movieView,
    },
    {
      path: '/directors',
      component: DirectorsView,
    },
  ],
});

export default router;
