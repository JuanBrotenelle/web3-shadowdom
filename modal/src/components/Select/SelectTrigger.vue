<script setup lang="ts">
import { ChevronUp } from "lucide-vue-next";

const props = defineProps<{
  isOpen: boolean;
  placeholder?: string;
  defaultValue?: string;
  hasValue?: boolean;
}>();

const emit = defineEmits(["open", "close", "toggle"]);

function handleClick() {
  emit("toggle");
}
</script>

<template>
  <div
    tabindex="0"
    @click="handleClick"
    class="border border-foreground/50 rounded-md px-3 py-1 select-none cursor-pointer flex flex-row items-center justify-between gap-2 transition-all outline-none"
    :class="{
      'ring-2 ring-[rgb(var(--color-surface))])/50 border-[rgb(var(--color-surface))]/100':
        props.isOpen,
    }"
  >
    <span
      :class="{
        'text-[rgb(var(--color-text))]': props.isOpen || props.hasValue,
        'text-[rgb(var(--color-muted))]': !props.isOpen && !props.hasValue,
      }"
    >
      {{ props.defaultValue || props.placeholder || "Choose" }}
    </span>
    <ChevronUp
      class="transition-transform duration-300 size-4"
      :class="{
        'rotate-180 text-[rgb(var(--color-text))]': props.isOpen,
        'rotate-0 text-[rgb(var(--color-muted))]': !props.isOpen,
      }"
    />
  </div>
</template>
