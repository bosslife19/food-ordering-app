import React from 'react'
import Hero from '../../components/Hero/Hero'
import Menu from '../../components/Menu/Menu'
import { AppContext } from '../../context/context'
import { useEffect, useContext} from 'react'

import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

import './Home.css'


function Home() {
  const {menu, fetchMenus} = useContext(AppContext)
  const {search} = useLocation();
  useEffect(()=>{
    fetchMenus();
    
    
  }, [search])
  
 


  return (
    <div className='homeContainer'>
      
        <Hero/>
      
      
        
        <div className="menuContainer">
            {menu.map((menu)=>(
              <Menu menu={menu} key = {menu._id}/>
            ))}
            
        </div>
    </div>
  )
}

export default Home