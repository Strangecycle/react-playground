import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../store/types'

function Login() {
  const state = useSelector((state: RootState) => ({
    user: state.user,
  }), shallowEqual)

  console.log('state :>> ', state)

  return (
    <div className="Login">
      <h1 className="text-blue-500 text-6xl">Hello there!</h1>
    </div>
  )
}

export default Login
