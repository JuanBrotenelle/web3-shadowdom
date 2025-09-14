<script setup lang="ts">
import { twMerge } from "tailwind-merge";

interface Props {
  type?: "password" | "text";
  placeholder?: string;
}

const modelValue = defineModel();

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});
</script>

<template>
  <input
    type="text"
    :placeholder="props.placeholder"
    v-model="modelValue"
    :class="
      twMerge(
        'w-full py-1 px-2 outline-none border border-[rgb(var(--color-muted))] bg-[rgb(var(--color-surface))] placeholder:text-[rgb(var(--color-muted))] text-[rgb(var(--color-muted))] rounded-md',
        'focus:ring focus:ring-[rgb(var(--color-surface))]/50, transition-all'
      )
    "
  />
</template>
