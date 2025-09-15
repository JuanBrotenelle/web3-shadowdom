import "./assets/main.css?inline";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "./router";
import { useEventHandler } from "./components/composables/useEventHandler";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { getTailwindSheet } from "./utils/tailwind";

export async function createWalletModalApp() {
  const app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.use(autoAnimatePlugin);

  const host = document.querySelector("wallet-modal");
  if (!host) throw new Error("<wallet-modal> not found");
  const shadowRoot = host.attachShadow({ mode: "open" });
  shadowRoot.adoptedStyleSheets.push(getTailwindSheet());

  useEventHandler(shadowRoot);

  return { app, shadowRoot };
}

class WalletModalElement extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const { app, shadowRoot } = await createWalletModalApp();
    app.mount(shadowRoot as unknown as HTMLElement);
  }
}

document.addEventListener("click", (event) => {
  event.preventDefault();
  const target = event.target as any;

  if (target.matches("button, a")) {
    customElements.define("wallet-modal", WalletModalElement);
  }
});
