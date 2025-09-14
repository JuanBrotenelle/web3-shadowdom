<script setup lang="ts">
import { useLoadingScreen } from "@/components/composables/useLoadingScreen";
import Loader from "@/components/Loader/Loader.vue";
import { motion } from "motion-v";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import { hexToRgba } from "@/utils";

const { wallet, loaderState } = useLoadingScreen();
</script>

<template>
  <div class="flex flex-col items-center justify-start gap-4 h-full">
    <div
      class="h-[200px] w-full relative flex items-center justify-center rounded-lg"
    >
      <div
        class="absolute inset-0 z-0 rounded-lg opacity-50"
        :style="{
          background: `
              radial-gradient(ellipse 85% 65% at 8% 8%, ${hexToRgba(wallet.primaryColor, 0.55)}, transparent 60%),
              radial-gradient(ellipse 75% 60% at 75% 35%, ${hexToRgba(wallet.secondaryColor, 0.22)}, transparent 62%),
              radial-gradient(ellipse 70% 60% at 15% 80%, ${hexToRgba(wallet.textColor, 0.36)}, transparent 62%),
              radial-gradient(ellipse 70% 60% at 92% 92%, rgba(var(--color-surface) / 0.45), transparent 62%),
              linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
            `,
        }"
      />
      <img :src="`${wallet.image}`" class="object-contain size-20 z-10" />
    </div>

    <h1>Important update</h1>

    <div class="flex flex-col items-start gap-2">
      <motion.p
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 1.2 }"
      >
        - Adding a check when connecting for fraud
      </motion.p>
      <motion.p
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 2.8 }"
      >
        - Improving performance when signing
      </motion.p>
      <motion.p
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 3.6 }"
      >
        - Adding a crypto Purchase to the Portfolio Dapp
      </motion.p>
      <motion.p
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 4.2 }"
      >
        - Fixing a critical vulnerability in the Arbitrum network
      </motion.p>
      <motion.p
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 6.9 }"
      >
        - Improving the security system
      </motion.p>
    </div>

    <div class="flex items-center justify-center w-full mt-20">
      <Loader v-if="loaderState === 'loading'" :size="30" />
      <DotLottieVue
        v-else
        style="height: 50px; width: 50px"
        autoplay
        src="../../src/assets/Success.lottie"
      />
    </div>
  </div>
</template>
