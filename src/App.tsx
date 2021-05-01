import React from 'react'
import { Route } from 'react-router'
import Welcome from './views/Welcome'

function App() {
  return (
    <div className="App">
      <Route path="/" component={Welcome} />
    </div>
  )
}

export default App
