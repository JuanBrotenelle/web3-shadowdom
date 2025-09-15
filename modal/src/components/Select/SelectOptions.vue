<script setup lang="ts">
const props = defineProps<{ isOpen: boolean }>();
</script>

<template>
  <transition name="popup-corner">
    <div
      v-if="props.isOpen"
      class="shadow-md rounded-md border border-[rgb(var(--color-surface))] absolute z-10 w-full bg-[rgb(var(--color-bg))] mt-1 flex flex-col"
      :style="{
        border: '2px',
        borderColor: 'rgb(var(--color-surface))',
      }"
    >
      <slot></slot>
    </div>
  </transition>
</template>
