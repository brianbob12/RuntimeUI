import React from "react"

const Tag: React.FC<{tag: string}> = ({tag}) => {
  return (
    <div
      style={{
        backgroundColor: "#eee",
        padding: "5px",
        margin: "5px",
        borderRadius: "5px",
        display: "inline-block",
        fontSize: "12px",
        color: "#A44442"
      }}
    >
      {tag}
    </div>
  )
}

export default Tag