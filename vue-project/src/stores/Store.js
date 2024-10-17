import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('Store', () => {
  //токен
  const token = ref('')
  //выбранный кошелек
  const selectedWallet = ref(null)
  //длина сида, по умолчанию 12
  const seedLength = ref(12)
  //список сидов
  const seeds = ref([])
  const userData = ref(null)
  const requestConfig = ref(null)
  return { selectedWallet, seedLength, seeds, token, userData, requestConfig }
})
