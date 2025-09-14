import { useWalletsStore } from "@/stores/wallets";
import { computed, onMounted, ref } from "vue";
import walletsConfig from "@/assets/wallets_config.json";
import { WalletItem, WalletsConfig } from "@/types/app";
import { useRouter } from "vue-router";
import { sendEvent } from "./useEventHandler";

export function useSetupWallets() {
  const $router = useRouter();
  const $wallets = useWalletsStore();
  const isRevealedAll = ref(false);
  const searchInput = ref<string>("");

  function fetchWallets() {
    $wallets.clearWallets();
    const wallets = walletsConfig as unknown as WalletsConfig;
    $wallets.setWallets(wallets.wallets);
  }

  onMounted(() => {
    fetchWallets();
  });

  const selectWallet = (wallet: WalletItem) => {
    $wallets.setSelectedWallet(wallet);
    sendEvent({ type: "page", page: "Loader" });
    $router.push({ name: "loading" });
  };

  const revealAllWallets = () => (isRevealedAll.value = !isRevealedAll.value);

  const visibleWallets = computed(() =>
    $wallets
      .getWallets()
      .filter((w) =>
        w.name
          .toLowerCase()
          .includes(searchInput.value.toLocaleLowerCase().trim())
      )
  );

  onMounted(() => {
    sendEvent({ type: "page", page: "Main" });
  });

  return { visibleWallets, selectWallet, revealAllWallets, searchInput };
}
