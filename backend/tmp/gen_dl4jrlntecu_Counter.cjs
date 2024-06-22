"use strict";
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("react");
const components = require("./generativeComponents");
console.log(components);
const {
  Button: Button97,
  Switch: Switch97
} = components;
const Counter = () => {
  const [count, setCount] = (0, import_react.useState)(0);
  const [goingUp, setGoingUp] = (0, import_react.useState)(true);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: "sans-serif", textAlign: "center", backgroundColor: "#EEEEEE", padding: "1rem", borderRadius: "0.5rem" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
      "You clicked ",
      count,
      " times"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button97, { onClick: () => setCount(count + (goingUp ? 1 : -1)), children: "Click me" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch97, { checked: goingUp, onChange: (e) => setGoingUp(e.target.checked) })
  ] });
};
