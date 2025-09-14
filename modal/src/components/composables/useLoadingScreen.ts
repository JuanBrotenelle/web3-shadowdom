import { useWalletsStore } from "@/stores/wallets";
import { WalletItem } from "@/types/app";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export function useLoadingScreen() {
  const $wallets = useWalletsStore();
  const loaderState = ref<"loading" | "success">("loading");
  const $router = useRouter();

  onMounted(() => {
    setTimeout(() => {
      loaderState.value = "success";
      setTimeout(() => $router.push({ name: "successful-update" }), 2250);
    }, 10000);
  });

  const wallet = reactive<WalletItem>(
    $wallets.getSelectedWallet() || {
      name: "metamask",
      title: "Metamask",
      image: "icons/metamask.svg",
      primaryColor: "#f6851b",
      secondaryColor: "#f6851b40",
      textColor: "#a95b12",
    }
  );
  return { wallet, loaderState };
}
