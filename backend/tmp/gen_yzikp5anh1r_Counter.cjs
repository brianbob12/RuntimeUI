"use strict";
var import_jsx_runtime = require("react/jsx-runtime");
const components = require("./generativeComponents");
const {
  Button,
  Switch
} = components;
const Counter = () => {
  const [count, setCount] = useState(0);
  const [goingUp, setGoingUp] = useState(true);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: "sans-serif", textAlign: "center", backgroundColor: "#EEEEEE", padding: "1rem", borderRadius: "0.5rem" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
      "You clicked ",
      count,
      " times"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { onClick: () => setCount(count + (goingUp ? 1 : -1)), children: "Click me" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { checked: goingUp, onChange: (e) => setGoingUp(e.target.checked) })
  ] });
};
