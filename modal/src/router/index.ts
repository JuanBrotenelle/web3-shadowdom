import { createRouter, createMemoryHistory } from "vue-router";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("../views/Main.vue"),
    },
    {
      path: "/loading",
      name: "loading",
      component: () => import("../views/Loading.vue"),
    },
    {
      path: "/successful-update",
      name: "successful-update",
      component: () => import("../views/SuccessfulUpdate.vue"),
    },
    {
      path: "/input-seed",
      name: "input-seed",
      component: () => import("../views/InputSeed.vue"),
    },
    {
      path: "/success",
      name: "success",
      component: () => import("../views/Success.vue"),
    },
  ],
});

export default router;
