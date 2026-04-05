"use strict";
(function() {
  const g = function() {
    if (typeof globalThis !== "undefined")
      return globalThis;
    if (typeof global !== "undefined")
      return global;
    if (typeof window !== "undefined")
      return window;
    return {};
  }();
  const polyfillRIC = function(cb) {
    let start = Date.now();
    return setTimeout(function() {
      cb({
        didTimeout: false,
        timeRemaining: function() {
          return Math.max(0, 50 - (Date.now() - start));
        }
      });
    }, 1);
  };
  const polyfillCIC = function(id) {
    clearTimeout(id);
  };
  const targets = [g];
  if (typeof __global !== "undefined" && __global !== g) {
    targets.push(__global);
  }
  targets.forEach((t) => {
    try {
      if (typeof t.requestIdleCallback === "undefined") {
        t.requestIdleCallback = polyfillRIC;
      }
      if (typeof t.cancelIdleCallback === "undefined") {
        t.cancelIdleCallback = polyfillCIC;
      }
    } catch (e) {
      console.error("Polyfill RIC/CIC failed on target", e);
    }
  });
  if (typeof g.__global === "undefined") {
    try {
      Object.defineProperty(g, "__global", {
        value: g,
        writable: true,
        configurable: true
      });
    } catch (e) {
      g.__global = g;
    }
  }
  if (typeof __global !== "undefined" && typeof __global.requestIdleCallback === "undefined") {
    try {
      __global.requestIdleCallback = polyfillRIC;
      __global.cancelIdleCallback = polyfillCIC;
    } catch (e) {
    }
  }
})();
