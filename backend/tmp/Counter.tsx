
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
