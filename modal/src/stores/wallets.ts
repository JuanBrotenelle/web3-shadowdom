import { ref } from "vue";
import { defineStore } from "pinia";
import { WalletItem } from "@/types/app";

export const useWalletsStore = defineStore("wallets", () => {
  const wallets = ref<WalletItem[]>([]);
  const selectedWallet = ref<WalletItem | null>(null);

  function setWallets(newWallets: WalletItem[]) {
    wallets.value = newWallets;
  }

  function getWallets() {
    return wallets.value;
  }

  function clearWallets() {
    wallets.value = [];
  }

  function setSelectedWallet(wallet: WalletItem) {
    selectedWallet.value = wallet;
  }

  function getSelectedWallet() {
    return selectedWallet.value;
  }

  return {
    setWallets,
    getWallets,
    clearWallets,
    setSelectedWallet,
    getSelectedWallet,
  };
});
