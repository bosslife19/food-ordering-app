import React, {useContext,} from 'react'
import './Order.css'

import {AppContext} from '../../context/context'
// import { axiosInstance } from '../../config'
import axios from 'axios'
 
function Order({order}) {
  const {dispatch} = useContext(AppContext)
 
  const handleClick = async() => {
    const res = await axios.delete('/api/order/' + order._id)
   

    
    
    if(res.data){
      dispatch({type: 'DELETE_ORDER', payload: res.data})
    }
  }
  return (
    <div className="orderWrapper">
        
        <h4><strong>{order.name}</strong></h4>
        <p><strong>Dish Ordered:</strong>{order.dish}</p>
        <p><strong>date ordered:</strong>{new Date(order.createdAt).toDateString()}</p>
        <p><strong>Address:</strong>{order.address}</p>
        <p><strong>Mode of Payment:</strong>{order.payment}</p>
        <button onClick = {handleClick}>delete</button>


    </div>
  )
}

export default Order