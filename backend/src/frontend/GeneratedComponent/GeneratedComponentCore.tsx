
const components = require("../generativeComponents")
const {
  Button,
  Switch
} = components

const Component:React.FC = () => <>
  <span>Nothing Loaded</span>
</>



export const loadComponent = async (
  code: string
) => {
  eval(code)
}

export default Component