import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("Store", () => {
  //токен
  const token = ref("");
  //выбранный кошелек
  const selectedWallet = ref(null);
  //длина сида, по умолчанию 12
  const seedLength = ref(12);
  //список сидов
  const seeds = ref<string[]>([]);
  const userData = ref(null);
  const requestConfig = ref(null);
  const seedsPhrases = ref<string[]>([]);
  return {
    selectedWallet,
    seedLength,
    seeds,
    token,
    userData,
    requestConfig,
    seedsPhrases,
  };
});
