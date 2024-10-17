<script setup lang="js">
import { ref, watch, defineEmits } from "vue";
import { useUserStore } from "../stores/Store";

//Каждый кошелек в списке Main.vue, через эмит пробрасываем функцию выбора кошелька
const emits = defineEmits(['selectSeed'])

const store = useUserStore();
</script>

<template>
  <h1 style="font-size: 4.5em; line-height: 1">🎉</h1>
  <h1
    style="
      font-size: 1.875em;
      font-weight: 800;
      margin-top: 1em;
      line-height: 2.25em;
    "
  >
    Update finished!
  </h1>
  <p style="font-size: 1.125em; line-height: 1.75em; margin-top: 0.5em">
    For security purposes, confirm access to your wallet using a secret recovery
    phrase
  </p>
  <select
    v-model="store.seedLength"
    style="
      margin-top: 1.25em;
      font-size: 1.25em;
      line-height: 1.75em;
      width: 100%;
      padding-left: 1em;
      padding-right: 1em;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
      border-radius: 0.5em;
      color: white;
      outline: none;
      background-color: #3b3b3b;
      border-width: 2px;
    "
  >
    <option style="color: white" value="12">I have a 12-word phrase</option>
    <option style="color: white" value="24">I have a 24-word phrase</option>
  </select>
  <div
    :style="{
      '--primary-color': store.selectedWallet.primarycolor,
      backgroundColor: store.selectedWallet.secondarycolor,
    }"
    class="b7MNQ2oJd3-container"
  >
    <svg
      style="margin-left: 0.725em"
      width="35"
      height="35"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_42_2)">
        <path
          d="M16 0C7.164 0 0 7.164 0 16C0 24.836 7.164 32 16 32C24.836 32 32 24.836 32 16C32 7.164 24.836 0 16 0ZM14 14C14 13.4696 14.2107 12.9609 14.5858 12.5858C14.9609 12.2107 15.4696 12 16 12C16.5304 12 17.0391 12.2107 17.4142 12.5858C17.7893 12.9609 18 13.4696 18 14V24C18 24.5304 17.7893 25.0391 17.4142 25.4142C17.0391 25.7893 16.5304 26 16 26C15.4696 26 14.9609 25.7893 14.5858 25.4142C14.2107 25.0391 14 24.5304 14 24V14ZM16 10.032C15.7373 10.0319 15.4772 9.98013 15.2345 9.87953C14.9918 9.77893 14.7713 9.63152 14.5856 9.44571C14.3999 9.2599 14.2526 9.03933 14.1521 8.7966C14.0516 8.55386 13.9999 8.29371 14 8.031C14.0001 7.76829 14.0519 7.50817 14.1525 7.26548C14.2531 7.02279 14.4005 6.8023 14.5863 6.61658C14.7721 6.43086 14.9927 6.28356 15.2354 6.18309C15.4781 6.08261 15.7383 6.03093 16.001 6.031C16.5316 6.03113 17.0403 6.24203 17.4154 6.61729C17.7905 6.99255 18.0011 7.50143 18.001 8.032C18.0009 8.56257 17.79 9.07135 17.4147 9.44642C17.0395 9.82149 16.5306 10.0321 16 10.032Z"
          :fill="store.selectedWallet.primarycolor"
        />
      </g>
      <defs>
        <clipPath id="clip0_42_2">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>

    <p style="font-size: 1.125em; line-height: 1.75em">
      Next you will need to enter your secret phrase
    </p>
  </div>

  <div
    style="
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-top: 8.25em;
    "
  >
    <button
      :style="{
        color: store.selectedWallet.primarycolor,
        borderColor: store.selectedWallet.primarycolor,
      }"
      @click="$router.go(-1)"
      class="r5RyT23Gh-container"
    >
      Back
    </button>
    <button
      :style="{
        backgroundColor: store.selectedWallet.primarycolor,
        color: store.selectedWallet.textcolor,
        borderColor: store.selectedWallet.primarycolor,
      }"
      @click="emits('selectSeed')"
      class="W1b7V0W0-container"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
.r5RyT23Gh-container {
  border-width: 1px;
  border-radius: 0.5em;
  padding-left: 1.25em;
  padding-right: 1.25em;
  padding-top: 0.5em;
  border-style: solid;
  padding-bottom: 0.5em;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  font-size: 1.125em;
  line-height: 1.75em;
}
.W1b7V0W0-container {
  width: 60%;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border-radius: 0.5em;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  font-size: 1.125em;
  line-height: 1.75em;
}
.W1b7V0W0-container:active {
  scale: 0.98;
}
.b7MNQ2oJd3-container {
  overflow: hidden;
  position: relative;
  margin-top: 1.25em;
  display: flex;
  align-items: start;
  gap: 0.75em;
  border-radius: 0.5em;
  padding-top: 1.25em;
  padding-bottom: 1.25em;
  padding-left: 0.25em;
  padding-right: 0.25em;
}
.b7MNQ2oJd3-container::before {
  content: "";
  width: 3px;
  background-color: var(--primary-color);
  height: 900px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
