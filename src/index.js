import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";

let container = document.getElementById("dice-disasters-transcript-app");
ReactDOM.render(<App />, container);

if (window.parent !== window) {
  let lastHeight = -1;
  function check() {
    let height = container.getBoundingClientRect().height;
    if (height !== lastHeight) {
      lastHeight = height;
      parent.postMessage({height}, '*');
    }
  }
  let observer = new MutationObserver(check);
  observer.observe(container, { attributes: true, childList: true, subtree: true });
  requestAnimationFrame(check);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
