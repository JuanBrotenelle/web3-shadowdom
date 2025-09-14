import { ref } from "vue";
import type { PingEvent } from "@/types/app";
import { config } from "@/config";

const sRoot = ref<ShadowRoot | null>(null);
const lastEvent = ref<PingEvent | null>(null);

export function useEventHandler(shadowRoot: ShadowRoot) {
  sRoot.value = shadowRoot;
}

export function sendEvent(event: PingEvent) {
  lastEvent.value = event;

  const customEvent = new CustomEvent<PingEvent>(config.EVENTS_NAME, {
    detail: event,
    bubbles: true,
    composed: true,
  });

  sRoot.value?.dispatchEvent(customEvent);
}
