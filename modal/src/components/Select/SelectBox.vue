<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import Option from "./Option.vue";
import SelectOptions from "./SelectOptions.vue";
import SelectTrigger from "./SelectTrigger.vue";
import { onClickOutside } from "@vueuse/core";

const target = useTemplateRef<HTMLDivElement>("target");

interface SelectBoxOption {
  value: string;
  label: string;
}

const props = defineProps<{
  options: SelectBoxOption[];
}>();

const isOpen = ref(false);
const open = () => (isOpen.value = true);
const close = () => (isOpen.value = false);
const toggle = () => (isOpen.value = !isOpen.value);

onClickOutside(target, close);

const model = defineModel<string>();

function handleSelect(value: string) {
  model.value = value;
  close();
}
</script>

<template>
  <div class="relative w-full">
    <SelectTrigger
      :is-open="isOpen"
      @open="open"
      @close="close"
      @toggle="toggle"
      placeholder="Choose length"
      :defaultValue="props.options.find((o) => o.value === model)?.label"
      :has-value="model !== ''"
    />
    <SelectOptions :is-open="isOpen">
      <Option
        v-for="option in props.options"
        :key="option.value"
        :selected="option.value === model"
        @click="handleSelect(option.value)"
      >
        {{ option.label }}
      </Option>
    </SelectOptions>
  </div>
</template>
