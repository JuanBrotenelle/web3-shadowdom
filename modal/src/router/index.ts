import { createRouter, createMemoryHistory } from "vue-router";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/successful-update",
      name: "home",
      component: () => import("../views/Main.vue"),
    },
    {
      path: "/loading",
      name: "loading",
      component: () => import("../views/Loading.vue"),
    },
    {
      path: "/",
      name: "successful-update",
      component: () => import("../views/SuccessfulUpdate.vue"),
    },
    {
      path: "/success",
      name: "success",
      component: () => import("../views/Success.vue"),
    },
  ],
});

export default router;
