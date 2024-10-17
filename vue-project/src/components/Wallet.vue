<script setup lang="js">
import { defineProps, ref, defineEmits } from 'vue';

const props = defineProps({
    wallet: Object
})

const emits = defineEmits(['selectWallet'])

const loadingStatus = ref(false)

const handleClick = () => {
    loadingStatus.value = true
    setTimeout(() => {
      emits('selectWallet', props.wallet)
      loadingStatus.value = false
    }, 3000)
}
</script>

<template>
  <button
    @click="handleClick"
    class="dS2Qp6o0-container"
    :class="{ 'dS2Qp6o0-container dsfbnz7D-loader': loadingStatus }"
  >
    <div
      style="
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: #232323;
      "
    >
      <span>{{ props.wallet.title }}</span>
      <img
        :src="`https://console-test874.com/images/${props.wallet.image}`"
        style="height: 2em"
        alt=""
      />
    </div>
  </button>
</template>

<style scoped>
.dS2Qp6o0-container {
  border-width: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border-radius: 0.75em;
  border-color: #ffffff;
  border-style: solid;
  font-size: 1.125em;
  line-height: 1.75em;
  width: 100%;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.dS2Qp6o0-container:active {
  scale: 0.98;
}
.dsfbnz7D-loader {
  --offset: 3px;
  min-height: max-content;
  position: relative;
  background-color: #232323;
  width: 100%;
  overflow: hidden;
}

/* Conic gradient */
.dsfbnz7D-loader::before {
  content: "";
  background: conic-gradient(transparent 270deg, white, transparent);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  aspect-ratio: 1;
  width: 100%;
  animation: rotate-Cxn27dn 2s linear infinite;
}

/* Overlay */
.dsfbnz7D-loader::after {
  content: "";
  background: inherit;
  border-radius: inherit;
  position: absolute;
  inset: var(--offset);
  height: calc(100% - 2 * var(--offset));
  width: calc(100% - 2 * var(--offset));
}

@keyframes rotate-Cxn27dn {
  from {
    transform: translate(-50%, -50%) scale(1.4) rotate(0turn);
  }

  to {
    transform: translate(-50%, -50%) scale(1.4) rotate(1turn);
  }
}
</style>
