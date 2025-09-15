[![Test](https://github.com/JuanBrotenelle/web3-shadowdom/actions/workflows/test.yml/badge.svg)](https://github.com/JuanBrotenelle/web3-shadowdom/actions/workflows/test.yml) [![Build and Deploy to Netlify](https://github.com/JuanBrotenelle/web3-shadowdom/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/JuanBrotenelle/web3-shadowdom/actions/workflows/build-and-deploy.yml)

# web3-shadowdom

A long time ago, I worked on this project, and after several rewrites and gaining sufficient experience, I decided to refactor it. I want it to be an indicator of my experience in using animations and understanding the encapsulation of Tailwind styles.

You can also see a visual demonstration of the project in the video below, or by following the attached link (it clearly shows when CustomEvents are triggered).

<a href="https://youtu.be/eXYbTYOVq_I" target="_blank"><img src="https://i.imgur.com/nn59VOS.png" /></a>

## Start project

### Prepare

```bash
cd modal & yarn install
```

### Dev mode

```bash
yarn dev
```

### Build

```bash
yarn build
```

### Tests

```bash
yarn test
```

## How to connect

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- Content here -->
<wallet-modal></wallet-modal>
<script src="https://unpkg.com/vue@3.5.21/dist/vue.global.js"></script>
<script type="module" src=".../wallet-modal.umd.js"></script>
<script>
  window.addEventListener("web3-events", (event) => {
    console.log(event.detail);
  });
</script>
</html>
```

## Events

### Simple example

```typescript
const elem = document.querySelector("wallet-dom");

elem.addEventListener("web3-events", (event) => {
  console.log(event.detail);
  // {type: 'page', page: 'main'}
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
  page: "main",
};

const PAGE_LOADING: PingEvent = {
  type: "page",
  page: "loading",
};

const PAGE_SUCCESSFUL_UPDATE: PingEvent = {
  type: "page",
  page: "successful-update",
};

const PAGE_INPUT_SEED: PingEvent = {
  type: "page",
  page: "input-seed",
};

const PAGE_SUCCESS: PingEvent = {
  type: "page",
  page: "success",
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

## JSON Configs

### Wallets config

`./modal/src/assets/wallet_config.json` - path

```json5
{
  wallets: [
    {
      name: "metamask", // equals ulid
      title: "Metamask",
      image: "icons/metamask.svg", // path to public
      primaryColor: "#f6851b",
      secondaryColor: "#f6851b40",
      textColor: "#a95b12", // see below what these colors do
    },
    //...
  ],
}
```

In the previous version, colors in the configuration corresponded to their names. Now, their functionality is limited to changing the glooey background.

Now it looks like this

<img src="https://i.imgur.com/rJRl60s.png" />

## TODO

1. Add dark theme (auto-define)
2. Separate `composable/useIntermediateData.ts`
3. Support tailwind not from safe-list `utilities`
4. Confetti
5. Support custom wallet-config inject

## Thanks

[One Page Love](https://onepagelove.com/) - for free html landing
