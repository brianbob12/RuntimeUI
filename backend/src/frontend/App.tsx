import React, { useEffect } from "react"
import { useState } from "react"
import TagList from "./TagList"
import Counter, { loadCounter } from "./Counter"
import { Button } from "@mui/material"

const App: React.FC = () => {

  const [tagListOpen, setTagListOpen] = useState(false)

  const [counterLoaded, setCounterLoaded] = useState(false)
  
  useEffect(() => {
    if(!counterLoaded) {
      loadCounter().then(() => setCounterLoaded(true))
    }
  }, [counterLoaded])

  return (
    <div>
      <h1>Hello World</h1>

      <div
        style = {{
          backgroundColor: "#AAAAAA",
        }}
      >
        {counterLoaded && <Counter />}
        {!counterLoaded && <p>Loading...</p>}
      </div>

      <Button onClick={() => setTagListOpen(!tagListOpen)}>
        {tagListOpen ? "Close" : "Open"} Tag List
      </Button>
      {tagListOpen && <TagList />}
    </div>
  )
}

export default App