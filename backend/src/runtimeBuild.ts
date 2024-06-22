import * as esbuild from "esbuild"
import fs from "fs"


type ImportDescription = {
  source:string,
  default:string,
  exports:string[]
}

type BuildComponentInputTypeOld = {
  sourceCode: string
  name: string
  allowedImports:ImportDescription[]
}

type BuildComponentInputType = {
  sourceCode: string
  name: string
}

const mockExportObject = (imported: ImportDescription):string => 
  `{${imported.exports.map(e => `${e}: ${e}`).join(", ")}}`



const sourceFolder = `${__dirname}/../tmp`

//const requireRegex = /(require\(['"])([a-zA-Z\-@_\/\.]+)(['"]\))/g
const nonDefaultRequireRegex = /((\{(\s{0,}\w+,){0,}(\s{0,}\w+\s{0,})\})|(\w+))(\s+=\s+)(require\(['"])([a-zA-Z\-@_\/\.]+)(['"]\))/g

export const buildComponentOld = async ({
  sourceCode,
  name,
  allowedImports
}: BuildComponentInputTypeOld):Promise<string> => {
  const fileName = `${name}.tsx`
  fs.writeFileSync(
    `${sourceFolder}/${fileName}`,
    sourceCode
  )

  const randomString = Math.random().toString(36).substring(2, 15)
  const buildFileName = `gen_${randomString}_${name}.cjs`

  const buildResult = await esbuild.build({
    entryPoints: [`${sourceFolder}/${fileName}`],
    format: "cjs",
    bundle: false,
    outfile: `${sourceFolder}/${buildFileName}`,
  })

  let cjsString = fs.readFileSync(`${sourceFolder}/${buildFileName}`, "utf8")

  //replace require react with something that'll use the existing react

  cjsString = cjsString.replace(
    /require\("react"\)/g,
    "__toESM(require_react(), 1)"
  )

  cjsString = cjsString.replace(
    /require\("react\/jsx-runtime"\)/g,
    "__toESM(require_jsx_runtime(), 1)"
  )

  let cjsStringRequiresReplaced = cjsString

  let execResult

  //find other requires
  while (execResult = nonDefaultRequireRegex.exec(cjsString)) {
    console.log(execResult)
    const [
      rawMatch,
      lhs,
      ,//2
      ,//3
      ,//4
      ,//5
      ,//6
      requireStart,//7 require("
      importName,
      requireEnd//8  ")
    ] = execResult

    const importDescription = allowedImports.find(i => i.source === importName)

    if(importDescription === undefined) {
      throw new Error(`Disallowed import ${importName} in ${name}`)
    }


    if (importDescription) {
      const thingToReplace = `${requireStart}${importName}${requireEnd}`
      cjsStringRequiresReplaced = cjsStringRequiresReplaced.replace(
        thingToReplace,
        mockExportObject(importDescription)
      )
    }
  }
  cjsString = cjsStringRequiresReplaced

  cjsString += `\n${name}_default = ${name};\n`

  return cjsString
}

const requireGenerativeComponentsRegex = /require\("\.\/generativeComponents"\)/g
const generativeComponentsReplacement = "(init_generativeComponents(), __toCommonJS(generativeComponents_exports))"

export const buildComponent = async ({
  sourceCode,
  name,
}: BuildComponentInputType):Promise<string> => {
  const fileName = `${name}.tsx`
  fs.writeFileSync(
    `${sourceFolder}/${fileName}`,
    sourceCode
  )

  const randomString = Math.random().toString(36).substring(2, 15)
  const buildFileName = `gen_${randomString}_${name}.cjs`

  const buildResult = await esbuild.build({
    entryPoints: [`${sourceFolder}/${fileName}`],
    format: "cjs",
    bundle: false,
    outfile: `${sourceFolder}/${buildFileName}`,
  })

  let cjsString = fs.readFileSync(`${sourceFolder}/${buildFileName}`, "utf8")

  //replace require react with something that'll use the existing react

  cjsString = cjsString.replace(
    /require\("react"\)/g,
    "__toESM(require_react(), 1)"
  )

  cjsString = cjsString.replace(
    /require\("react\/jsx-runtime"\)/g,
    "__toESM(require_jsx_runtime(), 1)"
  )

  //find and replace the import of components
  
  cjsString = cjsString.replace(requireGenerativeComponentsRegex, generativeComponentsReplacement)

  cjsString += `\n${name}_default = ${name};\n`
    
  return cjsString
}
