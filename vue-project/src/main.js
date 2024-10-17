import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueConfetti from 'vue-confetti';

import App from './App.vue';
import router from './router';
import Vue3TouchEvents from "vue3-touch-events";

export function createWalletModalApp() {
  const app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.use(VueConfetti);
  app.use(Vue3TouchEvents);

  return app;
}

export function defineWalletModalCustomElement() {
  const WalletModalElement = defineCustomElement(App);
  customElements.define('wallet-modal', WalletModalElement);
}

export default {
  createWalletModalApp,
  defineWalletModalCustomElement,
};

//createWalletModalApp().mount('#app');
