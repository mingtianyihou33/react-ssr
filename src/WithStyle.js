import React from 'react'
import styles from './view/Home.css'

export default function WithStyle (Com, styles) {
  return function (props) {
    if (props.staticContext) {
      props.staticContext.css.push(styles._getCss())
    }
    return (
      <Com {...props}></Com>
    )
  }
}
