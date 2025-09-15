import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import MotionResolver from "motion-v/resolver";
import { defineConfig as defineVitestConfig } from "vitest/config";

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
      cssCodeSplit: true,
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
          external: ["vue"],
          output: {
            globals: {
              vue: "Vue",
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

export const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
