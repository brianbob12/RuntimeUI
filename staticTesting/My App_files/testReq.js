<script>
  import {useState} from "react";

  // src/frontend/Tag.tsx
  import {
    jsxDEV
  } from "react/jsx-dev-runtime";
  var Tag = ({tag}) => {
  return jsxDEV("div", {
    style: {
    backgroundColor: "#eee",
  padding: "5px",
  margin: "5px",
  borderRadius: "5px",
  display: "inline-block",
  fontSize: "12px",
  color: "#A44442"
    },
  children: tag
  }, undefined, false, undefined, this);
};
  var Tag_default = Tag;

  // src/frontend/TagList.tsx
  import {
    jsxDEV as jsxDEV2
  } from "react/jsx-dev-runtime";
var TagList = () => {
  const [tagList, setTagList] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");
  const addTag = (tag) => {
    setTagList([...tagList, tag]);
  };
  const removeTag = (tag) => {
    setTagList(tagList.filter((t) => t !== tag));
  };
  return jsxDEV2("div", {
    children: [
  jsxDEV2("div", {
    children: tagList.map((tag) => jsxDEV2("div", {
    children: [
  jsxDEV2(Tag_default, {
    tag
  }, undefined, false, undefined, this),
  jsxDEV2("button", {
    onClick: () => removeTag(tag),
  children: "Remove"
            }, undefined, false, undefined, this)
  ]
        }, tag, true, undefined, this))
      }, undefined, false, undefined, this),
  jsxDEV2("div", {
    children: jsxDEV2("form", {
    onSubmit: (e) => {
    e.preventDefault();
  addTag(tagInputValue);
  setTagInputValue("");
          },
  children: jsxDEV2("input", {
    type: "text",
  value: tagInputValue,
            onChange: (e) => setTagInputValue(e.target.value)
          }, undefined, false, undefined, this)
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this)
  ]
  }, undefined, true, undefined, this);
};
  var TagList_default = TagList;
  export {
    TagList_default as default
  };
</script >