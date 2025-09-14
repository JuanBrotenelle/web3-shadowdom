<script setup lang="ts">
import WalletCard from "@/components/WalletCard.vue";
import { useSetupWallets } from "@/components/composables/useSetupWallets";
import Input from "@/components/Input/Input.vue";
import { Search, X } from "lucide-vue-next";
import { ref } from "vue";

const { visibleWallets, selectWallet, searchInput } = useSetupWallets();
const isLoadingWallet = ref(false);
</script>

<template>
  <div class="flex flex-col items-start justify-between h-full w-full">
    <div class="flex flex-col items-start gap-2 w-full h-full">
      <div class="flex flex-col items-start gap-2 w-full">
        <div class="flex flex-row items-center justify-between w-full">
          <h1 class="">Connect wallet</h1>
          <button class="cursor-pointer">
            <X class="size-4 text-[rgb(var(--color-muted))]" />
          </button>
        </div>
        <div class="relative w-full">
          <div
            class="absolute inset-y-0 right-3 flex items-center justify-center"
          >
            <Search class="size-4 text-[rgb(var(--color-muted))]" />
          </div>
          <Input
            class="pr-8"
            v-model:modelValue="searchInput"
            type="text"
            placeholder="Choose your preferred wallet to continue"
          />
        </div>
      </div>

      <div
        v-auto-animate
        class="grid grid-cols-4 gap-2 auto-rows-max scrollbar-hidden place-items-center bg-[rgb(var(--color-surface))] rounded-md p-2 grow w-full h-full overflow-auto"
      >
        <WalletCard
          v-model="isLoadingWallet"
          v-for="wallet in visibleWallets"
          :key="wallet.name"
          :wallet="wallet"
          @selectWallet="selectWallet"
        />
      </div>
    </div>
    <div class="mt-2">
      <p class="text-sm">
        Need help with connecting a wallet?
        <a href="#" class="text-[rgb(var(--color-accent))] hover:underline"
          >Read our FAQ</a
        >
      </p>
      <p class="text-[rgb(var(--color-muted))] text-xs">
        Wallets are provided by External Provider and by selecting you agreed to
        Terms of those Providers. Your access to the wallet might be reliant on
        the External Provider being operational.
      </p>
    </div>
  </div>
</template>

<style></style>
