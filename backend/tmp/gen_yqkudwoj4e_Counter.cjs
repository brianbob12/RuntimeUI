"use strict";
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("react");
const Counter = () => {
  const [count, setCount] = (0, import_react.useState)(0);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: "sans-serif", textAlign: "center", backgroundColor: "#EEEEEE", padding: "1rem", borderRadius: "0.5rem" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
      "You clicked ",
      count,
      " times"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setCount(count + 1), children: "Click me" })
  ] });
};
