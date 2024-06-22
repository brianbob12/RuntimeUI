import React, { useState } from "react"

type ButtonInputType = {
  color?:string
  boldOnHover?:boolean
  onClick?:React.MouseEventHandler
  children?:React.ReactNode
}

export const Button:React.FC<ButtonInputType> = ({
  color,
  onClick,
  boldOnHover,
  children
}) => {
  const [hover, setHover] = useState<boolean>(false)  

  const boldText = boldOnHover && hover

  return (
    <button
      onClick={onClick}
      onMouseEnter={ () => {
        setHover(true)
      }}
      onMouseLeave={ () =>{
        setHover(false)
      }}
      style={{
        "backgroundColor":color || "blue",
        "borderRadius": "0.25rem",
        "padding":"0.25rem",
        "borderWidth":"0rem",
        "textDecoration":boldText? "auto" : "bold"
      }}
    >
      {children}
    </button>
  )
}