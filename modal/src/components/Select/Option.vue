<script setup lang="ts">
import { Check } from "lucide-vue-next";

const props = defineProps<{ selected?: boolean }>();
</script>

<template>
  <div
    class="px-4 w-full py-1 transition-colors duration-300 cursor-pointer flex flex-row items-center justify-between gap-2"
    :class="{
      'bg-[rgb(var(--color-surface))]/10 text-[rgb(var(--color-text))]':
        props.selected,
      'hover:bg-[rgb(var(--color-muted))]/5': !props.selected,
    }"
  >
    <slot></slot>
    <Check v-if="props.selected" class="size-4" />
  </div>
</template>
