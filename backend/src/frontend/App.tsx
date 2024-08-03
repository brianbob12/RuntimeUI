import React, { useEffect } from "react"
import { useState } from "react"
import { Button } from "@mui/base"
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query"
import GeneratedComponent from "./GeneratedComponent"

const defaultPrompt = "A counter that counts up or down based on a button click. A switch should allow the user to choose between increasing or decreasing the counter."

const hotReload = false

const queryClient = new QueryClient()

const App: React.FC = () => {

  const [promptInput, setPromptInput] = useState(defaultPrompt)
  const [livePrompt, setLivePrompt] = useState(defaultPrompt)
  const [componentIndex, setComponentIndex] = useState(0)

  useEffect(() => {
    if(hotReload) {
      setLivePrompt(promptInput)
    }
  }, [promptInput])
  
  return (
    <QueryClientProvider client={queryClient}>
      <div
        style = {{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Generated Component</h1>
        <div>
          <textarea
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <Button
            onClick={() => {
              setLivePrompt(promptInput)
              setComponentIndex(componentIndex + 1)
            }}
          >
            {hotReload? "Regenerate" : "Generate"}
          </Button>
        </div>
        <div
          style = {{
            border: "1px solid gray",
            padding: "4rem",
            borderRadius: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GeneratedComponent
            prompt={livePrompt}
            index={componentIndex}
          />
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default App