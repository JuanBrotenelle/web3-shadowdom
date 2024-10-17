<script setup>
//главный компонент, ничего не надо трогать
import { RouterView } from "vue-router";
</script>

<template>
  <div class="jw2olOdp-container">
    <div class="dncCc2nmf-container">
      <RouterView v-slot="{ Component }" style="z-index: 9992">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>
    <div class="jw2oMNs9-container"></div>
  </div>
</template>

<style scoped>
@media (max-width: 1024px) {
  .dncCc2nmf-container {
    margin-right: 0px;
  }
  .jw2olOdp-container {
    align-items: center;
    justify-content: center;
  }
}
@media (min-width: 1024px) {
  .dncCc2nmf-container {
    margin-right: 150px;
  }
  .jw2olOdp-container {
    align-items: start;
    justify-content: end;
  }
}
.jw2olOdp-container {
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: row;
  left: 0;
  top: 0;
  z-index: 9990;
}

.jw2oMNs9-container {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.205);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9991;
  pointer-events: none;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-in-out;
  position: absolute;
  width: 100%;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave {
  transform: translateX(0);
}

.swipe-left .slide-enter,
.swipe-left .slide-leave-to {
  transform: translateX(-100%);
}
</style>
