const components = require("./generativeComponents")
const {
  Button,
  Switch
} = components

const Counter:React.FC = () => <>
  <span>Didn't work</span>
</>

export const loadCounter = async () => {
  const response = await fetch('/getCounter')
  const counterText = await response.text()
  eval(counterText)
}

export default Counter