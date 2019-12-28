import React from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

export default function WithStyle (Com, styles) {
  function NewComp (props) {
    if (props.staticContext) {
      props.staticContext.css.push(styles._getCss())
    }
    return (
      <Com {...props}></Com>
    )
  }

  hoistNonReactStatic(NewComp, Com)
  return NewComp
}
