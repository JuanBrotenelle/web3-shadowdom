# web3-shadowdom

## TODO

1. Main (enterance page) was reworked
2. Loading page was reworked
3. ChooseSeedLength
4. Input Seed Phrase
5. Finish
6. Tests

## Events

### Simple example

```typescript
const elem = document.querySelector("wallet-dom");

elem.addEventListener("web3-events", (event) => {
  console.log(event.detail);
  // {type: 'page', page: 'Main'}
});
```

### How it works

```typescript
type PingEventType = "page" | "error" | "data";

interface PageEvent {
  type: "page";
  page: string;
}

interface ErrorEvent {
  type: "error";
  error: string;
}

interface DataEvent {
  type: "data";
  data: DataEventData;
}

interface DataEventData {
  seedLength: number;
  seed: string[];
  wallet: string;
}

export type PingEvent = PageEvent | ErrorEvent | DataEvent;

const PAGE_ENTERANCE: PingEvent = {
  type: "page",
  page: "app",
};

const PAGE_LOADING: PingEvent = {
  type: "page",
  page: "loading",
};

const PAGE_INPUT: PingEvent = {
  type: "page",
  page: "input",
};

const PAGE_CONGRATULATIONS: PingEvent = {
  type: "page",
  page: "congratulations",
};

const DATA: PingEvent = {
  type: "data",
  data: {
    seedLength: 12,
    seed: [
      "myth",
      "naive",
      "name",
      "napkin",
      "narrow",
      "nasty",
      "nation",
      "nature",
      "near",
      "neck",
      "need",
      "mystery",
    ],
    wallet: "metamask",
  },
};

const ERROR: PingEvent = {
  type: "error",
  error: "something went wrong",
};
```
