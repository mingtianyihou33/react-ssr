import React from 'react'
import { Route } from 'react-router-dom'

function Status ({ code, children }) {
  return (
    <Route render={({ staticContext }) => {
      if (staticContext) staticContext.code = code
      return children
    }}/>
  )
}

export default function NotFound () {
  return (
    <Status code={404}>
      <div>
        <h1>page not found</h1>
      </div>
    </Status>
  )
}
