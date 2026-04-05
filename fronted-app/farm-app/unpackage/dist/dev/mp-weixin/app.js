"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
require("./polyfill.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/supply/index.js";
  "./pages/purchase/index.js";
  "./pages/cart/index.js";
  "./pages/user/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    setTimeout(() => {
      common_vendor.index.getNetworkType({
        success: (res) => {
          console.log("网络类型：", res.networkType);
        }
      });
    }, 500);
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
console.log("Main.js loading...");
function createApp() {
  console.log("Creating Vue 3 App...");
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
