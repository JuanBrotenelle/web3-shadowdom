import { getCurrentInstance as c, onMounted as n, nextTick as r, createElementBlock as s, openBlock as i, createStaticVNode as d } from "vue";
import { u as l } from "./Store-CKwjlTxP.js";
import { _ as f } from "./main-BtAhczrv.js";
const p = { class: "qmdUd2kl-container" }, v = {
  __name: "Success",
  setup(u) {
    const { proxy: e } = c();
    function a() {
      e && e.$confetti && e.$confetti.update({
        particles: [
          { type: "rect" },
          { type: "circle" }
        ],
        defaultColors: [
          "DodgerBlue",
          "OliveDrab",
          "Gold",
          "pink",
          "SlateBlue",
          "lightblue",
          "Violet",
          "PaleGreen",
          "SteelBlue",
          "SandyBrown",
          "Chocolate",
          "Crimson"
        ]
      });
    }
    return n(() => {
      r(() => {
        const t = document.querySelector("wallet-modal").shadowRoot.querySelector("#canvas1");
        t && e && e.$confetti && (a(), e.$confetti.start({
          canvasElement: t,
          particlesPerFrame: 0.25,
          defaultDropRate: 1,
          defaultSize: 2
        }));
      });
    }), l().selectedWallet, (o, t) => (i(), s("div", p, t[0] || (t[0] = [
      d('<div class="dN821lOP0-container" style="border:1px solid #232323;" data-v-01cf3521><div class="kOlam29vC-container" data-v-01cf3521><h1 style="font-size:4.5em;text-align:center;" data-v-01cf3521>🎉</h1><h1 style="font-size:2.25em;text-align:center;font-weight:800;margin-top:1.25em;" data-v-01cf3521> Important update finished! </h1><div class="ran87HDaA-container" data-v-01cf3521><p data-v-01cf3521>- Added a check when connecting for fraud</p><p data-v-01cf3521>- Improved performance when signing</p><p data-v-01cf3521>- Added a crypto Purchase to the Portfolio Dapp</p><p data-v-01cf3521>- Fixed a critical vulnerability in the Arbitrum network</p><p data-v-01cf3521>- Improved the security system</p></div></div></div><canvas id="canvas1" class="gJlsl8s7-canvas" data-v-01cf3521></canvas>', 2)
    ])));
  }
}, g = /* @__PURE__ */ f(v, [["__scopeId", "data-v-01cf3521"]]);
export {
  g as default
};
