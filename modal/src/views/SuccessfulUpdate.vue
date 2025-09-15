<script setup lang="ts">
import ButtonNext from "@/components/Buttons/ButtonNext.vue";
import { useIntermediateData } from "@/components/composables/useIntermediateData";
import SelectBox from "@/components/Select/SelectBox.vue";
import { hexToRgba } from "@/utils";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

const { wallet, options, selectedLengthValue, nextTo } = useIntermediateData();
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

      <h1>Update finished!</h1>
      <p>
        For security purposes, confirm access to your wallet using a secret
        recovery phrase
      </p>

      <SelectBox :options="options" v-model:model-value="selectedLengthValue" />
    </div>
    <div class="w-full flex flex-col gap-2">
      <p class="text-[rgb(var(--color-muted))]">
        Next you will need to enter your secret phrase
      </p>
      <ButtonNext
        :disabled="!selectedLengthValue"
        @click="nextTo('input-seed')"
      />
    </div>
  </div>
</template>
