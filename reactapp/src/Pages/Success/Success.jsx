import './Success.css'
import React, {useContext} from 'react'
import {AppContext} from '../../context/context'
import { Link } from 'react-router-dom'

function Success() {
    const {name, dish, address, } = useContext(AppContext)
    
  return (
    <div className="successWrapper">
      <h1>Success!</h1>
    <p>Dear, {name} Your order of {dish} was successful,  and it will be delivered to you within the hour at
     {address} by one of our dispatch riders. Check your email for confirmation</p>
    <p>Thank you for doing business with us!!!</p>
    <Link to="/" className="link successLink">Continue browsing</Link>
    </div>
  )
}

export default Success