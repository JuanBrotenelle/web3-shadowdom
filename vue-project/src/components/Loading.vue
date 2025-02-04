<script lang="js" setup>

import { onMounted, ref, reactive } from "vue";
import { useUserStore } from "../stores/Store";

const store = useUserStore();

const wallet = reactive(store.selectedWallet);
</script>

<template>
  <img
    :src="`http://localhost:3000/images/${wallet.image}`"
    style="width: 10vh"
    alt=""
  />
  <div style="margin-top: 1.25em; min-width: 200px">
    <h1
      style="
        font-size: 2.25em;
        line-height: 2.5em;
        font-weight: 800;
        text-align: center;
      "
    >
      Important update
    </h1>
    <div
      style="
        display: flex;
        margin-top: 0.5em;
        width: 100%;
        align-items: center;
        justify-content: center;
      "
    >
      <div class="m2kaLGfs7-loader"></div>
    </div>
    <div class="oP1VWs5T-container">
      <p class="gU7fbL1-c1">- Adding a check when connecting for fraud</p>
      <p class="gU7fbL1-c2">- Improving performance when signing</p>
      <p class="gU7fbL1-c3">- Adding a crypto Purchase to the Portfolio Dapp</p>
      <p class="gU7fbL1-c4">
        - Fixing a critical vulnerability in the Arbitrum network
      </p>
      <p class="gU7fbL1-c4">- Improving the security system</p>
    </div>
  </div>
</template>

<style scoped>
.oP1VWs5T-container {
  height: 100%;
  width: 100%;
  font-size: 1.125em;
  line-height: 1.75em;
  margin-top: 2.5em;
  display: flex;
  flex-direction: column;
  padding-left: 1.25em;
  padding-right: 1.25em;
  align-items: start;
  justify-content: start;
}
.gU7fbL1-c1 {
  animation: gU7fbL1-FadeIn 2s ease 0s 1 normal forwards;
}
.gU7fbL1-c2 {
  animation: gU7fbL1-FadeIn 3s ease 0s 1 normal forwards;
}
.gU7fbL1-c3 {
  animation: gU7fbL1-FadeIn 5s ease 0s 1 normal forwards;
}
.gU7fbL1-c4 {
  animation: gU7fbL1-FadeIn 7s ease 0s 1 normal forwards;
}

@keyframes gU7fbL1-FadeIn {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.m2kaLGfs7-loader {
  height: 20px;
  aspect-ratio: 1.5;
  --c: no-repeat linear-gradient(#fff 0 0);
  background: var(--c), var(--c), var(--c), var(--c);
  background-size: 33.4% 50%;
  animation: m2kaLGfs-l3 2s infinite linear;
}
@keyframes m2kaLGfs-l3 {
  0% {
    background-position: 0 0, 50% 0, 0 100%, 50% 100%;
  }
  12.5% {
    background-position: 0 0, 100% 0, 0 100%, 50% 100%;
  }
  25% {
    background-position: 50% 0, 100% 0, 0 100%, 50% 100%;
  }
  37.5% {
    background-position: 50% 0, 100% 0, 0 100%, 100% 100%;
  }
  50% {
    background-position: 50% 0, 100% 0, 50% 100%, 100% 100%;
  }
  62.5% {
    background-position: 0 0, 100% 0, 50% 100%, 100% 100%;
  }
  75% {
    background-position: 0 0, 50% 0, 50% 100%, 100% 100%;
  }
  87.5% {
    background-position: 0 0, 50% 0, 0 100%, 100% 100%;
  }
  100% {
    background-position: 0 0, 50% 0, 0 100%, 50% 100%;
  }
}
</style>
