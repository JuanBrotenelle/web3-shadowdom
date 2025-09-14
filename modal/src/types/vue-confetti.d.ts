declare module "vue-confetti" {
  import { App } from "vue";

  interface VueConfettiOptions {}

  const VueConfetti: {
    install(app: App, options?: VueConfettiOptions): void;
  };

  export default VueConfetti;
}
