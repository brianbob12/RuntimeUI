"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("react");
var import_Button = require("Button");
var import_Icon = __toESM(require("Icon"), 1);
const Counter = () => {
  const [count, setCount] = (0, import_react.useState)(0);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: "sans-serif", textAlign: "center", backgroundColor: "#EEEEEE", padding: "1rem", borderRadius: "0.5rem" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
      "You clicked ",
      count,
      " times"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Button.Button, { onClick: () => setCount(count + 1), children: "Click me" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Icon.default, {})
  ] });
};
