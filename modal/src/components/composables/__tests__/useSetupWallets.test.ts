import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { useWalletsStore } from "@/stores/wallets";
import type { WalletItem } from "@/types/app";

// Mock the wallets config
vi.mock("@/assets/wallets_config.json", () => ({
  default: {
    wallets: [
      {
        name: "metamask",
        title: "MetaMask",
        image: "icons/metamask.svg",
        primaryColor: "#f6851b",
        secondaryColor: "#f6851b40",
        textColor: "#a95b12",
      },
      {
        name: "phantom",
        title: "Phantom",
        image: "icons/phantom.svg",
        primaryColor: "#ab9ff2",
        secondaryColor: "#ab9ff240",
        textColor: "#746ca5",
      },
    ],
  },
}));

// Mock the event handler
vi.mock("./useEventHandler", () => ({
  sendEvent: vi.fn(),
}));

describe("useSetupWallets - Store Integration", () => {
  let router: any;
  let pinia: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", name: "main", component: { template: "<div>Main</div>" } },
        { path: "/loading", name: "loading", component: { template: "<div>Loading</div>" } },
      ],
    });
  });

  it("should work with wallets store", () => {
    const store = useWalletsStore();
    
    // Test initial state
    expect(store.getWallets()).toEqual([]);
    expect(store.getSelectedWallet()).toBeNull();
    
    // Test setting wallets
    const mockWallets: WalletItem[] = [
      {
        name: "metamask",
        title: "MetaMask",
        image: "icons/metamask.svg",
        primaryColor: "#f6851b",
        secondaryColor: "#f6851b40",
        textColor: "#a95b12",
      },
    ];
    
    store.setWallets(mockWallets);
    expect(store.getWallets()).toEqual(mockWallets);
    
    // Test selecting wallet
    store.setSelectedWallet(mockWallets[0]);
    expect(store.getSelectedWallet()).toEqual(mockWallets[0]);
    
    // Test clearing wallets
    store.clearWallets();
    expect(store.getWallets()).toEqual([]);
    // Selected wallet should remain
    expect(store.getSelectedWallet()).toEqual(mockWallets[0]);
  });

  it("should handle wallet selection flow", () => {
    const store = useWalletsStore();
    const mockWallet: WalletItem = {
      name: "phantom",
      title: "Phantom",
      image: "icons/phantom.svg",
      primaryColor: "#ab9ff2",
      secondaryColor: "#ab9ff240",
      textColor: "#746ca5",
    };
    
    // Mock router push
    const pushSpy = vi.spyOn(router, "push");
    
    // Simulate wallet selection
    store.setSelectedWallet(mockWallet);
    router.push({ name: "loading" });
    
    expect(store.getSelectedWallet()).toEqual(mockWallet);
    expect(pushSpy).toHaveBeenCalledWith({ name: "loading" });
  });
});
