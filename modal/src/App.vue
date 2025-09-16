<script setup lang="ts">
import { RouterView } from "vue-router";
import { motion } from "motion-v";
</script>

<template>
  <div class="fixed h-screen w-full z-[999999] inset-0">
    <motion.div
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      class="bg-black/50 h-full w-full backdrop-blur-lg"
      @click="$emit('close')"
    ></motion.div>

    <motion.div
      :initial="{ opacity: 0, y: 550 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ delay: 0.3 }"
      class="absolute inset-0 flex items-end sm:items-center justify-center"
    >
      <RouterView class="p-2 rounded-md" v-slot="{ Component }">
        <div class="bg-container-wallet">
          <transition name="modal" mode="out-in">
            <component :is="Component" />
          </transition>
        </div>
      </RouterView>
    </motion.div>
  </div>
</template>
