import React, { useState } from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'

function Navbar () {
  
    const [toggle, setToggle] = useState(false);
    const handleToggle = () => {
      setToggle(prevState => !prevState);
    }

  
  return (
    <div className = 'brandContainer'>
        <h1 className="brand">WoksFoods</h1>
        <ul className ={toggle?'navList open': 'navList'} >
            <Link to="/" className="link"><li>Home</li></Link>
            
            <Link to="/admin" className="link"><li>Admin-Page</li></Link>

        </ul>
        
        <div className="burger" onClick ={handleToggle}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>

    </div>
  )
}

export default Navbar