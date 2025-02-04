import { effectScope as en, ref as Ke, markRaw as be, toRaw as De, watch as Qe, unref as pe, hasInjectionContext as Bn, inject as Ee, getCurrentInstance as bt, reactive as tn, isRef as Ve, isReactive as Et, toRef as tt, nextTick as lt, getCurrentScope as Hn, onScopeDispose as Fn, toRefs as Pt, computed as te, shallowRef as zn, defineComponent as nn, shallowReactive as Gn, h as on, provide as nt, watchEffect as Wn, createElementBlock as qn, openBlock as kt, createElementVNode as Rt, createVNode as Nt, withCtx as Tt, Transition as Yn, createBlock as Xn, resolveDynamicComponent as Kn, createApp as Qn } from "vue";
function Be(e, t, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n);
}
function ot(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function Jn() {
  return rn().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function rn() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Zn = typeof Proxy == "function", eo = "devtools-plugin:setup", to = "plugin:settings:set";
let Se, ut;
function no() {
  var e;
  return Se !== void 0 || (typeof window < "u" && window.performance ? (Se = !0, ut = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Se = !0, ut = globalThis.perf_hooks.performance) : Se = !1), Se;
}
function oo() {
  return no() ? ut.now() : Date.now();
}
class ro {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const c in t.settings) {
        const a = t.settings[c];
        o[c] = a.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let l = Object.assign({}, o);
    try {
      const c = localStorage.getItem(r), a = JSON.parse(c);
      Object.assign(l, a);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return l;
      },
      setSettings(c) {
        try {
          localStorage.setItem(r, JSON.stringify(c));
        } catch {
        }
        l = c;
      },
      now() {
        return oo();
      }
    }, n && n.on(to, (c, a) => {
      c === this.plugin.id && this.fallbacks.setSettings(a);
    }), this.proxiedOn = new Proxy({}, {
      get: (c, a) => this.target ? this.target.on[a] : (...f) => {
        this.onQueue.push({
          method: a,
          args: f
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (c, a) => this.target ? this.target[a] : a === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(a) ? (...f) => (this.targetQueue.push({
        method: a,
        args: f,
        resolve: () => {
        }
      }), this.fallbacks[a](...f)) : (...f) => new Promise((y) => {
        this.targetQueue.push({
          method: a,
          args: f,
          resolve: y
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function _t(e, t) {
  const n = e, o = rn(), r = Jn(), l = Zn && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !l))
    r.emit(eo, e, t);
  else {
    const c = l ? new ro(n, r) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: c
    }), c && t(c.proxiedTarget);
  }
}
var U = {};
let xe;
const Me = (e) => xe = e, sn = U.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function _e(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var oe;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(oe || (oe = {}));
const me = typeof window < "u", Ct = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function io(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function wt(e, t, n) {
  const o = new XMLHttpRequest();
  o.open("GET", e), o.responseType = "blob", o.onload = function() {
    ln(o.response, t, n);
  }, o.onerror = function() {
    console.error("could not download file");
  }, o.send();
}
function an(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function Fe(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const ze = typeof navigator == "object" ? navigator : { userAgent: "" }, cn = /Macintosh/.test(ze.userAgent) && /AppleWebKit/.test(ze.userAgent) && !/Safari/.test(ze.userAgent), ln = me ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !cn ? so : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in ze ? ao : (
      // Fallback to using FileReader and a popup
      co
    )
  )
) : () => {
};
function so(e, t = "download", n) {
  const o = document.createElement("a");
  o.download = t, o.rel = "noopener", typeof e == "string" ? (o.href = e, o.origin !== location.origin ? an(o.href) ? wt(e, t, n) : (o.target = "_blank", Fe(o)) : Fe(o)) : (o.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(o.href);
  }, 4e4), setTimeout(function() {
    Fe(o);
  }, 0));
}
function ao(e, t = "download", n) {
  if (typeof e == "string")
    if (an(e))
      wt(e, t, n);
    else {
      const o = document.createElement("a");
      o.href = e, o.target = "_blank", setTimeout(function() {
        Fe(o);
      });
    }
  else
    navigator.msSaveOrOpenBlob(io(e, n), t);
}
function co(e, t, n, o) {
  if (o = o || open("", "_blank"), o && (o.document.title = o.document.body.innerText = "downloading..."), typeof e == "string")
    return wt(e, t, n);
  const r = e.type === "application/octet-stream", l = /constructor/i.test(String(Ct.HTMLElement)) || "safari" in Ct, c = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((c || r && l || cn) && typeof FileReader < "u") {
    const a = new FileReader();
    a.onloadend = function() {
      let f = a.result;
      if (typeof f != "string")
        throw o = null, new Error("Wrong reader.result type");
      f = c ? f : f.replace(/^data:[^;]*;/, "data:attachment/file;"), o ? o.location.href = f : location.assign(f), o = null;
    }, a.readAsDataURL(e);
  } else {
    const a = URL.createObjectURL(e);
    o ? o.location.assign(a) : location.href = a, o = null, setTimeout(function() {
      URL.revokeObjectURL(a);
    }, 4e4);
  }
}
function Y(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function Ot(e) {
  return "_a" in e && "install" in e;
}
function un() {
  if (!("clipboard" in navigator))
    return Y("Your browser doesn't support the Clipboard API", "error"), !0;
}
function fn(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (Y('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function lo(e) {
  if (!un())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), Y("Global state copied to clipboard.");
    } catch (t) {
      if (fn(t))
        return;
      Y("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function uo(e) {
  if (!un())
    try {
      hn(e, JSON.parse(await navigator.clipboard.readText())), Y("Global state pasted from clipboard.");
    } catch (t) {
      if (fn(t))
        return;
      Y("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function fo(e) {
  try {
    ln(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    Y("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let se;
function ho() {
  se || (se = document.createElement("input"), se.type = "file", se.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      se.onchange = async () => {
        const o = se.files;
        if (!o)
          return t(null);
        const r = o.item(0);
        return t(r ? { text: await r.text(), file: r } : null);
      }, se.oncancel = () => t(null), se.onerror = n, se.click();
    });
  }
  return e;
}
async function po(e) {
  try {
    const n = await ho()();
    if (!n)
      return;
    const { text: o, file: r } = n;
    hn(e, JSON.parse(o)), Y(`Global state imported from "${r.name}".`);
  } catch (t) {
    Y("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function hn(e, t) {
  for (const n in t) {
    const o = e.state.value[n];
    o ? Object.assign(o, t[n]) : e.state.value[n] = t[n];
  }
}
function ne(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const dn = "🍍 Pinia (root)", Ge = "_root";
function mo(e) {
  return Ot(e) ? {
    id: Ge,
    label: dn
  } : {
    id: e.$id,
    label: e.$id
  };
}
function go(e) {
  if (Ot(e)) {
    const n = Array.from(e._s.keys()), o = e._s;
    return {
      state: n.map((l) => ({
        editable: !0,
        key: l,
        value: e.state.value[l]
      })),
      getters: n.filter((l) => o.get(l)._getters).map((l) => {
        const c = o.get(l);
        return {
          editable: !1,
          key: l,
          value: c._getters.reduce((a, f) => (a[f] = c[f], a), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((n) => ({
      editable: !0,
      key: n,
      value: e.$state[n]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((n) => ({
    editable: !1,
    key: n,
    value: e[n]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((n) => ({
    editable: !0,
    key: n,
    value: e[n]
  }))), t;
}
function vo(e) {
  return e ? Array.isArray(e) ? e.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: ne(e.type),
    key: ne(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function yo(e) {
  switch (e) {
    case oe.direct:
      return "mutation";
    case oe.patchFunction:
      return "$patch";
    case oe.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let ke = !0;
const We = [], ye = "pinia:mutations", X = "pinia", { assign: bo } = Object, qe = (e) => "🍍 " + e;
function Eo(e, t) {
  _t({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: We,
    app: e
  }, (n) => {
    typeof n.now != "function" && Y("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: ye,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: X,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            lo(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await uo(t), n.sendInspectorTree(X), n.sendInspectorState(X);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            fo(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await po(t), n.sendInspectorTree(X), n.sendInspectorState(X);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (o) => {
            const r = t._s.get(o);
            r ? typeof r.$reset != "function" ? Y(`Cannot reset "${o}" store because it doesn't have a "$reset" method implemented.`, "warn") : (r.$reset(), Y(`Store "${o}" reset.`)) : Y(`Cannot reset "${o}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((o, r) => {
      const l = o.componentInstance && o.componentInstance.proxy;
      if (l && l._pStores) {
        const c = o.componentInstance.proxy._pStores;
        Object.values(c).forEach((a) => {
          o.instanceData.state.push({
            type: qe(a.$id),
            key: "state",
            editable: !0,
            value: a._isOptionsAPI ? {
              _custom: {
                value: De(a.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => a.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(a.$state).reduce((f, y) => (f[y] = a.$state[y], f), {})
            )
          }), a._getters && a._getters.length && o.instanceData.state.push({
            type: qe(a.$id),
            key: "getters",
            editable: !1,
            value: a._getters.reduce((f, y) => {
              try {
                f[y] = a[y];
              } catch (h) {
                f[y] = h;
              }
              return f;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((o) => {
      if (o.app === e && o.inspectorId === X) {
        let r = [t];
        r = r.concat(Array.from(t._s.values())), o.rootNodes = (o.filter ? r.filter((l) => "$id" in l ? l.$id.toLowerCase().includes(o.filter.toLowerCase()) : dn.toLowerCase().includes(o.filter.toLowerCase())) : r).map(mo);
      }
    }), globalThis.$pinia = t, n.on.getInspectorState((o) => {
      if (o.app === e && o.inspectorId === X) {
        const r = o.nodeId === Ge ? t : t._s.get(o.nodeId);
        if (!r)
          return;
        r && (o.nodeId !== Ge && (globalThis.$store = De(r)), o.state = go(r));
      }
    }), n.on.editInspectorState((o, r) => {
      if (o.app === e && o.inspectorId === X) {
        const l = o.nodeId === Ge ? t : t._s.get(o.nodeId);
        if (!l)
          return Y(`store "${o.nodeId}" not found`, "error");
        const { path: c } = o;
        Ot(l) ? c.unshift("state") : (c.length !== 1 || !l._customProperties.has(c[0]) || c[0] in l.$state) && c.unshift("$state"), ke = !1, o.set(l, c, o.state.value), ke = !0;
      }
    }), n.on.editComponentState((o) => {
      if (o.type.startsWith("🍍")) {
        const r = o.type.replace(/^🍍\s*/, ""), l = t._s.get(r);
        if (!l)
          return Y(`store "${r}" not found`, "error");
        const { path: c } = o;
        if (c[0] !== "state")
          return Y(`Invalid path for store "${r}":
${c}
Only state can be modified.`);
        c[0] = "$state", ke = !1, o.set(l, c, o.state.value), ke = !0;
      }
    });
  });
}
function _o(e, t) {
  We.includes(qe(t.$id)) || We.push(qe(t.$id)), _t({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: We,
    app: e,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: !0
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (n) => {
    const o = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    t.$onAction(({ after: c, onError: a, name: f, args: y }) => {
      const h = pn++;
      n.addTimelineEvent({
        layerId: ye,
        event: {
          time: o(),
          title: "🛫 " + f,
          subtitle: "start",
          data: {
            store: ne(t.$id),
            action: ne(f),
            args: y
          },
          groupId: h
        }
      }), c((u) => {
        ge = void 0, n.addTimelineEvent({
          layerId: ye,
          event: {
            time: o(),
            title: "🛬 " + f,
            subtitle: "end",
            data: {
              store: ne(t.$id),
              action: ne(f),
              args: y,
              result: u
            },
            groupId: h
          }
        });
      }), a((u) => {
        ge = void 0, n.addTimelineEvent({
          layerId: ye,
          event: {
            time: o(),
            logType: "error",
            title: "💥 " + f,
            subtitle: "end",
            data: {
              store: ne(t.$id),
              action: ne(f),
              args: y,
              error: u
            },
            groupId: h
          }
        });
      });
    }, !0), t._customProperties.forEach((c) => {
      Qe(() => pe(t[c]), (a, f) => {
        n.notifyComponentUpdate(), n.sendInspectorState(X), ke && n.addTimelineEvent({
          layerId: ye,
          event: {
            time: o(),
            title: "Change",
            subtitle: c,
            data: {
              newValue: a,
              oldValue: f
            },
            groupId: ge
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: c, type: a }, f) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(X), !ke)
        return;
      const y = {
        time: o(),
        title: yo(a),
        data: bo({ store: ne(t.$id) }, vo(c)),
        groupId: ge
      };
      a === oe.patchFunction ? y.subtitle = "⤵️" : a === oe.patchObject ? y.subtitle = "🧩" : c && !Array.isArray(c) && (y.subtitle = c.type), c && (y.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: c
        }
      }), n.addTimelineEvent({
        layerId: ye,
        event: y
      });
    }, { detached: !0, flush: "sync" });
    const r = t._hotUpdate;
    t._hotUpdate = be((c) => {
      r(c), n.addTimelineEvent({
        layerId: ye,
        event: {
          time: o(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: ne(t.$id),
            info: ne("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(X), n.sendInspectorState(X);
    });
    const { $dispose: l } = t;
    t.$dispose = () => {
      l(), n.notifyComponentUpdate(), n.sendInspectorTree(X), n.sendInspectorState(X), n.getSettings().logStoreChanges && Y(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(X), n.sendInspectorState(X), n.getSettings().logStoreChanges && Y(`"${t.$id}" store installed 🆕`);
  });
}
let pn = 0, ge;
function $t(e, t, n) {
  const o = t.reduce((r, l) => (r[l] = De(e)[l], r), {});
  for (const r in o)
    e[r] = function() {
      const l = pn, c = n ? new Proxy(e, {
        get(...f) {
          return ge = l, Reflect.get(...f);
        },
        set(...f) {
          return ge = l, Reflect.set(...f);
        }
      }) : e;
      ge = l;
      const a = o[r].apply(c, arguments);
      return ge = void 0, a;
    };
}
function wo({ app: e, store: t, options: n }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!n.state, !t._p._testing) {
      $t(t, Object.keys(n.actions), t._isOptionsAPI);
      const o = t._hotUpdate;
      De(t)._hotUpdate = function(r) {
        o.apply(this, arguments), $t(t, Object.keys(r._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    _o(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function Oo() {
  const e = en(!0), t = e.run(() => Ke({}));
  let n = [], o = [];
  const r = be({
    install(l) {
      Me(r), r._a = l, l.provide(sn, r), l.config.globalProperties.$pinia = r, U.NODE_ENV !== "production" && U.NODE_ENV !== "test" && me && Eo(l, r), o.forEach((c) => n.push(c)), o = [];
    },
    use(l) {
      return this._a ? n.push(l) : o.push(l), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return U.NODE_ENV !== "production" && U.NODE_ENV !== "test" && me && typeof Proxy < "u" && r.use(wo), r;
}
function mn(e, t) {
  for (const n in t) {
    const o = t[n];
    if (!(n in e))
      continue;
    const r = e[n];
    _e(r) && _e(o) && !Ve(o) && !Et(o) ? e[n] = mn(r, o) : e[n] = o;
  }
  return e;
}
const gn = () => {
};
function It(e, t, n, o = gn) {
  e.push(t);
  const r = () => {
    const l = e.indexOf(t);
    l > -1 && (e.splice(l, 1), o());
  };
  return !n && Hn() && Fn(r), r;
}
function Pe(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const So = (e) => e(), At = Symbol(), rt = Symbol();
function ft(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, o) => e.set(o, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const o = t[n], r = e[n];
    _e(r) && _e(o) && e.hasOwnProperty(n) && !Ve(o) && !Et(o) ? e[n] = ft(r, o) : e[n] = o;
  }
  return e;
}
const Po = U.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function ko(e) {
  return !_e(e) || !e.hasOwnProperty(Po);
}
const { assign: ee } = Object;
function xt(e) {
  return !!(Ve(e) && e.effect);
}
function jt(e, t, n, o) {
  const { state: r, actions: l, getters: c } = t, a = n.state.value[e];
  let f;
  function y() {
    !a && (U.NODE_ENV === "production" || !o) && (n.state.value[e] = r ? r() : {});
    const h = U.NODE_ENV !== "production" && o ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Pt(Ke(r ? r() : {}).value)
    ) : Pt(n.state.value[e]);
    return ee(h, l, Object.keys(c || {}).reduce((u, b) => (U.NODE_ENV !== "production" && b in h && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${b}" in store "${e}".`), u[b] = be(te(() => {
      Me(n);
      const E = n._s.get(e);
      return c[b].call(E, E);
    })), u), {}));
  }
  return f = ht(e, y, t, n, o, !0), f;
}
function ht(e, t, n = {}, o, r, l) {
  let c;
  const a = ee({ actions: {} }, n);
  if (U.NODE_ENV !== "production" && !o._e.active)
    throw new Error("Pinia destroyed");
  const f = { deep: !0 };
  U.NODE_ENV !== "production" && (f.onTrigger = (I) => {
    y ? E = I : y == !1 && !T._hotUpdating && (Array.isArray(E) ? E.push(I) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let y, h, u = [], b = [], E;
  const j = o.state.value[e];
  !l && !j && (U.NODE_ENV === "production" || !r) && (o.state.value[e] = {});
  const p = Ke({});
  let g;
  function $(I) {
    let R;
    y = h = !1, U.NODE_ENV !== "production" && (E = []), typeof I == "function" ? (I(o.state.value[e]), R = {
      type: oe.patchFunction,
      storeId: e,
      events: E
    }) : (ft(o.state.value[e], I), R = {
      type: oe.patchObject,
      payload: I,
      storeId: e,
      events: E
    });
    const F = g = Symbol();
    lt().then(() => {
      g === F && (y = !0);
    }), h = !0, Pe(u, R, o.state.value[e]);
  }
  const x = l ? function() {
    const { state: R } = n, F = R ? R() : {};
    this.$patch((W) => {
      ee(W, F);
    });
  } : (
    /* istanbul ignore next */
    U.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : gn
  );
  function A() {
    c.stop(), u = [], b = [], o._s.delete(e);
  }
  const V = (I, R = "") => {
    if (At in I)
      return I[rt] = R, I;
    const F = function() {
      Me(o);
      const W = Array.from(arguments), Q = [], re = [];
      function le(q) {
        Q.push(q);
      }
      function ue(q) {
        re.push(q);
      }
      Pe(b, {
        args: W,
        name: F[rt],
        store: T,
        after: le,
        onError: ue
      });
      let J;
      try {
        J = I.apply(this && this.$id === e ? this : T, W);
      } catch (q) {
        throw Pe(re, q), q;
      }
      return J instanceof Promise ? J.then((q) => (Pe(Q, q), q)).catch((q) => (Pe(re, q), Promise.reject(q))) : (Pe(Q, J), J);
    };
    return F[At] = !0, F[rt] = R, F;
  }, B = /* @__PURE__ */ be({
    actions: {},
    getters: {},
    state: [],
    hotState: p
  }), M = {
    _p: o,
    // _s: scope,
    $id: e,
    $onAction: It.bind(null, b),
    $patch: $,
    $reset: x,
    $subscribe(I, R = {}) {
      const F = It(u, I, R.detached, () => W()), W = c.run(() => Qe(() => o.state.value[e], (Q) => {
        (R.flush === "sync" ? h : y) && I({
          storeId: e,
          type: oe.direct,
          events: E
        }, Q);
      }, ee({}, f, R)));
      return F;
    },
    $dispose: A
  }, T = tn(U.NODE_ENV !== "production" || U.NODE_ENV !== "production" && U.NODE_ENV !== "test" && me ? ee(
    {
      _hmrPayload: B,
      _customProperties: be(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    M
    // must be added later
    // setupStore
  ) : M);
  o._s.set(e, T);
  const K = (o._a && o._a.runWithContext || So)(() => o._e.run(() => (c = en()).run(() => t({ action: V }))));
  for (const I in K) {
    const R = K[I];
    if (Ve(R) && !xt(R) || Et(R))
      U.NODE_ENV !== "production" && r ? Be(p.value, I, tt(K, I)) : l || (j && ko(R) && (Ve(R) ? R.value = j[I] : ft(R, j[I])), o.state.value[e][I] = R), U.NODE_ENV !== "production" && B.state.push(I);
    else if (typeof R == "function") {
      const F = U.NODE_ENV !== "production" && r ? R : V(R, I);
      K[I] = F, U.NODE_ENV !== "production" && (B.actions[I] = R), a.actions[I] = R;
    } else U.NODE_ENV !== "production" && xt(R) && (B.getters[I] = l ? (
      // @ts-expect-error
      n.getters[I]
    ) : R, me && (K._getters || // @ts-expect-error: same
    (K._getters = be([]))).push(I));
  }
  if (ee(T, K), ee(De(T), K), Object.defineProperty(T, "$state", {
    get: () => U.NODE_ENV !== "production" && r ? p.value : o.state.value[e],
    set: (I) => {
      if (U.NODE_ENV !== "production" && r)
        throw new Error("cannot set hotState");
      $((R) => {
        ee(R, I);
      });
    }
  }), U.NODE_ENV !== "production" && (T._hotUpdate = be((I) => {
    T._hotUpdating = !0, I._hmrPayload.state.forEach((R) => {
      if (R in T.$state) {
        const F = I.$state[R], W = T.$state[R];
        typeof F == "object" && _e(F) && _e(W) ? mn(F, W) : I.$state[R] = W;
      }
      Be(T, R, tt(I.$state, R));
    }), Object.keys(T.$state).forEach((R) => {
      R in I.$state || ot(T, R);
    }), y = !1, h = !1, o.state.value[e] = tt(I._hmrPayload, "hotState"), h = !0, lt().then(() => {
      y = !0;
    });
    for (const R in I._hmrPayload.actions) {
      const F = I[R];
      Be(T, R, V(F, R));
    }
    for (const R in I._hmrPayload.getters) {
      const F = I._hmrPayload.getters[R], W = l ? (
        // special handling of options api
        te(() => (Me(o), F.call(T, T)))
      ) : F;
      Be(T, R, W);
    }
    Object.keys(T._hmrPayload.getters).forEach((R) => {
      R in I._hmrPayload.getters || ot(T, R);
    }), Object.keys(T._hmrPayload.actions).forEach((R) => {
      R in I._hmrPayload.actions || ot(T, R);
    }), T._hmrPayload = I._hmrPayload, T._getters = I._getters, T._hotUpdating = !1;
  })), U.NODE_ENV !== "production" && U.NODE_ENV !== "test" && me) {
    const I = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((R) => {
      Object.defineProperty(T, R, ee({ value: T[R] }, I));
    });
  }
  return o._p.forEach((I) => {
    if (U.NODE_ENV !== "production" && U.NODE_ENV !== "test" && me) {
      const R = c.run(() => I({
        store: T,
        app: o._a,
        pinia: o,
        options: a
      }));
      Object.keys(R || {}).forEach((F) => T._customProperties.add(F)), ee(T, R);
    } else
      ee(T, c.run(() => I({
        store: T,
        app: o._a,
        pinia: o,
        options: a
      })));
  }), U.NODE_ENV !== "production" && T.$state && typeof T.$state == "object" && typeof T.$state.constructor == "function" && !T.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${T.$id}".`), j && l && n.hydrate && n.hydrate(T.$state, j), y = !0, h = !0, T;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ri(e, t, n) {
  let o, r;
  const l = typeof t == "function";
  o = e, r = l ? n : t;
  function c(a, f) {
    const y = Bn();
    if (a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (U.NODE_ENV === "test" && xe && xe._testing ? null : a) || (y ? Ee(sn, null) : null), a && Me(a), U.NODE_ENV !== "production" && !xe)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    a = xe, a._s.has(o) || (l ? ht(o, t, r, a) : jt(o, r, a), U.NODE_ENV !== "production" && (c._pinia = a));
    const h = a._s.get(o);
    if (U.NODE_ENV !== "production" && f) {
      const u = "__hot:" + o, b = l ? ht(u, t, r, a, !0) : jt(u, ee({}, r), a, !0);
      f._hotUpdate(b), delete a.state.value[u], a._s.delete(u);
    }
    if (U.NODE_ENV !== "production" && me) {
      const u = bt();
      if (u && u.proxy && // avoid adding stores that are just built for hot module replacement
      !f) {
        const b = u.proxy, E = "_pStores" in b ? b._pStores : b._pStores = {};
        E[o] = h;
      }
    }
    return h;
  }
  return c.$id = o, c;
}
function Ro(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var vn = { exports: {} };
(function(e, t) {
  (function(n, o) {
    e.exports = o();
  })(self, function() {
    return (() => {
      var n = { d: (m, s) => {
        for (var d in s) n.o(s, d) && !n.o(m, d) && Object.defineProperty(m, d, { enumerable: !0, get: s[d] });
      }, o: (m, s) => Object.prototype.hasOwnProperty.call(m, s), r: (m) => {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(m, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(m, "__esModule", { value: !0 });
      } }, o = {};
      n.r(o), n.d(o, { Confetti: () => C, default: () => H });
      const r = function() {
        var m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : m + 1, d = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], i = parseFloat(m), _ = parseFloat(s), N = Math.random() * (_ - i) + i;
        return d ? Math.round(N) : N;
      };
      function l(m, s) {
        if (!(m instanceof s)) throw new TypeError("Cannot call a class as a function");
      }
      function c(m, s) {
        for (var d = 0; d < s.length; d++) {
          var i = s[d];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(m, i.key, i);
        }
      }
      var a = function() {
        function m() {
          var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ = i.color, N = _ === void 0 ? "blue" : _, k = i.size, w = k === void 0 ? 10 : k, O = i.dropRate, G = O === void 0 ? 10 : O;
          l(this, m), this.color = N, this.size = w, this.dropRate = G;
        }
        var s, d;
        return s = m, (d = [{ key: "setup", value: function(i) {
          var _ = i.canvas, N = i.wind, k = i.windPosCoef, w = i.windSpeedMax, O = i.count;
          return this.canvas = _, this.wind = N, this.windPosCoef = k, this.windSpeedMax = w, this.x = r(-35, this.canvas.width + 35), this.y = r(-30, -35), this.d = r(150) + 10, this.particleSize = r(this.size, 2 * this.size), this.tilt = r(10), this.tiltAngleIncremental = (r(0, 0.08) + 0.04) * (r() < 0.5 ? -1 : 1), this.tiltAngle = 0, this.angle = r(2 * Math.PI), this.count = O + 1, this.remove = !1, this;
        } }, { key: "update", value: function() {
          this.tiltAngle += this.tiltAngleIncremental * (0.2 * Math.cos(this.wind + (this.d + this.x + this.y) * this.windPosCoef) + 1), this.y += (Math.cos(this.angle + this.d) + parseInt(this.dropRate, 10)) / 2, this.x += (Math.sin(this.angle) + Math.cos(this.wind + (this.d + this.x + this.y) * this.windPosCoef)) * this.windSpeedMax, this.y += Math.sin(this.wind + (this.d + this.x + this.y) * this.windPosCoef) * this.windSpeedMax, this.tilt = 15 * Math.sin(this.tiltAngle - this.count / 3);
        } }, { key: "pastBottom", value: function() {
          return this.y > this.canvas.height;
        } }, { key: "draw", value: function() {
          this.canvas.ctx.fillStyle = this.color, this.canvas.ctx.beginPath(), this.canvas.ctx.setTransform(Math.cos(this.tiltAngle), Math.sin(this.tiltAngle), 0, 1, this.x, this.y);
        } }, { key: "kill", value: function() {
          this.remove = !0;
        } }]) && c(s.prototype, d), m;
      }();
      function f(m) {
        return f = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(s) {
          return typeof s;
        } : function(s) {
          return s && typeof Symbol == "function" && s.constructor === Symbol && s !== Symbol.prototype ? "symbol" : typeof s;
        }, f(m);
      }
      function y(m, s) {
        if (!(m instanceof s)) throw new TypeError("Cannot call a class as a function");
      }
      function h(m, s) {
        for (var d = 0; d < s.length; d++) {
          var i = s[d];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(m, i.key, i);
        }
      }
      function u(m, s, d) {
        return u = typeof Reflect < "u" && Reflect.get ? Reflect.get : function(i, _, N) {
          var k = function(O, G) {
            for (; !Object.prototype.hasOwnProperty.call(O, G) && (O = j(O)) !== null; ) ;
            return O;
          }(i, _);
          if (k) {
            var w = Object.getOwnPropertyDescriptor(k, _);
            return w.get ? w.get.call(N) : w.value;
          }
        }, u(m, s, d || m);
      }
      function b(m, s) {
        return b = Object.setPrototypeOf || function(d, i) {
          return d.__proto__ = i, d;
        }, b(m, s);
      }
      function E(m, s) {
        return !s || f(s) !== "object" && typeof s != "function" ? function(d) {
          if (d === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return d;
        }(m) : s;
      }
      function j(m) {
        return j = Object.setPrototypeOf ? Object.getPrototypeOf : function(s) {
          return s.__proto__ || Object.getPrototypeOf(s);
        }, j(m);
      }
      var p = function(m) {
        (function(w, O) {
          if (typeof O != "function" && O !== null) throw new TypeError("Super expression must either be null or a function");
          w.prototype = Object.create(O && O.prototype, { constructor: { value: w, writable: !0, configurable: !0 } }), O && b(w, O);
        })(k, m);
        var s, d, i, _, N = (i = k, _ = function() {
          if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
          if (typeof Proxy == "function") return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), !0;
          } catch {
            return !1;
          }
        }(), function() {
          var w, O = j(i);
          if (_) {
            var G = j(this).constructor;
            w = Reflect.construct(O, arguments, G);
          } else w = O.apply(this, arguments);
          return E(this, w);
        });
        function k() {
          return y(this, k), N.apply(this, arguments);
        }
        return s = k, (d = [{ key: "draw", value: function() {
          u(j(k.prototype), "draw", this).call(this), this.canvas.ctx.arc(0, 0, this.particleSize / 2, 0, 2 * Math.PI, !1), this.canvas.ctx.fill();
        } }]) && h(s.prototype, d), k;
      }(a);
      function g(m) {
        return g = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(s) {
          return typeof s;
        } : function(s) {
          return s && typeof Symbol == "function" && s.constructor === Symbol && s !== Symbol.prototype ? "symbol" : typeof s;
        }, g(m);
      }
      function $(m, s) {
        if (!(m instanceof s)) throw new TypeError("Cannot call a class as a function");
      }
      function x(m, s) {
        for (var d = 0; d < s.length; d++) {
          var i = s[d];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(m, i.key, i);
        }
      }
      function A(m, s, d) {
        return A = typeof Reflect < "u" && Reflect.get ? Reflect.get : function(i, _, N) {
          var k = function(O, G) {
            for (; !Object.prototype.hasOwnProperty.call(O, G) && (O = M(O)) !== null; ) ;
            return O;
          }(i, _);
          if (k) {
            var w = Object.getOwnPropertyDescriptor(k, _);
            return w.get ? w.get.call(N) : w.value;
          }
        }, A(m, s, d || m);
      }
      function V(m, s) {
        return V = Object.setPrototypeOf || function(d, i) {
          return d.__proto__ = i, d;
        }, V(m, s);
      }
      function B(m, s) {
        return !s || g(s) !== "object" && typeof s != "function" ? function(d) {
          if (d === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return d;
        }(m) : s;
      }
      function M(m) {
        return M = Object.setPrototypeOf ? Object.getPrototypeOf : function(s) {
          return s.__proto__ || Object.getPrototypeOf(s);
        }, M(m);
      }
      var T = function(m) {
        (function(w, O) {
          if (typeof O != "function" && O !== null) throw new TypeError("Super expression must either be null or a function");
          w.prototype = Object.create(O && O.prototype, { constructor: { value: w, writable: !0, configurable: !0 } }), O && V(w, O);
        })(k, m);
        var s, d, i, _, N = (i = k, _ = function() {
          if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
          if (typeof Proxy == "function") return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), !0;
          } catch {
            return !1;
          }
        }(), function() {
          var w, O = M(i);
          if (_) {
            var G = M(this).constructor;
            w = Reflect.construct(O, arguments, G);
          } else w = O.apply(this, arguments);
          return B(this, w);
        });
        function k() {
          return $(this, k), N.apply(this, arguments);
        }
        return s = k, (d = [{ key: "draw", value: function() {
          A(M(k.prototype), "draw", this).call(this), this.canvas.ctx.fillRect(0, 0, this.particleSize, this.particleSize / 2);
        } }]) && x(s.prototype, d), k;
      }(a);
      function we(m) {
        return we = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(s) {
          return typeof s;
        } : function(s) {
          return s && typeof Symbol == "function" && s.constructor === Symbol && s !== Symbol.prototype ? "symbol" : typeof s;
        }, we(m);
      }
      function K(m, s) {
        if (!(m instanceof s)) throw new TypeError("Cannot call a class as a function");
      }
      function I(m, s) {
        for (var d = 0; d < s.length; d++) {
          var i = s[d];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(m, i.key, i);
        }
      }
      function R(m, s, d) {
        return R = typeof Reflect < "u" && Reflect.get ? Reflect.get : function(i, _, N) {
          var k = function(O, G) {
            for (; !Object.prototype.hasOwnProperty.call(O, G) && (O = Q(O)) !== null; ) ;
            return O;
          }(i, _);
          if (k) {
            var w = Object.getOwnPropertyDescriptor(k, _);
            return w.get ? w.get.call(N) : w.value;
          }
        }, R(m, s, d || m);
      }
      function F(m, s) {
        return F = Object.setPrototypeOf || function(d, i) {
          return d.__proto__ = i, d;
        }, F(m, s);
      }
      function W(m, s) {
        return !s || we(s) !== "object" && typeof s != "function" ? function(d) {
          if (d === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return d;
        }(m) : s;
      }
      function Q(m) {
        return Q = Object.setPrototypeOf ? Object.getPrototypeOf : function(s) {
          return s.__proto__ || Object.getPrototypeOf(s);
        }, Q(m);
      }
      var re = function(m) {
        (function(w, O) {
          if (typeof O != "function" && O !== null) throw new TypeError("Super expression must either be null or a function");
          w.prototype = Object.create(O && O.prototype, { constructor: { value: w, writable: !0, configurable: !0 } }), O && F(w, O);
        })(k, m);
        var s, d, i, _, N = (i = k, _ = function() {
          if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
          if (typeof Proxy == "function") return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), !0;
          } catch {
            return !1;
          }
        }(), function() {
          var w, O = Q(i);
          if (_) {
            var G = Q(this).constructor;
            w = Reflect.construct(O, arguments, G);
          } else w = O.apply(this, arguments);
          return W(this, w);
        });
        function k() {
          return K(this, k), N.apply(this, arguments);
        }
        return s = k, (d = [{ key: "draw", value: function() {
          var w = this;
          R(Q(k.prototype), "draw", this).call(this);
          var O = function(G, Ze, et, Mn, Ln, Un) {
            w.canvas.ctx.bezierCurveTo(G * (w.particleSize / 200), Ze * (w.particleSize / 200), et * (w.particleSize / 200), Mn * (w.particleSize / 200), Ln * (w.particleSize / 200), Un * (w.particleSize / 200));
          };
          this.canvas.ctx.moveTo(37.5 / this.particleSize, 20 / this.particleSize), O(75, 37, 70, 25, 50, 25), O(20, 25, 20, 62.5, 20, 62.5), O(20, 80, 40, 102, 75, 120), O(110, 102, 130, 80, 130, 62.5), O(130, 62.5, 130, 25, 100, 25), O(85, 25, 75, 37, 75, 40), this.canvas.ctx.fill();
        } }]) && I(s.prototype, d), k;
      }(a);
      function le(m) {
        return le = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(s) {
          return typeof s;
        } : function(s) {
          return s && typeof Symbol == "function" && s.constructor === Symbol && s !== Symbol.prototype ? "symbol" : typeof s;
        }, le(m);
      }
      function ue(m, s) {
        for (var d = 0; d < s.length; d++) {
          var i = s[d];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(m, i.key, i);
        }
      }
      function J(m, s, d) {
        return J = typeof Reflect < "u" && Reflect.get ? Reflect.get : function(i, _, N) {
          var k = function(O, G) {
            for (; !Object.prototype.hasOwnProperty.call(O, G) && (O = ie(O)) !== null; ) ;
            return O;
          }(i, _);
          if (k) {
            var w = Object.getOwnPropertyDescriptor(k, _);
            return w.get ? w.get.call(N) : w.value;
          }
        }, J(m, s, d || m);
      }
      function q(m, s) {
        return q = Object.setPrototypeOf || function(d, i) {
          return d.__proto__ = i, d;
        }, q(m, s);
      }
      function Te(m, s) {
        return !s || le(s) !== "object" && typeof s != "function" ? function(d) {
          if (d === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return d;
        }(m) : s;
      }
      function ie(m) {
        return ie = Object.setPrototypeOf ? Object.getPrototypeOf : function(s) {
          return s.__proto__ || Object.getPrototypeOf(s);
        }, ie(m);
      }
      var Ce = function(m) {
        (function(w, O) {
          if (typeof O != "function" && O !== null) throw new TypeError("Super expression must either be null or a function");
          w.prototype = Object.create(O && O.prototype, { constructor: { value: w, writable: !0, configurable: !0 } }), O && q(w, O);
        })(k, m);
        var s, d, i, _, N = (i = k, _ = function() {
          if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
          if (typeof Proxy == "function") return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), !0;
          } catch {
            return !1;
          }
        }(), function() {
          var w, O = ie(i);
          if (_) {
            var G = ie(this).constructor;
            w = Reflect.construct(O, arguments, G);
          } else w = O.apply(this, arguments);
          return Te(this, w);
        });
        function k(w, O) {
          var G;
          return function(Ze, et) {
            if (!(Ze instanceof et)) throw new TypeError("Cannot call a class as a function");
          }(this, k), (G = N.call(this, w)).imgEl = O, G;
        }
        return s = k, (d = [{ key: "draw", value: function() {
          J(ie(k.prototype), "draw", this).call(this), this.canvas.ctx.drawImage(this.imgEl, 0, 0, this.particleSize, this.particleSize);
        } }]) && ue(s.prototype, d), k;
      }(a);
      function $e(m, s) {
        for (var d = 0; d < s.length; d++) {
          var i = s[d];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(m, i.key, i);
        }
      }
      var Oe = function() {
        function m() {
          (function(i, _) {
            if (!(i instanceof _)) throw new TypeError("Cannot call a class as a function");
          })(this, m), this.cachedImages = {};
        }
        var s, d;
        return s = m, d = [{ key: "createImageElement", value: function(i) {
          var _ = document.createElement("img");
          return _.setAttribute("src", i), _;
        } }, { key: "getImageElement", value: function(i) {
          return this.cachedImages[i] || (this.cachedImages[i] = this.createImageElement(i)), this.cachedImages[i];
        } }, { key: "getRandomParticle", value: function() {
          var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ = i.particles || [];
          return _.length < 1 ? {} : _[Math.floor(Math.random() * _.length)];
        } }, { key: "getDefaults", value: function() {
          var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          return { type: i.defaultType || "circle", size: i.defaultSize || 10, dropRate: i.defaultDropRate || 10, colors: i.defaultColors || ["DodgerBlue", "OliveDrab", "Gold", "pink", "SlateBlue", "lightblue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"], url: null };
        } }, { key: "create", value: function(i) {
          var _ = this.getDefaults(i), N = this.getRandomParticle(i), k = Object.assign(_, N), w = r(0, k.colors.length - 1, !0);
          if (k.color = k.colors[w], k.type === "circle") return new p(k);
          if (k.type === "rect") return new T(k);
          if (k.type === "heart") return new re(k);
          if (k.type === "image") return new Ce(k, this.getImageElement(k.url));
          throw Error('Unknown particle type: "'.concat(k.type, '"'));
        } }], d && $e(s.prototype, d), m;
      }();
      function Ue(m, s) {
        for (var d = 0; d < s.length; d++) {
          var i = s[d];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(m, i.key, i);
        }
      }
      var fe = function() {
        function m(i) {
          (function(_, N) {
            if (!(_ instanceof N)) throw new TypeError("Cannot call a class as a function");
          })(this, m), this.items = [], this.pool = [], this.particleOptions = i, this.particleFactory = new Oe();
        }
        var s, d;
        return s = m, (d = [{ key: "update", value: function() {
          var i, _ = this, N = [], k = [];
          this.items.forEach(function(w) {
            w.update(), w.pastBottom() ? w.remove || (w.setup(_.particleOptions), N.push(w)) : k.push(w);
          }), (i = this.pool).push.apply(i, N), this.items = k;
        } }, { key: "draw", value: function() {
          this.items.forEach(function(i) {
            return i.draw();
          });
        } }, { key: "add", value: function() {
          this.pool.length > 0 ? this.items.push(this.pool.pop().setup(this.particleOptions)) : this.items.push(this.particleFactory.create(this.particleOptions).setup(this.particleOptions));
        } }, { key: "refresh", value: function() {
          this.items.forEach(function(i) {
            i.kill();
          }), this.pool = [];
        } }]) && Ue(s.prototype, d), m;
      }();
      function v(m, s) {
        for (var d = 0; d < s.length; d++) {
          var i = s[d];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(m, i.key, i);
        }
      }
      var P = function() {
        function m(_) {
          (function(k, w) {
            if (!(k instanceof w)) throw new TypeError("Cannot call a class as a function");
          })(this, m);
          var N = "confetti-canvas";
          if (_ && !(_ instanceof HTMLCanvasElement)) throw new Error("Element is not a valid HTMLCanvasElement");
          this.isDefault = !_, this.canvas = _ || document.getElementById(N) || m.createDefaultCanvas(N), this.ctx = this.canvas.getContext("2d");
        }
        var s, d, i;
        return s = m, i = [{ key: "createDefaultCanvas", value: function(_) {
          var N = document.createElement("canvas");
          return N.style.display = "block", N.style.position = "fixed", N.style.pointerEvents = "none", N.style.top = 0, N.style.width = "100vw", N.style.height = "100vh", N.id = _, document.querySelector("body").appendChild(N), N;
        } }], (d = [{ key: "width", get: function() {
          return this.canvas.width;
        } }, { key: "height", get: function() {
          return this.canvas.height;
        } }, { key: "clear", value: function() {
          this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.clearRect(0, 0, this.width, this.height);
        } }, { key: "updateDimensions", value: function() {
          this.isDefault && (this.width === window.innerWidth && this.height === window.innerHeight || (this.canvas.width = window.innerWidth, this.canvas.height = window.innerHeight));
        } }]) && v(s.prototype, d), i && v(s, i), m;
      }();
      function S(m, s) {
        for (var d = 0; d < s.length; d++) {
          var i = s[d];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(m, i.key, i);
        }
      }
      var C = function() {
        function m() {
          (function(i, _) {
            if (!(i instanceof _)) throw new TypeError("Cannot call a class as a function");
          })(this, m), this.setDefaults();
        }
        var s, d;
        return s = m, d = [{ key: "setDefaults", value: function() {
          this.killed = !1, this.framesSinceDrop = 0, this.canvas = null, this.canvasEl = null, this.W = 0, this.H = 0, this.particleManager = null, this.particlesPerFrame = 0, this.wind = 0, this.windSpeed = 1, this.windSpeedMax = 1, this.windChange = 0.01, this.windPosCoef = 2e-3, this.animationId = null;
        } }, { key: "getParticleOptions", value: function(i) {
          var _ = { canvas: this.canvas, W: this.W, H: this.H, wind: this.wind, windPosCoef: this.windPosCoef, windSpeedMax: this.windSpeedMax, count: 0 };
          return Object.assign(_, i), _;
        } }, { key: "createParticles", value: function() {
          var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ = this.getParticleOptions(i);
          this.particleManager = new fe(_);
        } }, { key: "getCanvasElementFromOptions", value: function(i) {
          var _ = i.canvasId, N = i.canvasElement, k = N;
          if (N && !(N instanceof HTMLCanvasElement)) throw new Error("Invalid options: canvasElement is not a valid HTMLCanvasElement");
          if (_ && N) throw new Error("Invalid options: canvasId and canvasElement are mutually exclusive");
          if (_ && !k && (k = document.getElementById(_)), _ && !(k instanceof HTMLCanvasElement)) throw new Error('Invalid options: element with id "'.concat(_, '" is not a valid HTMLCanvasElement'));
          return k;
        } }, { key: "start", value: function() {
          var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          this.remove();
          var _ = this.getCanvasElementFromOptions(i);
          this.canvas = new P(_), this.canvasEl = _, this.createParticles(i), this.setGlobalOptions(i), this.animationId = requestAnimationFrame(this.mainLoop.bind(this));
        } }, { key: "setGlobalOptions", value: function(i) {
          this.particlesPerFrame = i.particlesPerFrame || 2, this.windSpeedMax = i.windSpeedMax || 1;
        } }, { key: "stop", value: function() {
          this.killed = !0, this.particlesPerFrame = 0;
        } }, { key: "update", value: function(i) {
          var _ = this.getCanvasElementFromOptions(i);
          this.canvas && _ !== this.canvasEl ? this.start(i) : (this.setGlobalOptions(i), this.particleManager && (this.particleManager.particleOptions = this.getParticleOptions(i), this.particleManager.refresh()));
        } }, { key: "remove", value: function() {
          this.stop(), this.animationId && cancelAnimationFrame(this.animationId), this.canvas && this.canvas.clear(), this.setDefaults();
        } }, { key: "mainLoop", value: function(i) {
          this.canvas.updateDimensions(), this.canvas.clear(), this.windSpeed = Math.sin(i / 8e3) * this.windSpeedMax, this.wind = this.particleManager.particleOptions.wind += this.windChange;
          for (var _ = this.framesSinceDrop * this.particlesPerFrame; _ >= 1; ) this.particleManager.add(), _ -= 1, this.framesSinceDrop = 0;
          this.particleManager.update(), this.particleManager.draw(), this.killed && !this.particleManager.items.length || (this.animationId = requestAnimationFrame(this.mainLoop.bind(this))), this.framesSinceDrop += 1;
        } }], d && S(s.prototype, d), m;
      }();
      const H = { install: function(m, s) {
        if (!this.installed) {
          this.installed = !0;
          try {
            m.config.globalProperties.$confetti = new C(s);
          } catch {
            m.prototype.$confetti = new C(s);
          }
        }
      } };
      return o;
    })();
  });
})(vn);
var No = vn.exports;
const To = /* @__PURE__ */ Ro(No);
var D = {};
const ce = typeof document < "u";
function yn(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function Co(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || // support CF with dynamic imports that do not
  // add the Module string tag
  e.default && yn(e.default);
}
const z = Object.assign;
function it(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = Z(r) ? r.map(e) : e(r);
  }
  return n;
}
const je = () => {
}, Z = Array.isArray;
function L(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const bn = /#/g, $o = /&/g, Io = /\//g, Ao = /=/g, xo = /\?/g, En = /\+/g, jo = /%5B/g, Do = /%5D/g, _n = /%5E/g, Vo = /%60/g, wn = /%7B/g, Mo = /%7C/g, On = /%7D/g, Lo = /%20/g;
function St(e) {
  return encodeURI("" + e).replace(Mo, "|").replace(jo, "[").replace(Do, "]");
}
function Uo(e) {
  return St(e).replace(wn, "{").replace(On, "}").replace(_n, "^");
}
function dt(e) {
  return St(e).replace(En, "%2B").replace(Lo, "+").replace(bn, "%23").replace($o, "%26").replace(Vo, "`").replace(wn, "{").replace(On, "}").replace(_n, "^");
}
function Bo(e) {
  return dt(e).replace(Ao, "%3D");
}
function Ho(e) {
  return St(e).replace(bn, "%23").replace(xo, "%3F");
}
function Fo(e) {
  return e == null ? "" : Ho(e).replace(Io, "%2F");
}
function Re(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    D.NODE_ENV !== "production" && L(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const zo = /\/$/, Go = (e) => e.replace(zo, "");
function st(e, t, n = "/") {
  let o, r = {}, l = "", c = "";
  const a = t.indexOf("#");
  let f = t.indexOf("?");
  return a < f && a >= 0 && (f = -1), f > -1 && (o = t.slice(0, f), l = t.slice(f + 1, a > -1 ? a : t.length), r = e(l)), a > -1 && (o = o || t.slice(0, a), c = t.slice(a, t.length)), o = Yo(o ?? t, n), {
    fullPath: o + (l && "?") + l + c,
    path: o,
    query: r,
    hash: Re(c)
  };
}
function Wo(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Dt(e, t, n) {
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && ve(t.matched[o], n.matched[r]) && Sn(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function ve(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Sn(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!qo(e[n], t[n]))
      return !1;
  return !0;
}
function qo(e, t) {
  return Z(e) ? Vt(e, t) : Z(t) ? Vt(t, e) : e === t;
}
function Vt(e, t) {
  return Z(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function Yo(e, t) {
  if (e.startsWith("/"))
    return e;
  if (D.NODE_ENV !== "production" && !t.startsWith("/"))
    return L(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let l = n.length - 1, c, a;
  for (c = 0; c < o.length; c++)
    if (a = o[c], a !== ".")
      if (a === "..")
        l > 1 && l--;
      else
        break;
  return n.slice(0, l).join("/") + "/" + o.slice(c).join("/");
}
const he = {
  path: "/",
  // TODO: could we use a symbol in the future?
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
var Le;
(function(e) {
  e.pop = "pop", e.push = "push";
})(Le || (Le = {}));
var Ye;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(Ye || (Ye = {}));
const at = "";
function Xo(e) {
  if (!e)
    if (ce) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Go(e);
}
const Ko = /^[^#]+#/;
function Qo(e, t) {
  return e.replace(Ko, "#") + t;
}
function Jo(e, t) {
  const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0)
  };
}
const Zo = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function er(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (D.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const l = document.querySelector(e.el);
        if (o && l) {
          L(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        L(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const r = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r) {
      D.NODE_ENV !== "production" && L(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = Jo(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Mt(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const pt = /* @__PURE__ */ new Map();
function tr(e, t) {
  pt.set(e, t);
}
function nr(e) {
  const t = pt.get(e);
  return pt.delete(e), t;
}
function or(e = "") {
  let t = [], n = [at], o = 0;
  e = Xo(e);
  function r(a) {
    o++, o !== n.length && n.splice(o), n.push(a);
  }
  function l(a, f, { direction: y, delta: h }) {
    const u = {
      direction: y,
      delta: h,
      type: Le.pop
    };
    for (const b of t)
      b(a, f, u);
  }
  const c = {
    // rewritten by Object.defineProperty
    location: at,
    // TODO: should be kept in queue
    state: {},
    base: e,
    createHref: Qo.bind(null, e),
    replace(a) {
      n.splice(o--, 1), r(a);
    },
    push(a, f) {
      r(a);
    },
    listen(a) {
      return t.push(a), () => {
        const f = t.indexOf(a);
        f > -1 && t.splice(f, 1);
      };
    },
    destroy() {
      t = [], n = [at], o = 0;
    },
    go(a, f = !0) {
      const y = this.location, h = (
        // we are considering delta === 0 going forward, but in abstract mode
        // using 0 for the delta doesn't make sense like it does in html5 where
        // it reloads the page
        a < 0 ? Ye.back : Ye.forward
      );
      o = Math.max(0, Math.min(o + a, n.length - 1)), f && l(this.location, y, {
        direction: h,
        delta: a
      });
    }
  };
  return Object.defineProperty(c, "location", {
    enumerable: !0,
    get: () => n[o]
  }), c;
}
function Xe(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function Pn(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const mt = Symbol(D.NODE_ENV !== "production" ? "navigation failure" : "");
var Lt;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Lt || (Lt = {}));
const rr = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${sr(t)}" via a navigation guard.`;
  },
  4({ from: e, to: t }) {
    return `Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`;
  },
  8({ from: e, to: t }) {
    return `Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`;
  },
  16({ from: e, to: t }) {
    return `Avoided redundant navigation to current location: "${e.fullPath}".`;
  }
};
function Ne(e, t) {
  return D.NODE_ENV !== "production" ? z(new Error(rr[e](t)), {
    type: e,
    [mt]: !0
  }, t) : z(new Error(), {
    type: e,
    [mt]: !0
  }, t);
}
function ae(e, t) {
  return e instanceof Error && mt in e && (t == null || !!(e.type & t));
}
const ir = ["params", "query", "hash"];
function sr(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of ir)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Ut = "[^/]+?", ar = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, cr = /[.+*?^${}()[\]/\\]/g;
function lr(e, t) {
  const n = z({}, ar, t), o = [];
  let r = n.start ? "^" : "";
  const l = [];
  for (const y of e) {
    const h = y.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !y.length && (r += "/");
    for (let u = 0; u < y.length; u++) {
      const b = y[u];
      let E = 40 + (n.sensitive ? 0.25 : 0);
      if (b.type === 0)
        u || (r += "/"), r += b.value.replace(cr, "\\$&"), E += 40;
      else if (b.type === 1) {
        const { value: j, repeatable: p, optional: g, regexp: $ } = b;
        l.push({
          name: j,
          repeatable: p,
          optional: g
        });
        const x = $ || Ut;
        if (x !== Ut) {
          E += 10;
          try {
            new RegExp(`(${x})`);
          } catch (V) {
            throw new Error(`Invalid custom RegExp for param "${j}" (${x}): ` + V.message);
          }
        }
        let A = p ? `((?:${x})(?:/(?:${x}))*)` : `(${x})`;
        u || (A = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        g && y.length < 2 ? `(?:/${A})` : "/" + A), g && (A += "?"), r += A, E += 20, g && (E += -8), p && (E += -20), x === ".*" && (E += -50);
      }
      h.push(E);
    }
    o.push(h);
  }
  if (n.strict && n.end) {
    const y = o.length - 1;
    o[y][o[y].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && !r.endsWith("/") && (r += "(?:/|$)");
  const c = new RegExp(r, n.sensitive ? "" : "i");
  function a(y) {
    const h = y.match(c), u = {};
    if (!h)
      return null;
    for (let b = 1; b < h.length; b++) {
      const E = h[b] || "", j = l[b - 1];
      u[j.name] = E && j.repeatable ? E.split("/") : E;
    }
    return u;
  }
  function f(y) {
    let h = "", u = !1;
    for (const b of e) {
      (!u || !h.endsWith("/")) && (h += "/"), u = !1;
      for (const E of b)
        if (E.type === 0)
          h += E.value;
        else if (E.type === 1) {
          const { value: j, repeatable: p, optional: g } = E, $ = j in y ? y[j] : "";
          if (Z($) && !p)
            throw new Error(`Provided param "${j}" is an array but it is not repeatable (* or + modifiers)`);
          const x = Z($) ? $.join("/") : $;
          if (!x)
            if (g)
              b.length < 2 && (h.endsWith("/") ? h = h.slice(0, -1) : u = !0);
            else
              throw new Error(`Missing required param "${j}"`);
          h += x;
        }
    }
    return h || "/";
  }
  return {
    re: c,
    score: o,
    keys: l,
    parse: a,
    stringify: f
  };
}
function ur(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function kn(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const l = ur(o[n], r[n]);
    if (l)
      return l;
    n++;
  }
  if (Math.abs(r.length - o.length) === 1) {
    if (Bt(o))
      return 1;
    if (Bt(r))
      return -1;
  }
  return r.length - o.length;
}
function Bt(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const fr = {
  type: 0,
  value: ""
}, hr = /[a-zA-Z0-9_]/;
function dr(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[fr]];
  if (!e.startsWith("/"))
    throw new Error(D.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(E) {
    throw new Error(`ERR (${n})/"${y}": ${E}`);
  }
  let n = 0, o = n;
  const r = [];
  let l;
  function c() {
    l && r.push(l), l = [];
  }
  let a = 0, f, y = "", h = "";
  function u() {
    y && (n === 0 ? l.push({
      type: 0,
      value: y
    }) : n === 1 || n === 2 || n === 3 ? (l.length > 1 && (f === "*" || f === "+") && t(`A repeatable param (${y}) must be alone in its segment. eg: '/:ids+.`), l.push({
      type: 1,
      value: y,
      regexp: h,
      repeatable: f === "*" || f === "+",
      optional: f === "*" || f === "?"
    })) : t("Invalid state to consume buffer"), y = "");
  }
  function b() {
    y += f;
  }
  for (; a < e.length; ) {
    if (f = e[a++], f === "\\" && n !== 2) {
      o = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        f === "/" ? (y && u(), c()) : f === ":" ? (u(), n = 1) : b();
        break;
      case 4:
        b(), n = o;
        break;
      case 1:
        f === "(" ? n = 2 : hr.test(f) ? b() : (u(), n = 0, f !== "*" && f !== "?" && f !== "+" && a--);
        break;
      case 2:
        f === ")" ? h[h.length - 1] == "\\" ? h = h.slice(0, -1) + f : n = 3 : h += f;
        break;
      case 3:
        u(), n = 0, f !== "*" && f !== "?" && f !== "+" && a--, h = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${y}"`), u(), c(), r;
}
function pr(e, t, n) {
  const o = lr(dr(e.path), n);
  if (D.NODE_ENV !== "production") {
    const l = /* @__PURE__ */ new Set();
    for (const c of o.keys)
      l.has(c.name) && L(`Found duplicated params with name "${c.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), l.add(c.name);
  }
  const r = z(o, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function mr(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = Gt({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(u) {
    return o.get(u);
  }
  function l(u, b, E) {
    const j = !E, p = Ft(u);
    D.NODE_ENV !== "production" && br(p, b), p.aliasOf = E && E.record;
    const g = Gt(t, u), $ = [p];
    if ("alias" in u) {
      const V = typeof u.alias == "string" ? [u.alias] : u.alias;
      for (const B of V)
        $.push(
          // we need to normalize again to ensure the `mods` property
          // being non enumerable
          Ft(z({}, p, {
            // this allows us to hold a copy of the `components` option
            // so that async components cache is hold on the original record
            components: E ? E.record.components : p.components,
            path: B,
            // we might be the child of an alias
            aliasOf: E ? E.record : p
            // the aliases are always of the same kind as the original since they
            // are defined on the same record
          }))
        );
    }
    let x, A;
    for (const V of $) {
      const { path: B } = V;
      if (b && B[0] !== "/") {
        const M = b.record.path, T = M[M.length - 1] === "/" ? "" : "/";
        V.path = b.record.path + (B && T + B);
      }
      if (D.NODE_ENV !== "production" && V.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes.`);
      if (x = pr(V, b, g), D.NODE_ENV !== "production" && b && B[0] === "/" && _r(x, b), E ? (E.alias.push(x), D.NODE_ENV !== "production" && yr(E, x)) : (A = A || x, A !== x && A.alias.push(x), j && u.name && !zt(x) && (D.NODE_ENV !== "production" && Er(u, b), c(u.name))), Rn(x) && f(x), p.children) {
        const M = p.children;
        for (let T = 0; T < M.length; T++)
          l(M[T], x, E && E.children[T]);
      }
      E = E || x;
    }
    return A ? () => {
      c(A);
    } : je;
  }
  function c(u) {
    if (Pn(u)) {
      const b = o.get(u);
      b && (o.delete(u), n.splice(n.indexOf(b), 1), b.children.forEach(c), b.alias.forEach(c));
    } else {
      const b = n.indexOf(u);
      b > -1 && (n.splice(b, 1), u.record.name && o.delete(u.record.name), u.children.forEach(c), u.alias.forEach(c));
    }
  }
  function a() {
    return n;
  }
  function f(u) {
    const b = wr(u, n);
    n.splice(b, 0, u), u.record.name && !zt(u) && o.set(u.record.name, u);
  }
  function y(u, b) {
    let E, j = {}, p, g;
    if ("name" in u && u.name) {
      if (E = o.get(u.name), !E)
        throw Ne(1, {
          location: u
        });
      if (D.NODE_ENV !== "production") {
        const A = Object.keys(u.params || {}).filter((V) => !E.keys.find((B) => B.name === V));
        A.length && L(`Discarded invalid param(s) "${A.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      g = E.record.name, j = z(
        // paramsFromLocation is a new object
        Ht(
          b.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          E.keys.filter((A) => !A.optional).concat(E.parent ? E.parent.keys.filter((A) => A.optional) : []).map((A) => A.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        u.params && Ht(u.params, E.keys.map((A) => A.name))
      ), p = E.stringify(j);
    } else if (u.path != null)
      p = u.path, D.NODE_ENV !== "production" && !p.startsWith("/") && L(`The Matcher cannot resolve relative paths but received "${p}". Unless you directly called \`matcher.resolve("${p}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), E = n.find((A) => A.re.test(p)), E && (j = E.parse(p), g = E.record.name);
    else {
      if (E = b.name ? o.get(b.name) : n.find((A) => A.re.test(b.path)), !E)
        throw Ne(1, {
          location: u,
          currentLocation: b
        });
      g = E.record.name, j = z({}, b.params, u.params), p = E.stringify(j);
    }
    const $ = [];
    let x = E;
    for (; x; )
      $.unshift(x.record), x = x.parent;
    return {
      name: g,
      path: p,
      params: j,
      matched: $,
      meta: vr($)
    };
  }
  e.forEach((u) => l(u));
  function h() {
    n.length = 0, o.clear();
  }
  return {
    addRoute: l,
    resolve: y,
    removeRoute: c,
    clearRoutes: h,
    getRoutes: a,
    getRecordMatcher: r
  };
}
function Ht(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function Ft(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: gr(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    // must be declared afterwards
    // mods: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", {
    value: {}
  }), t;
}
function gr(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const o in e.components)
      t[o] = typeof n == "object" ? n[o] : n;
  return t;
}
function zt(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function vr(e) {
  return e.reduce((t, n) => z(t, n.meta), {});
}
function Gt(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function gt(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function yr(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(gt.bind(null, n)))
      return L(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(gt.bind(null, n)))
      return L(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function br(e, t) {
  t && t.record.name && !e.name && !e.path && L(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function Er(e, t) {
  for (let n = t; n; n = n.parent)
    if (n.record.name === e.name)
      throw new Error(`A route named "${String(e.name)}" has been added as a ${t === n ? "child" : "descendant"} of a route with the same name. Route names must be unique and a nested route cannot use the same name as an ancestor.`);
}
function _r(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(gt.bind(null, n)))
      return L(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function wr(e, t) {
  let n = 0, o = t.length;
  for (; n !== o; ) {
    const l = n + o >> 1;
    kn(e, t[l]) < 0 ? o = l : n = l + 1;
  }
  const r = Or(e);
  return r && (o = t.lastIndexOf(r, o - 1), D.NODE_ENV !== "production" && o < 0 && L(`Finding ancestor route "${r.record.path}" failed for "${e.record.path}"`)), o;
}
function Or(e) {
  let t = e;
  for (; t = t.parent; )
    if (Rn(t) && kn(e, t) === 0)
      return t;
}
function Rn({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function Sr(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const l = o[r].replace(En, " "), c = l.indexOf("="), a = Re(c < 0 ? l : l.slice(0, c)), f = c < 0 ? null : Re(l.slice(c + 1));
    if (a in t) {
      let y = t[a];
      Z(y) || (y = t[a] = [y]), y.push(f);
    } else
      t[a] = f;
  }
  return t;
}
function Wt(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = Bo(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Z(o) ? o.map((l) => l && dt(l)) : [o && dt(o)]).forEach((l) => {
      l !== void 0 && (t += (t.length ? "&" : "") + n, l != null && (t += "=" + l));
    });
  }
  return t;
}
function Pr(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = Z(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const kr = Symbol(D.NODE_ENV !== "production" ? "router view location matched" : ""), qt = Symbol(D.NODE_ENV !== "production" ? "router view depth" : ""), Je = Symbol(D.NODE_ENV !== "production" ? "router" : ""), Nn = Symbol(D.NODE_ENV !== "production" ? "route location" : ""), vt = Symbol(D.NODE_ENV !== "production" ? "router view location" : "");
function Ie() {
  let e = [];
  function t(o) {
    return e.push(o), () => {
      const r = e.indexOf(o);
      r > -1 && e.splice(r, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n
  };
}
function de(e, t, n, o, r, l = (c) => c()) {
  const c = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((a, f) => {
    const y = (b) => {
      b === !1 ? f(Ne(4, {
        from: n,
        to: t
      })) : b instanceof Error ? f(b) : Xe(b) ? f(Ne(2, {
        from: t,
        to: b
      })) : (c && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === c && typeof b == "function" && c.push(b), a());
    }, h = l(() => e.call(o && o.instances[r], t, n, D.NODE_ENV !== "production" ? Rr(y, t, n) : y));
    let u = Promise.resolve(h);
    if (e.length < 3 && (u = u.then(y)), D.NODE_ENV !== "production" && e.length > 2) {
      const b = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof h == "object" && "then" in h)
        u = u.then((E) => y._called ? E : (L(b), Promise.reject(new Error("Invalid navigation guard"))));
      else if (h !== void 0 && !y._called) {
        L(b), f(new Error("Invalid navigation guard"));
        return;
      }
    }
    u.catch((b) => f(b));
  });
}
function Rr(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && L(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function ct(e, t, n, o, r = (l) => l()) {
  const l = [];
  for (const c of e) {
    D.NODE_ENV !== "production" && !c.components && !c.children.length && L(`Record with path "${c.path}" is either missing a "component(s)" or "children" property.`);
    for (const a in c.components) {
      let f = c.components[a];
      if (D.NODE_ENV !== "production") {
        if (!f || typeof f != "object" && typeof f != "function")
          throw L(`Component "${a}" in record with path "${c.path}" is not a valid component. Received "${String(f)}".`), new Error("Invalid route component");
        if ("then" in f) {
          L(`Component "${a}" in record with path "${c.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const y = f;
          f = () => y;
        } else f.__asyncLoader && // warn only once per component
        !f.__warnedDefineAsync && (f.__warnedDefineAsync = !0, L(`Component "${a}" in record with path "${c.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !c.instances[a]))
        if (yn(f)) {
          const h = (f.__vccOpts || f)[t];
          h && l.push(de(h, n, o, c, a, r));
        } else {
          let y = f();
          D.NODE_ENV !== "production" && !("catch" in y) && (L(`Component "${a}" in record with path "${c.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), y = Promise.resolve(y)), l.push(() => y.then((h) => {
            if (!h)
              throw new Error(`Couldn't resolve component "${a}" at "${c.path}"`);
            const u = Co(h) ? h.default : h;
            c.mods[a] = h, c.components[a] = u;
            const E = (u.__vccOpts || u)[t];
            return E && de(E, n, o, c, a, r)();
          }));
        }
    }
  }
  return l;
}
function Yt(e) {
  const t = Ee(Je), n = Ee(Nn);
  let o = !1, r = null;
  const l = te(() => {
    const h = pe(e.to);
    return D.NODE_ENV !== "production" && (!o || h !== r) && (Xe(h) || (o ? L(`Invalid value for prop "to" in useLink()
- to:`, h, `
- previous to:`, r, `
- props:`, e) : L(`Invalid value for prop "to" in useLink()
- to:`, h, `
- props:`, e)), r = h, o = !0), t.resolve(h);
  }), c = te(() => {
    const { matched: h } = l.value, { length: u } = h, b = h[u - 1], E = n.matched;
    if (!b || !E.length)
      return -1;
    const j = E.findIndex(ve.bind(null, b));
    if (j > -1)
      return j;
    const p = Xt(h[u - 2]);
    return (
      // we are dealing with nested routes
      u > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      Xt(b) === p && // avoid comparing the child with its parent
      E[E.length - 1].path !== p ? E.findIndex(ve.bind(null, h[u - 2])) : j
    );
  }), a = te(() => c.value > -1 && Ir(n.params, l.value.params)), f = te(() => c.value > -1 && c.value === n.matched.length - 1 && Sn(n.params, l.value.params));
  function y(h = {}) {
    if ($r(h)) {
      const u = t[pe(e.replace) ? "replace" : "push"](
        pe(e.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(je);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => u), u;
    }
    return Promise.resolve();
  }
  if (D.NODE_ENV !== "production" && ce) {
    const h = bt();
    if (h) {
      const u = {
        route: l.value,
        isActive: a.value,
        isExactActive: f.value,
        error: null
      };
      h.__vrl_devtools = h.__vrl_devtools || [], h.__vrl_devtools.push(u), Wn(() => {
        u.route = l.value, u.isActive = a.value, u.isExactActive = f.value, u.error = Xe(pe(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: l,
    href: te(() => l.value.href),
    isActive: a,
    isExactActive: f,
    navigate: y
  };
}
function Nr(e) {
  return e.length === 1 ? e[0] : e;
}
const Tr = /* @__PURE__ */ nn({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: Yt,
  setup(e, { slots: t }) {
    const n = tn(Yt(e)), { options: o } = Ee(Je), r = te(() => ({
      [Kt(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [Kt(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const l = t.default && Nr(t.default(n));
      return e.custom ? l : on("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, l);
    };
  }
}), Cr = Tr;
function $r(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Ir(e, t) {
  for (const n in t) {
    const o = t[n], r = e[n];
    if (typeof o == "string") {
      if (o !== r)
        return !1;
    } else if (!Z(r) || r.length !== o.length || o.some((l, c) => l !== r[c]))
      return !1;
  }
  return !0;
}
function Xt(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Kt = (e, t, n) => e ?? t ?? n, Ar = /* @__PURE__ */ nn({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    D.NODE_ENV !== "production" && xr();
    const o = Ee(vt), r = te(() => e.route || o.value), l = Ee(qt, 0), c = te(() => {
      let y = pe(l);
      const { matched: h } = r.value;
      let u;
      for (; (u = h[y]) && !u.components; )
        y++;
      return y;
    }), a = te(() => r.value.matched[c.value]);
    nt(qt, te(() => c.value + 1)), nt(kr, a), nt(vt, r);
    const f = Ke();
    return Qe(() => [f.value, a.value, e.name], ([y, h, u], [b, E, j]) => {
      h && (h.instances[u] = y, E && E !== h && y && y === b && (h.leaveGuards.size || (h.leaveGuards = E.leaveGuards), h.updateGuards.size || (h.updateGuards = E.updateGuards))), y && h && // if there is no instance but to and from are the same this might be
      // the first visit
      (!E || !ve(h, E) || !b) && (h.enterCallbacks[u] || []).forEach((p) => p(y));
    }, { flush: "post" }), () => {
      const y = r.value, h = e.name, u = a.value, b = u && u.components[h];
      if (!b)
        return Qt(n.default, { Component: b, route: y });
      const E = u.props[h], j = E ? E === !0 ? y.params : typeof E == "function" ? E(y) : E : null, g = on(b, z({}, j, t, {
        onVnodeUnmounted: ($) => {
          $.component.isUnmounted && (u.instances[h] = null);
        },
        ref: f
      }));
      if (D.NODE_ENV !== "production" && ce && g.ref) {
        const $ = {
          depth: c.value,
          name: u.name,
          path: u.path,
          meta: u.meta
        };
        (Z(g.ref) ? g.ref.map((A) => A.i) : [g.ref.i]).forEach((A) => {
          A.__vrv_devtools = $;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        Qt(n.default, { Component: g, route: y }) || g
      );
    };
  }
});
function Qt(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Tn = Ar;
function xr() {
  const e = bt(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const o = t === "KeepAlive" ? "keep-alive" : "transition";
    L(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${o}>
    <component :is="Component" />
  </${o}>
</router-view>`);
  }
}
function Ae(e, t) {
  const n = z({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => Gr(o, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: !0,
      display: e.fullPath,
      tooltip: t,
      value: n
    }
  };
}
function He(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let jr = 0;
function Dr(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = jr++;
  _t({
    id: "org.vuejs.router" + (o ? "." + o : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (r) => {
    typeof r.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), r.on.inspectComponent((h, u) => {
      h.instanceData && h.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: Ae(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: h, componentInstance: u }) => {
      if (u.__vrv_devtools) {
        const b = u.__vrv_devtools;
        h.tags.push({
          label: (b.name ? `${b.name.toString()}: ` : "") + b.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: Cn
        });
      }
      Z(u.__vrl_devtools) && (u.__devtoolsApi = r, u.__vrl_devtools.forEach((b) => {
        let E = b.route.path, j = An, p = "", g = 0;
        b.error ? (E = b.error, j = Br, g = Hr) : b.isExactActive ? (j = In, p = "This is exactly active") : b.isActive && (j = $n, p = "This link is active"), h.tags.push({
          label: E,
          textColor: g,
          tooltip: p,
          backgroundColor: j
        });
      }));
    }), Qe(t.currentRoute, () => {
      f(), r.notifyComponentUpdate(), r.sendInspectorTree(a), r.sendInspectorState(a);
    });
    const l = "router:navigations:" + o;
    r.addTimelineLayer({
      id: l,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((h, u) => {
      r.addTimelineEvent({
        layerId: l,
        event: {
          title: "Error during Navigation",
          subtitle: u.fullPath,
          logType: "error",
          time: r.now(),
          data: { error: h },
          groupId: u.meta.__navigationId
        }
      });
    });
    let c = 0;
    t.beforeEach((h, u) => {
      const b = {
        guard: He("beforeEach"),
        from: Ae(u, "Current Location during this navigation"),
        to: Ae(h, "Target location")
      };
      Object.defineProperty(h.meta, "__navigationId", {
        value: c++
      }), r.addTimelineEvent({
        layerId: l,
        event: {
          time: r.now(),
          title: "Start of navigation",
          subtitle: h.fullPath,
          data: b,
          groupId: h.meta.__navigationId
        }
      });
    }), t.afterEach((h, u, b) => {
      const E = {
        guard: He("afterEach")
      };
      b ? (E.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: b ? b.message : "",
          tooltip: "Navigation Failure",
          value: b
        }
      }, E.status = He("❌")) : E.status = He("✅"), E.from = Ae(u, "Current Location during this navigation"), E.to = Ae(h, "Target location"), r.addTimelineEvent({
        layerId: l,
        event: {
          title: "End of navigation",
          subtitle: h.fullPath,
          time: r.now(),
          data: E,
          logType: b ? "warning" : "default",
          groupId: h.meta.__navigationId
        }
      });
    });
    const a = "router-inspector:" + o;
    r.addInspector({
      id: a,
      label: "Routes" + (o ? " " + o : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function f() {
      if (!y)
        return;
      const h = y;
      let u = n.getRoutes().filter((b) => !b.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !b.parent.record.components);
      u.forEach(Dn), h.filter && (u = u.filter((b) => (
        // save matches state based on the payload
        yt(b, h.filter.toLowerCase())
      ))), u.forEach((b) => jn(b, t.currentRoute.value)), h.rootNodes = u.map(xn);
    }
    let y;
    r.on.getInspectorTree((h) => {
      y = h, h.app === e && h.inspectorId === a && f();
    }), r.on.getInspectorState((h) => {
      if (h.app === e && h.inspectorId === a) {
        const b = n.getRoutes().find((E) => E.record.__vd_id === h.nodeId);
        b && (h.state = {
          options: Mr(b)
        });
      }
    }), r.sendInspectorTree(a), r.sendInspectorState(a);
  });
}
function Vr(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function Mr(e) {
  const { record: t } = e, n = [
    { editable: !1, key: "path", value: t.path }
  ];
  return t.name != null && n.push({
    editable: !1,
    key: "name",
    value: t.name
  }), n.push({ editable: !1, key: "regexp", value: e.re }), e.keys.length && n.push({
    editable: !1,
    key: "keys",
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.keys.map((o) => `${o.name}${Vr(o)}`).join(" "),
        tooltip: "Param keys",
        value: e.keys
      }
    }
  }), t.redirect != null && n.push({
    editable: !1,
    key: "redirect",
    value: t.redirect
  }), e.alias.length && n.push({
    editable: !1,
    key: "aliases",
    value: e.alias.map((o) => o.record.path)
  }), Object.keys(e.record.meta).length && n.push({
    editable: !1,
    key: "meta",
    value: e.record.meta
  }), n.push({
    key: "score",
    editable: !1,
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.score.map((o) => o.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: e.score
      }
    }
  }), n;
}
const Cn = 15485081, $n = 2450411, In = 8702998, Lr = 2282478, An = 16486972, Ur = 6710886, Br = 16704226, Hr = 12131356;
function xn(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: Lr
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: An
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: Cn
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: In
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: $n
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: Ur
  });
  let o = n.__vd_id;
  return o == null && (o = String(Fr++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(xn)
  };
}
let Fr = 0;
const zr = /^\/(.*)\/([a-z]*)$/;
function jn(e, t) {
  const n = t.matched.length && ve(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => ve(o, e.record))), e.children.forEach((o) => jn(o, t));
}
function Dn(e) {
  e.__vd_match = !1, e.children.forEach(Dn);
}
function yt(e, t) {
  const n = String(e.re).match(zr);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((c) => yt(c, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), l = Re(r);
  return !t.startsWith("/") && (l.includes(t) || r.includes(t)) || l.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((c) => yt(c, t));
}
function Gr(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function Wr(e) {
  const t = mr(e.routes, e), n = e.parseQuery || Sr, o = e.stringifyQuery || Wt, r = e.history;
  if (D.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://router.vuejs.org/api/interfaces/RouterOptions.html#history');
  const l = Ie(), c = Ie(), a = Ie(), f = zn(he);
  let y = he;
  ce && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const h = it.bind(null, (v) => "" + v), u = it.bind(null, Fo), b = (
    // @ts-expect-error: intentionally avoid the type check
    it.bind(null, Re)
  );
  function E(v, P) {
    let S, C;
    return Pn(v) ? (S = t.getRecordMatcher(v), D.NODE_ENV !== "production" && !S && L(`Parent route "${String(v)}" not found when adding child route`, P), C = P) : C = v, t.addRoute(C, S);
  }
  function j(v) {
    const P = t.getRecordMatcher(v);
    P ? t.removeRoute(P) : D.NODE_ENV !== "production" && L(`Cannot remove non-existent route "${String(v)}"`);
  }
  function p() {
    return t.getRoutes().map((v) => v.record);
  }
  function g(v) {
    return !!t.getRecordMatcher(v);
  }
  function $(v, P) {
    if (P = z({}, P || f.value), typeof v == "string") {
      const d = st(n, v, P.path), i = t.resolve({ path: d.path }, P), _ = r.createHref(d.fullPath);
      return D.NODE_ENV !== "production" && (_.startsWith("//") ? L(`Location "${v}" resolved to "${_}". A resolved location cannot start with multiple slashes.`) : i.matched.length || L(`No match found for location with path "${v}"`)), z(d, i, {
        params: b(i.params),
        hash: Re(d.hash),
        redirectedFrom: void 0,
        href: _
      });
    }
    if (D.NODE_ENV !== "production" && !Xe(v))
      return L(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, v), $({});
    let S;
    if (v.path != null)
      D.NODE_ENV !== "production" && "params" in v && !("name" in v) && // @ts-expect-error: the type is never
      Object.keys(v.params).length && L(`Path "${v.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), S = z({}, v, {
        path: st(n, v.path, P.path).path
      });
    else {
      const d = z({}, v.params);
      for (const i in d)
        d[i] == null && delete d[i];
      S = z({}, v, {
        params: u(d)
      }), P.params = u(P.params);
    }
    const C = t.resolve(S, P), H = v.hash || "";
    D.NODE_ENV !== "production" && H && !H.startsWith("#") && L(`A \`hash\` should always start with the character "#". Replace "${H}" with "#${H}".`), C.params = h(b(C.params));
    const m = Wo(o, z({}, v, {
      hash: Uo(H),
      path: C.path
    })), s = r.createHref(m);
    return D.NODE_ENV !== "production" && (s.startsWith("//") ? L(`Location "${v}" resolved to "${s}". A resolved location cannot start with multiple slashes.`) : C.matched.length || L(`No match found for location with path "${v.path != null ? v.path : v}"`)), z({
      fullPath: m,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: H,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === Wt ? Pr(v.query) : v.query || {}
      )
    }, C, {
      redirectedFrom: void 0,
      href: s
    });
  }
  function x(v) {
    return typeof v == "string" ? st(n, v, f.value.path) : z({}, v);
  }
  function A(v, P) {
    if (y !== v)
      return Ne(8, {
        from: P,
        to: v
      });
  }
  function V(v) {
    return T(v);
  }
  function B(v) {
    return V(z(x(v), { replace: !0 }));
  }
  function M(v) {
    const P = v.matched[v.matched.length - 1];
    if (P && P.redirect) {
      const { redirect: S } = P;
      let C = typeof S == "function" ? S(v) : S;
      if (typeof C == "string" && (C = C.includes("?") || C.includes("#") ? C = x(C) : (
        // force empty params
        { path: C }
      ), C.params = {}), D.NODE_ENV !== "production" && C.path == null && !("name" in C))
        throw L(`Invalid redirect found:
${JSON.stringify(C, null, 2)}
 when navigating to "${v.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return z({
        query: v.query,
        hash: v.hash,
        // avoid transferring params if the redirect has a path
        params: C.path != null ? {} : v.params
      }, C);
    }
  }
  function T(v, P) {
    const S = y = $(v), C = f.value, H = v.state, m = v.force, s = v.replace === !0, d = M(S);
    if (d)
      return T(
        z(x(d), {
          state: typeof d == "object" ? z({}, H, d.state) : H,
          force: m,
          replace: s
        }),
        // keep original redirectedFrom if it exists
        P || S
      );
    const i = S;
    i.redirectedFrom = P;
    let _;
    return !m && Dt(o, C, S) && (_ = Ne(16, { to: i, from: C }), ie(
      C,
      C,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (_ ? Promise.resolve(_) : I(i, C)).catch((N) => ae(N) ? (
      // navigation redirects still mark the router as ready
      ae(
        N,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? N : Te(N)
    ) : (
      // reject any unknown error
      J(N, i, C)
    )).then((N) => {
      if (N) {
        if (ae(
          N,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return D.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          Dt(o, $(N.to), i) && // and we have done it a couple of times
          P && // @ts-expect-error: added only in dev
          (P._count = P._count ? (
            // @ts-expect-error
            P._count + 1
          ) : 1) > 30 ? (L(`Detected a possibly infinite redirection in a navigation guard when going from "${C.fullPath}" to "${i.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : T(
            // keep options
            z({
              // preserve an existing replacement but allow the redirect to override it
              replace: s
            }, x(N.to), {
              state: typeof N.to == "object" ? z({}, H, N.to.state) : H,
              force: m
            }),
            // preserve the original redirectedFrom if any
            P || i
          );
      } else
        N = F(i, C, !0, s, H);
      return R(i, C, N), N;
    });
  }
  function we(v, P) {
    const S = A(v, P);
    return S ? Promise.reject(S) : Promise.resolve();
  }
  function K(v) {
    const P = Oe.values().next().value;
    return P && typeof P.runWithContext == "function" ? P.runWithContext(v) : v();
  }
  function I(v, P) {
    let S;
    const [C, H, m] = qr(v, P);
    S = ct(C.reverse(), "beforeRouteLeave", v, P);
    for (const d of C)
      d.leaveGuards.forEach((i) => {
        S.push(de(i, v, P));
      });
    const s = we.bind(null, v, P);
    return S.push(s), fe(S).then(() => {
      S = [];
      for (const d of l.list())
        S.push(de(d, v, P));
      return S.push(s), fe(S);
    }).then(() => {
      S = ct(H, "beforeRouteUpdate", v, P);
      for (const d of H)
        d.updateGuards.forEach((i) => {
          S.push(de(i, v, P));
        });
      return S.push(s), fe(S);
    }).then(() => {
      S = [];
      for (const d of m)
        if (d.beforeEnter)
          if (Z(d.beforeEnter))
            for (const i of d.beforeEnter)
              S.push(de(i, v, P));
          else
            S.push(de(d.beforeEnter, v, P));
      return S.push(s), fe(S);
    }).then(() => (v.matched.forEach((d) => d.enterCallbacks = {}), S = ct(m, "beforeRouteEnter", v, P, K), S.push(s), fe(S))).then(() => {
      S = [];
      for (const d of c.list())
        S.push(de(d, v, P));
      return S.push(s), fe(S);
    }).catch((d) => ae(
      d,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? d : Promise.reject(d));
  }
  function R(v, P, S) {
    a.list().forEach((C) => K(() => C(v, P, S)));
  }
  function F(v, P, S, C, H) {
    const m = A(v, P);
    if (m)
      return m;
    const s = P === he, d = ce ? history.state : {};
    S && (C || s ? r.replace(v.fullPath, z({
      scroll: s && d && d.scroll
    }, H)) : r.push(v.fullPath, H)), f.value = v, ie(v, P, S, s), Te();
  }
  let W;
  function Q() {
    W || (W = r.listen((v, P, S) => {
      if (!Ue.listening)
        return;
      const C = $(v), H = M(C);
      if (H) {
        T(z(H, { replace: !0, force: !0 }), C).catch(je);
        return;
      }
      y = C;
      const m = f.value;
      ce && tr(Mt(m.fullPath, S.delta), Zo()), I(C, m).catch((s) => ae(
        s,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? s : ae(
        s,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (T(
        z(x(s.to), {
          force: !0
        }),
        C
        // avoid an uncaught rejection, let push call triggerError
      ).then((d) => {
        ae(
          d,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !S.delta && S.type === Le.pop && r.go(-1, !1);
      }).catch(je), Promise.reject()) : (S.delta && r.go(-S.delta, !1), J(s, C, m))).then((s) => {
        s = s || F(
          // after navigation, all matched components are resolved
          C,
          m,
          !1
        ), s && (S.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !ae(
          s,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-S.delta, !1) : S.type === Le.pop && ae(
          s,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), R(C, m, s);
      }).catch(je);
    }));
  }
  let re = Ie(), le = Ie(), ue;
  function J(v, P, S) {
    Te(v);
    const C = le.list();
    return C.length ? C.forEach((H) => H(v, P, S)) : (D.NODE_ENV !== "production" && L("uncaught error during route navigation:"), console.error(v)), Promise.reject(v);
  }
  function q() {
    return ue && f.value !== he ? Promise.resolve() : new Promise((v, P) => {
      re.add([v, P]);
    });
  }
  function Te(v) {
    return ue || (ue = !v, Q(), re.list().forEach(([P, S]) => v ? S(v) : P()), re.reset()), v;
  }
  function ie(v, P, S, C) {
    const { scrollBehavior: H } = e;
    if (!ce || !H)
      return Promise.resolve();
    const m = !S && nr(Mt(v.fullPath, 0)) || (C || !S) && history.state && history.state.scroll || null;
    return lt().then(() => H(v, P, m)).then((s) => s && er(s)).catch((s) => J(s, v, P));
  }
  const Ce = (v) => r.go(v);
  let $e;
  const Oe = /* @__PURE__ */ new Set(), Ue = {
    currentRoute: f,
    listening: !0,
    addRoute: E,
    removeRoute: j,
    clearRoutes: t.clearRoutes,
    hasRoute: g,
    getRoutes: p,
    resolve: $,
    options: e,
    push: V,
    replace: B,
    go: Ce,
    back: () => Ce(-1),
    forward: () => Ce(1),
    beforeEach: l.add,
    beforeResolve: c.add,
    afterEach: a.add,
    onError: le.add,
    isReady: q,
    install(v) {
      const P = this;
      v.component("RouterLink", Cr), v.component("RouterView", Tn), v.config.globalProperties.$router = P, Object.defineProperty(v.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => pe(f)
      }), ce && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !$e && f.value === he && ($e = !0, V(r.location).catch((H) => {
        D.NODE_ENV !== "production" && L("Unexpected error when starting the router:", H);
      }));
      const S = {};
      for (const H in he)
        Object.defineProperty(S, H, {
          get: () => f.value[H],
          enumerable: !0
        });
      v.provide(Je, P), v.provide(Nn, Gn(S)), v.provide(vt, f);
      const C = v.unmount;
      Oe.add(v), v.unmount = function() {
        Oe.delete(v), Oe.size < 1 && (y = he, W && W(), W = null, f.value = he, $e = !1, ue = !1), C();
      }, D.NODE_ENV !== "production" && ce && Dr(v, P, t);
    }
  };
  function fe(v) {
    return v.reduce((P, S) => P.then(() => K(S)), Promise.resolve());
  }
  return Ue;
}
function qr(e, t) {
  const n = [], o = [], r = [], l = Math.max(t.matched.length, e.matched.length);
  for (let c = 0; c < l; c++) {
    const a = t.matched[c];
    a && (e.matched.find((y) => ve(y, a)) ? o.push(a) : n.push(a));
    const f = e.matched[c];
    f && (t.matched.find((y) => ve(y, f)) || r.push(f));
  }
  return [n, o, r];
}
function ii() {
  return Ee(Je);
}
const Yr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Xr = { class: "jw2olOdp-container" }, Kr = { class: "dncCc2nmf-container" }, Qr = {
  __name: "App",
  setup(e) {
    return (t, n) => (kt(), qn("div", Xr, [
      Rt("div", Kr, [
        Nt(pe(Tn), { style: { "z-index": "9992" } }, {
          default: Tt(({ Component: o }) => [
            Nt(Yn, {
              name: "fade",
              mode: "out-in"
            }, {
              default: Tt(() => [
                (kt(), Xn(Kn(o)))
              ]),
              _: 2
            }, 1024)
          ]),
          _: 1
        })
      ]),
      n[0] || (n[0] = Rt("div", { class: "jw2oMNs9-container" }, null, -1))
    ]));
  }
}, Vn = /* @__PURE__ */ Yr(Qr, [["__scopeId", "data-v-e9b03906"]]), Jr = Wr({
  //используем createMemoryHistory для работы без браузерного роутинга
  history: or(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./Main-ByDzVOze.js")
    },
    {
      path: "/connect",
      name: "connect",
      component: () => import("./Connect-DO61Jw9f.js")
    },
    {
      path: "/success",
      name: "success",
      component: () => import("./Success-WZrV8rex.js")
    }
  ]
});
function Jt(e) {
  return e.type.indexOf("mouse") !== -1 ? e.clientX : e.touches[0].clientX;
}
function Zt(e) {
  return e.type.indexOf("mouse") !== -1 ? e.clientY : e.touches[0].clientY;
}
var Zr = function() {
  var e = !1;
  try {
    var t = Object.defineProperty({}, "passive", {
      get: function() {
        e = !0;
      }
    });
    window.addEventListener("test", null, t);
  } catch {
  }
  return e;
}(), ei = {
  install: function(e, t) {
    var n = Object.assign({}, {
      disableClick: !1,
      tapTolerance: 10,
      // px
      swipeTolerance: 30,
      // px
      touchHoldTolerance: 400,
      // ms
      longTapTimeInterval: 400,
      // ms
      touchClass: "",
      dragFrequency: 100,
      // ms
      rollOverFrequency: 100,
      // ms
      namespace: "touch"
    }, t);
    function o(p) {
      var g = this.$$touchObj, $ = p.type.indexOf("touch") >= 0, x = p.type.indexOf("mouse") >= 0, A = this;
      $ && (g.lastTouchStartTime = p.timeStamp), !(x && g.lastTouchStartTime && p.timeStamp - g.lastTouchStartTime < 350) && (g.touchStarted || (u(this), g.touchStarted = !0, g.touchMoved = !1, g.swipeOutBounded = !1, g.startX = Jt(p), g.startY = Zt(p), g.currentX = 0, g.currentY = 0, g.touchStartTime = p.timeStamp, g.hasSwipe = y(this, "swipe") || y(this, "swipe.left") || y(this, "swipe.right") || y(this, "swipe.top") || y(this, "swipe.bottom"), y(this, "hold") && (g.touchHoldTimer = setTimeout(function() {
        g.touchHoldTimer = null, h(p, A, "hold");
      }, g.options.touchHoldTolerance)), h(p, this, "press")));
    }
    function r(p) {
      var g = this.$$touchObj, $ = Jt(p), x = Zt(p), A = g.currentX != $ || g.currentY != x;
      if (g.currentX = $, g.currentY = x, g.touchMoved) {
        if (g.hasSwipe && !g.swipeOutBounded) {
          var B = g.options.swipeTolerance;
          g.swipeOutBounded = Math.abs(g.startX - g.currentX) > B && Math.abs(g.startY - g.currentY) > B;
        }
      } else {
        var V = g.options.tapTolerance;
        g.touchMoved = Math.abs(g.startX - g.currentX) > V || Math.abs(g.startY - g.currentY) > V, g.touchMoved && (E(g), h(p, this, "drag.once"));
      }
      if (y(this, "rollover") && A) {
        var M = p.timeStamp, T = g.options.rollOverFrequency;
        (g.touchRollTime == null || M > g.touchRollTime + T) && (g.touchRollTime = M, h(p, this, "rollover"));
      }
      if (y(this, "drag") && g.touchStarted && g.touchMoved && A) {
        var M = p.timeStamp, T = g.options.dragFrequency;
        (g.touchDragTime == null || M > g.touchDragTime + T) && (g.touchDragTime = M, h(p, this, "drag"));
      }
    }
    function l() {
      var p = this.$$touchObj;
      E(p), b(this), p.touchStarted = p.touchMoved = !1, p.startX = p.startY = 0;
    }
    function c(p) {
      var g = this.$$touchObj, $ = p.type.indexOf("touch") >= 0, x = p.type.indexOf("mouse") >= 0;
      $ && (g.lastTouchEndTime = p.timeStamp);
      var A = $ && !g.touchHoldTimer;
      if (E(g), g.touchStarted = !1, b(this), !(x && g.lastTouchEndTime && p.timeStamp - g.lastTouchEndTime < 350))
        if (h(p, this, "release"), g.touchMoved) {
          if (g.hasSwipe && !g.swipeOutBounded) {
            var V = g.options.swipeTolerance, B, M = Math.abs(g.startY - g.currentY), T = Math.abs(g.startX - g.currentX);
            (M > V || T > V) && (M > T ? B = g.startY > g.currentY ? "top" : "bottom" : B = g.startX > g.currentX ? "left" : "right", y(this, "swipe." + B) ? h(p, this, "swipe." + B, B) : h(p, this, "swipe", B));
          }
        } else if (y(this, "longtap") && p.timeStamp - g.touchStartTime > g.options.longTapTimeInterval)
          p.cancelable && p.preventDefault(), h(p, this, "longtap");
        else if (y(this, "hold") && A) {
          p.cancelable && p.preventDefault();
          return;
        } else
          h(p, this, "tap");
    }
    function a() {
      u(this);
    }
    function f() {
      b(this);
    }
    function y(p, g) {
      var $ = p.$$touchObj.callbacks[g];
      return $ != null && $.length > 0;
    }
    function h(p, g, $, x) {
      var A = g.$$touchObj, V = A.callbacks[$];
      if (V == null || V.length === 0)
        return null;
      for (var B = 0; B < V.length; B++) {
        var M = V[B];
        M.modifiers.stop && p.stopPropagation(), M.modifiers.prevent && p.preventDefault(), !(M.modifiers.self && p.target !== p.currentTarget) && typeof M.value == "function" && (x ? M.value(x, p) : M.value(p));
      }
    }
    function u(p) {
      var g = p.$$touchObj.options.touchClass;
      g && p.classList.add(g);
    }
    function b(p) {
      var g = p.$$touchObj.options.touchClass;
      g && p.classList.remove(g);
    }
    function E(p) {
      p && p.touchHoldTimer && (clearTimeout(p.touchHoldTimer), p.touchHoldTimer = null);
    }
    function j(p, g) {
      var $ = p.$$touchObj || {
        // an object contains all callbacks registered,
        // key is event name, value is an array
        callbacks: {},
        // prevent bind twice, set to true when event bound
        hasBindTouchEvents: !1,
        // default options, would be override by v-touch-options
        options: n
      };
      return g && ($.options = Object.assign({}, $.options, g)), p.$$touchObj = $, p.$$touchObj;
    }
    e.directive(n.namespace, {
      beforeMount: function(p, g) {
        var $ = j(p), x = Zr ? { passive: !0 } : !1, A = g.arg || "tap";
        switch (A) {
          case "swipe":
            var V = g.modifiers;
            if (V.left || V.right || V.top || V.bottom) {
              for (var B in g.modifiers)
                if (["left", "right", "top", "bottom"].indexOf(B) >= 0) {
                  var M = "swipe." + B;
                  $.callbacks[M] = $.callbacks[M] || [], $.callbacks[M].push(g);
                }
            } else
              $.callbacks.swipe = $.callbacks.swipe || [], $.callbacks.swipe.push(g);
            break;
          case "press":
          case "drag":
            g.modifiers.disablePassive && (x = !1);
          default:
            $.callbacks[A] = $.callbacks[A] || [], $.callbacks[A].push(g);
        }
        $.hasBindTouchEvents || (p.addEventListener("touchstart", o, x), p.addEventListener("touchmove", r, x), p.addEventListener("touchcancel", l), p.addEventListener("touchend", c), $.options.disableClick || (p.addEventListener("mousedown", o), p.addEventListener("mousemove", r), p.addEventListener("mouseup", c), p.addEventListener("mouseenter", a), p.addEventListener("mouseleave", f)), $.hasBindTouchEvents = !0);
      },
      unmounted: function(p) {
        E(p.$$touchObj), p.removeEventListener("touchstart", o), p.removeEventListener("touchmove", r), p.removeEventListener("touchcancel", l), p.removeEventListener("touchend", c), p.$$touchObj && !p.$$touchObj.options.disableClick && (p.removeEventListener("mousedown", o), p.removeEventListener("mousemove", r), p.removeEventListener("mouseup", c), p.removeEventListener("mouseenter", a), p.removeEventListener("mouseleave", f)), delete p.$$touchObj;
      }
    }), e.directive(`${n.namespace}-class`, {
      beforeMount: function(p, g) {
        j(p, {
          touchClass: g.value
        });
      }
    }), e.directive(`${n.namespace}-options`, {
      beforeMount: function(p, g) {
        j(p, g.value);
      }
    });
  }
};
function ti() {
  const e = Qn(Vn);
  return e.use(Oo()), e.use(Jr), e.use(To), e.use(ei), e;
}
function ni() {
  const e = defineCustomElement(Vn);
  customElements.define("wallet-modal", e);
}
const si = {
  createWalletModalApp: ti,
  defineWalletModalCustomElement: ni
};
export {
  Yr as _,
  ni as a,
  ti as c,
  ri as d,
  si as m,
  ii as u
};
