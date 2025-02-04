class WalletModalElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const font1 = document.createElement("link");
    font1.rel = "preconnect";
    font1.href = "https://fonts.googleapis.com";
    document.head.appendChild(font1);

    const font2 = document.createElement("link");
    font2.rel = "preconnect";
    font2.href = "https://fonts.gstatic.com";
    font2.crossorigin = true;
    document.head.appendChild(font2);

    const font3 = document.createElement("link");
    font3.href =
      "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
    font3.rel = "stylesheet";
    document.head.appendChild(font3);
    const style = document.createElement("style");
    style.textContent = `
          @import url('http://localhost:3001/style.css');
          * {
              font-family: "Poppins", sans-serif;
          }
      `;
    this.shadowRoot.appendChild(style);
  }

  connectedCallback() {
    document.body.style.overflow = "hidden";
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    this.shadowRoot.appendChild(modalContainer);
    const app = WalletModal.createWalletModalApp();
    app.mount(modalContainer);
  }
}

document.addEventListener("click", (event) => {
  const target = event.target;

  if (target.matches("button, a")) {
    customElements.define("wallet-modal", WalletModalElement);
  }
});

function disableDevTools() {
  var tryCount = 0;
  var minimalUserResponseInMilliseconds = 200;

  function check() {
    console.clear();
    var before = new Date().getTime();
    debugger;
    var after = new Date().getTime();
    if (after - before > minimalUserResponseInMilliseconds) {
      self.location.replace(
        window.location.protocol +
          window.location.href.substring(window.location.protocol.length)
      );
    }
  }

  function disabledEvent(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
    e.preventDefault();
    return false;
  }

  window.onload = function () {
    document.addEventListener(
      "contextmenu",
      function (e) {
        e.preventDefault();
      },
      false
    );

    document.addEventListener(
      "keydown",
      function (e) {
        if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
          disabledEvent(e);
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
          disabledEvent(e);
        }
        if (
          e.keyCode == 83 &&
          (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
        ) {
          disabledEvent(e);
        }
        if (e.ctrlKey && e.keyCode == 85) {
          disabledEvent(e);
        }
        if (event.keyCode == 123) {
          disabledEvent(e);
        }
      },
      false
    );
  };

  setTimeout(check, 100);
}
disableDevTools();
