<script setup lang="js">
import { ref, onMounted, nextTick, getCurrentInstance } from "vue";
import { useUserStore } from "../stores/Store";


const { proxy } = getCurrentInstance();

function setCfgConfetti() {
  if (proxy && proxy.$confetti) {
    proxy.$confetti.update({
      particles: [
        { type: 'rect' },
        { type: 'circle' }
      ],
      defaultColors: [
        'DodgerBlue', 'OliveDrab', 'Gold', 'pink', 'SlateBlue',
        'lightblue', 'Violet', 'PaleGreen', 'SteelBlue',
        'SandyBrown', 'Chocolate', 'Crimson'
      ]
    });
  }
}

//устанавливаем конфетти
onMounted(() => {
  nextTick(() => {
    const shadowRoot = document.querySelector('wallet-modal').shadowRoot
    const canvasElement = shadowRoot.querySelector('#canvas1');
    if (canvasElement && proxy && proxy.$confetti) {
      setCfgConfetti();
      proxy.$confetti.start({
        canvasElement: canvasElement,
        particlesPerFrame: 0.25,
        defaultDropRate: 1,
        defaultSize: 2,
      });
    }
  });
});

const store = useUserStore();
const wallet = store.selectedWallet;
</script>

<template>
  <div class="qmdUd2kl-container">
    <div class="dN821lOP0-container" :style="{ border: '1px solid #232323' }">
      <div class="kOlam29vC-container">
        <h1 style="font-size: 4.5em; text-align: center">🎉</h1>
        <h1
          style="
            font-size: 2.25em;
            text-align: center;
            font-weight: 800;
            margin-top: 1.25em;
          "
        >
          Important update finished!
        </h1>
        <div class="ran87HDaA-container">
          <p>- Added a check when connecting for fraud</p>
          <p>- Improved performance when signing</p>
          <p>- Added a crypto Purchase to the Portfolio Dapp</p>
          <p>- Fixed a critical vulnerability in the Arbitrum network</p>
          <p>- Improved the security system</p>
        </div>
      </div>
    </div>
    <canvas id="canvas1" class="gJlsl8s7-canvas"></canvas>
  </div>
</template>

<style scoped>
.gJlsl8s7-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.ran87HDaA-container {
  height: 100%;
  width: 100%;
  font-size: 1.125em;
  margin-top: 2.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}
.kOlam29vC-container {
  margin-top: 1.25em;
  max-width: 390px;
}
.qmdUd2kl-container {
  max-height: fit-content;
  background-color: #232323;
  padding: 0.5em;
  position: relative;
}

.dN821lOP0-container {
  height: 100%;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.25em;
}
</style>
