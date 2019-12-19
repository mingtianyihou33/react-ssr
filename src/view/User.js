import React from 'react'
import { Redirect } from 'react-router-dom'

export default function User () {
  return (
    <Redirect from='/user' to='about'/>
  )
}
