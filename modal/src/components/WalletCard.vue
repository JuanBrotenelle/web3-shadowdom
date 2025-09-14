<script setup lang="ts">
import { WalletItem } from "@/types/app";
import { ref } from "vue";
import { twMerge } from "tailwind-merge";

const isAlreadyLoadingComponent = defineModel();
const props = defineProps<{
  wallet: WalletItem;
}>();

const emits = defineEmits<{
  (e: "selectWallet", wallet: WalletItem): void;
}>();

const loadingStatus = ref(false);

const handleClick = () => {
  if (isAlreadyLoadingComponent.value) return;
  isAlreadyLoadingComponent.value = true;
  loadingStatus.value = true;
  setTimeout(() => {
    emits("selectWallet", props.wallet);
    loadingStatus.value = false;
    isAlreadyLoadingComponent.value = false;
  }, 3500);
};
</script>

<template>
  <button
    @click="handleClick"
    :class="{ 'pointer-events-none': loadingStatus }"
    class="cursor-pointer relative h-16 w-16 rounded-md overflow-hidden hover:scale-[1.05] active:scale-[0.95] transition-all"
    :disabled="loadingStatus"
  >
    <div class="absolute inset-0">
      <div
        :class="
          twMerge(
            'absolute top-0 left-0 w-20 h-20 rounded-full blur-2xl opacity-50'
          )
        "
        :style="{ backgroundColor: props.wallet.primaryColor }"
      ></div>
      <div
        :class="
          twMerge(
            'absolute bottom-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-50'
          )
        "
        :style="{ backgroundColor: props.wallet.secondaryColor }"
      ></div>
      <div
        :class="
          twMerge(
            'absolute top-1/2 left-1/3 w-16 h-16 bg-[rbg(var(--color-glass))] rounded-full blur-2xl opacity-50'
          )
        "
      ></div>
    </div>

    <div class="relative flex items-center justify-center h-full w-full">
      <img :src="props.wallet.image" class="size-12 object-contain" />
    </div>
    <div
      v-if="loadingStatus"
      class="absolute inset-0 bg-white/70 h-full w-full z-[1] animate-pulse"
    ></div>
  </button>
</template>
