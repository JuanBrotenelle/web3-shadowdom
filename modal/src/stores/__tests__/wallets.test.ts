import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useWalletsStore } from "../wallets";
import type { WalletItem } from "@/types/app";

describe("Wallets Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const mockWallet: WalletItem = {
    name: "metamask",
    title: "MetaMask",
    image: "/icons/metamask.svg",
    primaryColor: "#f6851b",
    secondaryColor: "#e2761b",
    textColor: "#ffffff",
  };

  const mockWallets: WalletItem[] = [
    mockWallet,
    {
      name: "coinbase",
      title: "Coinbase Wallet",
      image: "/icons/coinbase.svg",
      primaryColor: "#0052ff",
      secondaryColor: "#0041cc",
      textColor: "#ffffff",
    },
  ];

  it("should initialize with empty wallets array", () => {
    const store = useWalletsStore();
    expect(store.getWallets()).toEqual([]);
    expect(store.getSelectedWallet()).toBeNull();
  });

  it("should set wallets correctly", () => {
    const store = useWalletsStore();
    store.setWallets(mockWallets);
    expect(store.getWallets()).toEqual(mockWallets);
    expect(store.getWallets()).toHaveLength(2);
  });

  it("should clear wallets", () => {
    const store = useWalletsStore();
    store.setWallets(mockWallets);
    expect(store.getWallets()).toHaveLength(2);

    store.clearWallets();
    expect(store.getWallets()).toEqual([]);
    expect(store.getWallets()).toHaveLength(0);
  });

  it("should set selected wallet", () => {
    const store = useWalletsStore();
    expect(store.getSelectedWallet()).toBeNull();

    store.setSelectedWallet(mockWallet);
    expect(store.getSelectedWallet()).toEqual(mockWallet);
  });

  it("should update selected wallet", () => {
    const store = useWalletsStore();
    const newWallet = mockWallets[1];

    store.setSelectedWallet(mockWallet);
    expect(store.getSelectedWallet()).toEqual(mockWallet);

    store.setSelectedWallet(newWallet);
    expect(store.getSelectedWallet()).toEqual(newWallet);
  });

  it("should handle multiple operations correctly", () => {
    const store = useWalletsStore();

    store.setWallets(mockWallets);
    expect(store.getWallets()).toHaveLength(2);

    store.setSelectedWallet(mockWallet);
    expect(store.getSelectedWallet()).toEqual(mockWallet);

    store.clearWallets();
    expect(store.getWallets()).toEqual([]);
    expect(store.getSelectedWallet()).toEqual(mockWallet);
  });
});
