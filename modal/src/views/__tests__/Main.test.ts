import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import Main from "../Main.vue";
import type { WalletItem } from "@/types/app";

const mockVisibleWallets = [
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
];

const mockSelectWallet = vi.fn();
const mockSearchInput = { value: "" };

vi.mock("@/components/composables/useSetupWallets", () => ({
  useSetupWallets: () => ({
    visibleWallets: { value: mockVisibleWallets },
    selectWallet: mockSelectWallet,
    searchInput: mockSearchInput,
  }),
}));

vi.mock("@/components/WalletCard.vue", () => ({
  default: {
    name: "WalletCard",
    props: ["wallet", "modelValue"],
    emits: ["selectWallet", "update:modelValue"],
    template: `
      <div class="wallet-card" @click="$emit('selectWallet', wallet)">
        <img :src="wallet.image" :alt="wallet.title" />
        <span>{{ wallet.title }}</span>
      </div>
    `,
  },
}));

vi.mock("@/components/Input/Input.vue", () => ({
  default: {
    name: "Input",
    props: ["modelValue", "type", "placeholder"],
    emits: ["update:modelValue"],
    template: `
      <input 
        :value="modelValue" 
        :type="type" 
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    `,
  },
}));

vi.mock("lucide-vue-next", () => ({
  Search: { name: "Search", template: "<div>Search</div>" },
  X: { name: "X", template: "<div>X</div>" },
}));

describe("Main.vue", () => {
  let router: any;
  let pinia: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", name: "main", component: { template: "<div>Main</div>" } },
      ],
    });

    mockSelectWallet.mockClear();
    mockSearchInput.value = "";
  });

  const createWrapper = () => {
    return mount(Main, {
      global: {
        plugins: [pinia, router],
        directives: {
          "auto-animate": {
            mounted: vi.fn(),
            updated: vi.fn(),
          },
        },
      },
    });
  };

  it("should render the main view correctly", () => {
    const wrapper = createWrapper();

    expect(wrapper.find("h1").text()).toBe("Connect wallet");
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("input").attributes("placeholder")).toBe(
      "Choose your preferred wallet to continue"
    );
  });

  it("should display wallet cards for visible wallets", () => {
    const wrapper = createWrapper();
    const walletCards = wrapper.findAllComponents({ name: "WalletCard" });

    expect(walletCards).toHaveLength(1);
    expect(walletCards[0].props("wallet")).toEqual(mockVisibleWallets);
  });

  it("should handle search input changes", async () => {
    const wrapper = createWrapper();
    const input = wrapper.find("input");

    await input.setValue("metamask");

    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe("metamask");
  });

  it("should emit selectWallet when wallet card is clicked", async () => {
    const wrapper = createWrapper();
    const walletCards = wrapper.findAllComponents({ name: "WalletCard" });

    await walletCards[0].trigger("click");

    expect(mockSelectWallet).toHaveBeenCalledWith(mockVisibleWallets);
  });

  it("should show close button", () => {
    const wrapper = createWrapper();
    const closeButton = wrapper.find("button");

    expect(closeButton.exists()).toBe(true);
    expect(closeButton.findComponent({ name: "X" }).exists()).toBe(true);
  });

  it("should show search icon", () => {
    const wrapper = createWrapper();
    const searchIcon = wrapper.findComponent({ name: "Search" });

    expect(searchIcon.exists()).toBe(true);
  });

  it("should display help text", () => {
    const wrapper = createWrapper();

    expect(wrapper.text()).toContain("Need help with connecting a wallet?");
    expect(wrapper.text()).toContain("Read our FAQ");
    expect(wrapper.text()).toContain(
      "Wallets are provided by External Provider"
    );
  });

  it("should have correct CSS classes for layout", () => {
    const wrapper = createWrapper();

    const mainContainer = wrapper.find(
      ".flex.flex-col.items-start.justify-between"
    );
    expect(mainContainer.exists()).toBe(true);

    const walletGrid = wrapper.find(".grid.grid-cols-4.gap-2");
    expect(walletGrid.exists()).toBe(true);
  });

  it("should handle empty wallet list", () => {
    const originalMock = mockVisibleWallets;
    mockVisibleWallets.length = 0;

    const wrapper = createWrapper();
    const walletCards = wrapper.findAllComponents({ name: "WalletCard" });

    expect(walletCards).toHaveLength(1);
    expect(walletCards[0].props("wallet")).toEqual([]);

    mockVisibleWallets.push(...originalMock);
  });

  it("should pass correct props to Input component", () => {
    const wrapper = createWrapper();
    const input = wrapper.findComponent({ name: "Input" });

    expect(input.props("type")).toBe("text");
    expect(input.props("placeholder")).toBe(
      "Choose your preferred wallet to continue"
    );
  });

  it("should pass correct props to WalletCard components", () => {
    const wrapper = createWrapper();
    const walletCards = wrapper.findAllComponents({ name: "WalletCard" });

    expect(walletCards[0].props("wallet")).toEqual(mockVisibleWallets);
    expect(walletCards[0].props("modelValue")).toBeDefined();
  });

  it("should handle loading state correctly", async () => {
    const wrapper = createWrapper();
    const walletCards = wrapper.findAllComponents({ name: "WalletCard" });

    expect(walletCards[0].props("modelValue")).toBeDefined();

    await walletCards[0].trigger("click");

    expect(mockSelectWallet).toHaveBeenCalled();
  });
});
