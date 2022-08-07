import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import './Hero.css'

function Hero() {
  return (
    <div className = "heroContainer">
        <h1>Place Your Yummy Order</h1>
        <button><Link to ="#" className="link">Contact Us</Link></button>

    </div>
  )
}

export default Hero