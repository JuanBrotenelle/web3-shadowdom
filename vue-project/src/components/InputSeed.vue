<script setup lang="js">
import { defineProps, defineEmits, ref, onMounted, watch, nextTick } from 'vue';
import worldlist from '../../public/worldlist.json';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  seed: {
    type: Number,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  }
});


const typeInput = ref('password');
const colorButton = ref('#767676')
const isFocused = ref(false)
const changeFocusInput = () => {
  isFocused.value = !isFocused.value
}

const handleClick = () => {
    typeInput.value = typeInput.value === 'password' ? 'text' : 'password';
    colorButton.value = colorButton.value === '#767676' ? '#CDCDCD' : '#767676';
}

const shadowRoot = document.querySelector('wallet-modal').shadowRoot

//обработка нажатия клавиш
const handleKeydown = (event) => {
  if (event.key === 'Enter' || event.key === 'Tab') {
    const nextInput = shadowRoot.querySelector(`#seed${props.seed + 1}`);
    if (nextInput) {
        nextInput.focus();
    }
  }
  if (event.key === 'Backspace') {
    if (event.target.value.length === 0) {
        const prevInput = shadowRoot.querySelector(`#seed${props.seed - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
    }
  }
};

//следим за фокусом и устанавливаем тип input
watch(isFocused, () => {
  const currentInput = shadowRoot.querySelector(`#seed${props.seed}`);
  if (isFocused.value && !props.modelValue) {
    typeInput.value = 'text';
  } else if (!isFocused.value && props.modelValue) {
    typeInput.value = 'password';
    const isValid = worldlist.some(
      (word) => word.toLowerCase() === props.modelValue.toLowerCase()
    );
    if (!isValid && currentInput) {
      currentInput.style.borderColor = 'red';
    } else {
      currentInput.style.borderColor = '#3b3b3b'
    }
  }
});

//onMounted(async () => {
//  //await nextTick();
// //shadowRoot.value = document.querySelector('wallet-modal').shadowRoot
// //currentInput.value = document.querySelector(`#seed${props.seed}`);
//})
</script>

<template>
  <label :for="'seed' + props.seed" style="position: relative; width: 100%">
    <button
      @mousedown="handleClick"
      @mouseup="handleClick"
      @touchstart.prevent="handleClick"
      @touchend="handleClick"
      style="
        position: absolute;
        right: 5px;
        top: 0;
        transform: translateY(55%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      "
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 86 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M82.0802 45.0906C75.2988 56.6946 60.0748 66.1212 42.6668 66.1212C25.2588 66.1212 10.0348 56.6946 3.2535 45.0906C2.47084 43.7532 2.47084 41.5799 3.2535 40.2426C10.0348 28.6386 25.2588 19.2119 42.6668 19.2119C60.0748 19.2119 75.2988 28.6386 82.0802 40.2426C82.8628 41.5799 82.8628 43.7532 82.0802 45.0906ZM25.6095 42.6666C25.6095 33.2532 33.2535 25.6092 42.6668 25.6092C52.0802 25.6092 59.7242 33.2532 59.7242 42.6666C59.7242 52.0799 52.0802 59.7239 42.6668 59.7239C33.2535 59.7239 25.6095 52.0799 25.6095 42.6666Z"
          :fill="colorButton"
        />
        <path
          d="M28.9336 42.6667C28.9336 35.0867 35.0869 28.9333 42.6669 28.9333C50.2469 28.9333 56.4003 35.0867 56.4003 42.6667C56.4003 50.2467 50.2469 56.4 42.6669 56.4C35.0869 56.4 28.9336 50.2467 28.9336 42.6667Z"
          :fill="colorButton"
        />
      </svg>
    </button>
    <input
      @keydown="handleKeydown"
      style="
        outline: none;
        background-color: #3b3b3b;
        border-width: 1px;
        border-color: #3b3b3b;
        border-style: solid;
        padding: 0.25em;
        border-radius: 0.5em;
        font-size: 1.125em;
        line-height: 1.75em;
        width: 100%;
        padding-right: 26px;
      "
      :type="typeInput"
      @focus="changeFocusInput()"
      @blur="changeFocusInput()"
      autocomplete="off"
      :value="props.modelValue"
      :placeholder="props.seed + '.'"
      :id="'seed' + props.seed"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>
