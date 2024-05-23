/* eslint-disable no-unused-vars */
import React from 'react'
import logo from "../assets/logo.png"



function Welcome() {
  return (
    <div className='welcome-container'>
        <img src={logo} alt="Logo" className='welcome-logo'  />
        <p>View and text directly to people in present in the chat rooms</p>
    </div>
  )
}

export default Welcome