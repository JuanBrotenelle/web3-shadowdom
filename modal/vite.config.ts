import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import MotionResolver from "motion-v/resolver";

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      plugins: [
        vue(),
        tailwindcss(),
        Components({
          dts: true,
          resolvers: [MotionResolver()],
        }),
      ],
      define: {
        "process.env": {},
      },
      resolve: {
        alias: {
          "@": "/src",
        },
      },
    };
  } else {
    return {
      plugins: [
        vue(),
        tailwindcss(),
        dts({
          insertTypesEntry: true,
          include: ["src/**/*"],
          exclude: ["src/**/*.test.*", "src/**/*.spec.*"],
        }),
        Components({
          dts: true,
          resolvers: [MotionResolver()],
        }),
      ],
      define: {
        "process.env": {},
      },
      build: {
        lib: {
          entry: resolve(__dirname, "src/main.ts"),
          name: "WalletModal",
          fileName: (format) => `wallet-modal.${format}.js`,
          formats: ["es", "umd"],
        },
        rollupOptions: {
          external: [
            "vue",
            "pinia",
            "vue-router",
            "vue-confetti",
            "vue3-touch-events",
          ],
          output: {
            globals: {
              vue: "Vue",
              pinia: "Pinia",
              "vue-router": "VueRouter",
              "vue-confetti": "VueConfetti",
              "vue3-touch-events": "Vue3TouchEvents",
            },
          },
        },
      },
      resolve: {
        alias: {
          "@": "/src",
        },
      },
    };
  }
});
