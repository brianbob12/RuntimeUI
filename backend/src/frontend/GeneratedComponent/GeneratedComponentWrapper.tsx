import { useQuery } from "@tanstack/react-query"
import queryString from "query-string"
import Component, { loadComponent } from "./GeneratedComponentCore"
import { useEffect, useState } from "react"


const componentName = "Component"
const importFileName = "GeneratedComponentCore"

const getComponentCode = async (
  prompt: string
) => {
  const URL = queryString.stringify({
    prompt,
    componentName,
    importFileName,
  })
  const response = await fetch(`/getComponent?${URL}`)
  const counterText = await response.text()
  return counterText
}

type GeneratedComponentWrapperProps = {
  prompt: string
  index: any
}

export const GeneratedComponentWrapper: React.FC<
  GeneratedComponentWrapperProps
  > = ({
  prompt,
  index
}) => {
  /**
   * Used to force a re-render of the component when the index changes
   */
  const [componentKeyPart1, setComponentKeyPart1] = useState(index)
  const [componentKeyPart2, setComponentKeyPart2] = useState(0)

  const codeQuery = useQuery({
    queryKey: ["code", prompt],
    queryFn: () => getComponentCode(prompt)
  })

  useEffect(() => {
    if(codeQuery.isSuccess) {
      loadComponent(codeQuery.data)
      setComponentKeyPart2(componentKeyPart2 + 1)
    }
  }, [codeQuery.data])

  useEffect(() => {
    try {
      codeQuery.refetch()
    }
    catch(e) {
      console.error(e)
    }
  }, [index])

  const componentKey = `${componentKeyPart1}-${componentKeyPart2}`

  if(codeQuery.isLoading) {
    return <>Loading...</>
  }
  if(codeQuery.isError) {
    return <>Error: ${codeQuery.error}</>
  }
  return <>
    <Component
      key = {componentKey}
    />
  </>
}