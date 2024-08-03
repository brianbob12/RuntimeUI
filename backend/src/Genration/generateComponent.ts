import groq from './Groq'
import anthropic from './Anthropic'

const generateGroqResponse = async (
  prompt: string,
  model: string = "llama3-8b-8192",
  n: number = 1
): Promise<string[]> => {
  const completionPromises = []
  for (let i = 0; i < n; i++) {
    const completionPromise = groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      model: model,
      n: 1,
    })
    completionPromises.push(completionPromise)
  }

  const completions = await Promise.all(completionPromises)

  const out: string[] = []
  for(const completion of completions){
    const content = completion.choices[0].message.content
    if(content){
      out.push(content)
    }
  }
  return out
}

const generateAnthropicResponse = async (
  prompt: string,
  model: string,
  n: number = 1
): Promise<string[]> => {
  const completionPromises = []
  for (let i = 0; i < n; i++) {
    const completionPromise = anthropic.messages.create({
      model,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1024,
    })
    completionPromises.push(completionPromise)
  }

  const completions = await Promise.all(completionPromises)
  const out: string[] = []
  for(const completion of completions){
    for (const content of completion.content) {
      if(content.type !== "text"){
        continue
      }
      out.push(content.text)
    }
  }
  return out
}

const modelsMap: {
  [key: string]: (
    prompt: string,
    model: string,
    n: number
  ) => Promise<string[]>
} = {
  "llama3-8b-8192": generateGroqResponse,
  "claude-3-5-sonnet-20240620": generateAnthropicResponse,
}

export const generateComponent = async (
  prompt: string,
  componentName: string,
  model: string = "llama3-8b-8192",
  options: number = 4
): Promise<string[]> => {
  console.log(`Generating ${options} components`)
  const userMessage = `
  I'd like you to generate a typescript React component for me. 
  Here's what it should do:
  ${prompt}

  You can use the components from the components object in the starter code.
  These are Material UI Components. Copy the starter code and add your additions
  by the "YOUR CODE HERE" comment. Do not add any other imports or require statements.

  Use CSS in the TSX tags. Use flex for layout.

  The final component must be called ${componentName}.

  Here's the starter code:
  \`\`\`typescript
  import { useState } from "react"
  const components = require("./generativeComponents")
  console.log(components)
  const {
    Button,
    Switch
  } = components

  const ${componentName} = () => {
    // YOUR CODE HERE
  }
    \`\`\`
  `

  const modelFunction = modelsMap[model]
  if(!modelFunction) {
    throw new Error(`Model ${model} not found`)
  }
  const completions = await modelFunction(userMessage, model, options)

  const preparedOptions: string[] = []
  for(const codeOption of completions){
    try {
      const extractedCode = codeOption?.split("```typescript")[1].split("```")[0]
      if(!extractedCode) {
        console.error("Could not extract code")
        continue
      }
      console.log("Extracted code")
      console.log(extractedCode)
      preparedOptions.push(extractedCode)
    }
    catch(e) {
      console.error("Could not extract code")
      console.log(codeOption)
      continue
    }
  }

  return preparedOptions
}