import { createRouter, createWebHistory } from "vue-router";
import homeView from "../views/HomeView.vue";
import DirectorsView from "../views/directorsView.vue";
import ActorsView from "../views/actorsView.vue";
import movieView from "../views/movieView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: homeView,
      path: "/movies",
    },
    {
      component: movieView,
      path: "/movie/:movieId",
    },
    {
      component: DirectorsView,
      path: "/directors",
    },
    {
      component: ActorsView,
      path: "/actors",
    },
  ],
});
