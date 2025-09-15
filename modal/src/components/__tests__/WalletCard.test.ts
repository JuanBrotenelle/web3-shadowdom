import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import WalletCard from "../WalletCard.vue";
import type { WalletItem } from "@/types/app";

describe("WalletCard", () => {
  const mockWallet: WalletItem = {
    name: "metamask",
    title: "MetaMask",
    image: "icons/metamask.svg",
    primaryColor: "#f6851b",
    secondaryColor: "#f6851b40",
    textColor: "#a95b12",
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("should render wallet information correctly", () => {
    const wrapper = mount(WalletCard, {
      props: {
        wallet: mockWallet,
      },
    });

    expect(wrapper.find("img").attributes("src")).toBe(mockWallet.image);
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("should emit selectWallet event when clicked", async () => {
    const wrapper = mount(WalletCard, {
      props: {
        wallet: mockWallet,
      },
    });

    const button = wrapper.find("button");
    await button.trigger("click");

    vi.advanceTimersByTime(3500);

    expect(wrapper.emitted("selectWallet")).toBeTruthy();
    expect(wrapper.emitted("selectWallet")?.[0]).toEqual([mockWallet]);
  });

  it("should show loading state during timeout", async () => {
    const wrapper = mount(WalletCard, {
      props: {
        wallet: mockWallet,
      },
    });

    const button = wrapper.find("button");
    await button.trigger("click");

    expect(wrapper.find(".animate-pulse").exists()).toBe(true);
    expect(button.attributes("disabled")).toBeDefined();
    expect(button.classes()).toContain("pointer-events-none");

    vi.advanceTimersByTime(3500);
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".animate-pulse").exists()).toBe(false);
    expect(button.attributes("disabled")).toBeUndefined();
    expect(button.classes()).not.toContain("pointer-events-none");
  });

  it("should not emit event if already loading", async () => {
    const wrapper = mount(WalletCard, {
      props: {
        wallet: mockWallet,
      },
    });

    const button = wrapper.find("button");

    await button.trigger("click");

    await button.trigger("click");

    vi.advanceTimersByTime(3500);

    expect(wrapper.emitted("selectWallet")).toHaveLength(1);
  });

  it("should handle v-model for loading state", async () => {
    const wrapper = mount(WalletCard, {
      props: {
        wallet: mockWallet,
        modelValue: false,
      },
    });

    const button = wrapper.find("button");
    await button.trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);

    vi.advanceTimersByTime(3500);

    expect(wrapper.emitted("update:modelValue")?.[1]).toEqual([false]);
  });

  it("should not allow interaction when external loading is true", async () => {
    const wrapper = mount(WalletCard, {
      props: {
        wallet: mockWallet,
        modelValue: true,
      },
    });

    const button = wrapper.find("button");
    await button.trigger("click");

    expect(wrapper.emitted("selectWallet")).toBeFalsy();
    expect(wrapper.emitted("update:modelValue")).toBeFalsy();
  });

  it("should apply correct styles for wallet colors", () => {
    const wrapper = mount(WalletCard, {
      props: {
        wallet: mockWallet,
      },
    });

    const walletImage = wrapper.find("img");
    expect(walletImage.exists()).toBe(true);
    expect(walletImage.attributes("src")).toBe(mockWallet.image);

    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
    expect(button.classes()).toContain("cursor-pointer");
  });

  it("should have correct CSS classes", () => {
    const wrapper = mount(WalletCard, {
      props: {
        wallet: mockWallet,
      },
    });

    const button = wrapper.find("button");
    expect(button.classes()).toContain("cursor-pointer");
    expect(button.classes()).toContain("h-16");
    expect(button.classes()).toContain("w-16");
    expect(button.classes()).toContain("rounded-md");
    expect(button.classes()).toContain("overflow-hidden");
  });
});
