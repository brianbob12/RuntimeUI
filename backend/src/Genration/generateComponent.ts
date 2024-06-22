import groq from './Groq'

const testStringNotAliased = `
  import { useState } from "react"
  const components = require("./generativeComponents")
  console.log(components)
  const {
    Button,
    Switch
  } = components

  const Counter = () => {
    const [count, setCount] = useState(0)
    const [goingUp, setGoingUp] = useState(true)

    return (
      <div style={{ fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#EEEEEE', padding: '1rem', borderRadius: '0.5rem' }}>
        <span>You clicked {count} times</span>
        <Button onClick={() => setCount(count + (goingUp ? 1 : -1))}>
          Click me
        </Button>
        <Switch checked={goingUp} onChange={(e) => setGoingUp(e.target.checked)} />
      </div>
    )
  }
`

export const generateComponent = async (
  prompt: string,
  model: string = "llama3-8b-8192"
): Promise<string> => {
  const userMessage = `
  I'd like you to generate a typescript React component for me. 
  Here's what it should do:
  ${prompt}

  You can use the components from the components object in the starter code.
  These are Material UI Components. Copy the starter code and add your additions
  by the "YOUR CODE HERE" comment. Do not add any other imports or require statements.

  Use CSS in the TSX tags

  Here's the starter code:
  \`\`\`typescript
  import { useState } from "react"
  const components = require("./generativeComponents")
  console.log(components)
  const {
    Button,
    Switch
  } = components

  const Counter = () => {
    // YOUR CODE HERE
  }
    \`\`\`
  `

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: userMessage
      }
    ],
    model: model,
  })
  const returnedContent = completion.choices[0].message.content
  console.log(returnedContent)

  const extractedCode = returnedContent?.split("```typescript")[1].split("```")[0]
  console.log("Extracted code")
  console.log(extractedCode)

  if(!extractedCode) {
    throw new Error("Could not extract code")
  }

  return extractedCode
}