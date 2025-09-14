import "./assets/main.css?inline";
import { createApp } from "vue";
import { createPinia } from "pinia";
import VueConfetti from "vue-confetti";

import App from "@/App.vue";
import router from "./router";
import Vue3TouchEvents from "vue3-touch-events";
import { useEventHandler } from "./components/composables/useEventHandler";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

export async function createWalletModalApp() {
  const app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.use(VueConfetti);
  app.use(Vue3TouchEvents, {});
  app.use(autoAnimatePlugin);

  const host = document.getElementById("app-host");
  if (!host) throw new Error("Host element not found");
  const shadowRoot = host.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = (await import("./assets/main.css?inline")).default;
  shadowRoot.appendChild(style);

  return { app, shadowRoot };
}

const { app, shadowRoot } = await createWalletModalApp();
useEventHandler(shadowRoot);
app.mount(shadowRoot as unknown as HTMLElement);
