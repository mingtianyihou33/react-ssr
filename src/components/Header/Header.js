import React, { useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../router'
import './header.css'

export default function Header () {
  return (
    <div>
      {
        routes.map(
          item => {
            return item.title ? <Link className='link' to={item.path} key={item.key}>{item.title}</Link> : ''
          }
        )
      }
      <Link className='link' to='/xxx'>不存在</Link>
    </div>
  )
}
