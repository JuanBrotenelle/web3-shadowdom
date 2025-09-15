import { Ref } from "vue";

export interface WalletItem {
  name: string;
  title: string;
  image: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
}
type WalletsConfig = { wallets: WalletItem[] };
declare module "*.json" {
  const value: unknown;
  export default value;
}

export type PingEventType = "page" | "error" | "data";

export interface PageEvent {
  type: "page";
  page: string;
}

export interface ErrorEvent {
  type: "error";
  error: string;
}

export interface DataEvent {
  type: "data";
  data: DataEventData;
}

export interface DataEventData {
  seedLength: number;
  seed: string[];
  wallet: string;
}

export type PingEvent = PageEvent | ErrorEvent | DataEvent;

export interface SeedInput {
  model: Ref<string>;
  hide: boolean;
  valid: boolean;
  passed: boolean;
}

export type WordlistBip39 = string[];
