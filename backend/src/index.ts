import dotEnvFlow from "dotenv-flow"
dotEnvFlow.config()

import express from 'express'
import { renderAppToString } from './frontend/renderApp'
import fs from 'fs'
import { buildComponent } from './runtimeBuild'
import { generateComponent } from "./Genration"

const app = express()
const port = 3000



app.get('/', (req, res) => {
  //read index.html
  const indexHtml = fs.readFileSync('public/index.html', 'utf8')
  const reactComponent = renderAppToString()

  //const page = indexHtml.replace('<div id="root"></div>', `<div id="root">${reactComponent}</div>`)

  res.send(indexHtml)
})

app.use(express.static('public'))

app.get('/app', (req, res) => {
  const html = renderAppToString()
  res.send(html)
})

const testString = `
  import { useState } from "react"
  const components = require("./generativeComponents")
  console.log(components)
  const {
    Button:Button97,
    Switch:Switch97
  } = components

  const Counter = () => {
    const [count, setCount] = useState(0)
    const [goingUp, setGoingUp] = useState(true)

    return (
      <div style={{ fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#EEEEEE', padding: '1rem', borderRadius: '0.5rem' }}>
        <span>You clicked {count} times</span>
        <Button97 onClick={() => setCount(count + (goingUp ? 1 : -1))}>
          Click me
        </Button97>
        <Switch97 checked={goingUp} onChange={(e) => setGoingUp(e.target.checked)} />
      </div>
    )
  }
`

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

app.get('/getCounter', async (req, res) => {
  const prompt = "I want you to generate a counter component with a switch so it can count up or down. Make the buttons red."
  const code = await generateComponent(prompt)
  const builtCounter = await buildComponent({
    sourceCode: code,
    name: 'Counter',
  })
  res.status(200).send(builtCounter)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
});