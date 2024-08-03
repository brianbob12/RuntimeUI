import dotEnvFlow from "dotenv-flow"
dotEnvFlow.config()

import express from 'express'
import { renderAppToString } from './frontend/renderApp'
import fs from 'fs'
import { buildComponent } from './runtimeBuild'
import { generateComponent } from "./Genration"
import { z } from "zod"

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

const getComponentQuery = z.object({
  prompt: z.string(),
  componentName: z.string(),
  importFileName: z.string(),
})


const GENERATE_MODEL = "claude-3-5-sonnet-20240620"
const GET_COMPONENTS_OPTIONS = 1

app.get('/getComponent', async (req, res) => {
  const { success, data, error } = getComponentQuery.safeParse(req.query)
  if(!success){
    res.status(400).send(error)
    return
  }
  try{
    const codeOptions = await generateComponent(
      data.prompt,
      data.componentName,
      GENERATE_MODEL,
      GET_COMPONENTS_OPTIONS,
    )
    const builtComponentPromises = codeOptions.map((code) => {
      const builtComponentPromise = buildComponent({
        sourceCode: code,
        componentName: data.componentName,
        importFileName: data.importFileName,
      })
      return builtComponentPromise
    })

    const builtComponents = []
    for(const builtComponentPromise of builtComponentPromises){
      try{
        const builtComponent = await builtComponentPromise
        builtComponents.push(builtComponent)
      }
      catch(e){
        console.error("Failed to build component")
        console.error(e)
      }
    }
    console.log(`Successfully built ${builtComponents.length}/${codeOptions.length} components`)
    if(builtComponents.length === 0){
      res.status(500).send("Failed to build component")
      return
    }

    res.status(200).send(builtComponents[0])
  }
  catch(e){
    console.error(e)
    res.status(500)
    return
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
});