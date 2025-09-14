<script setup lang="ts">
import { twMerge } from "tailwind-merge";

interface Props {
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 20,
});
</script>

<template>
  <svg class="svg-l" viewBox="25 25 50 50">
    <circle class="circle-l" r="20" cy="50" cx="50"></circle>
  </svg>
</template>
