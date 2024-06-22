import App from "./App"
import { renderToString } from "react-dom/server"

export const renderAppToString = () => {
  const reactComponent = renderToString(<App />)
  return reactComponent
}

