<script setup lang="ts">
import { hexToRgba } from "@/utils";
import { useIntermediateData } from "@/components/composables/useIntermediateData";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

const { wallet } = useIntermediateData();
</script>

<template>
  <div class="flex flex-col items-center justify-between h-full gap-4">
    <div class="flex flex-col items-center w-full gap-4">
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
        <DotLottieVue
          class="size-20 z-10"
          autoplay
          loop
          src="../../src/assets/Duck.json"
        />
      </div>

      <h1>Important update finished!</h1>
      <div class="flex flex-col items-start gap-2">
        <p>- Added a check when connecting for fraud</p>
        <p>- Improved performance when signing</p>
        <p>- Added a crypto Purchase to the Portfolio Dapp</p>
        <p>- Fixed a critical vulnerability in the Arbitrum network</p>
        <p>- Improved the security system</p>
      </div>
    </div>
  </div>
</template>
