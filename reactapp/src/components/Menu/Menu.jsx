import React, {useContext} from 'react'
import './Menu.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { AppContext } from '../../context/context'

function Menu({menu}) {
  
  const {dispatch} = useContext(AppContext)
  
  const handleClick = (e) => {
    dispatch({type: 'SEND_TO_FORM', payload: {dish: menu.name, price: menu.price}})
  }
  return (
    <div className = 'menuWrapper'>
        <div className="imgWrapper">
          <p>{menu.name}</p>
          <img src={menu.photo} alt="" />
          <p>price: &#8358;{menu.price}</p>
          <Link to ="/order" className="link menuLink" onClick={handleClick}>order now</Link>

          <p id="desc">{menu.desc}</p>
        </div>
    </div>
  )
}

export default Menu