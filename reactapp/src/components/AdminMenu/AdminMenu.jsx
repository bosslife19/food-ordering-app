import React, {useContext, useEffect, useState} from 'react'
import './AdminMenu.css'

import {AppContext} from '../../context/context'
// import { axiosInstance } from '../../config'
import axios from 'axios'


function AdminMenu({menu}) {
  const [updateMode, setUpdateMode] = useState(false)
  const [name, setName] = useState(menu.name);
  const [price, setPrice] = useState(menu.price);
  const [desc, setDesc] = useState(menu.desc);
  const [ordered, setOrdered] = useState(false)
 
  
  const {dispatch, order,} = useContext(AppContext)
  
  useEffect(() => {
    
    order.map(o=>{
      
      if(o.dish === menu.name){
        
        setOrdered(true)
        
       
        
      }
      return ordered
    })
  }, [order])
 
  const handleClick = async () => {
    const res = await axios.delete('/api/menu/' + menu._id)
    
    if(res.data){
      dispatch({type: "DELETE_MENU", payload: res.data})
      
    }
  }

  const handleEdit = () => {
    setUpdateMode(true)
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const updatedMenu = {
      name, desc, price
    }
    const res = await axios.put('/api/menu/' + menu._id, updatedMenu)
    
    dispatch({type: 'UPDATE_MENU', payload: res.data})
    setUpdateMode(false)
  } 
  
  
  return (
    
      
        <div className="adminMenuWrapper">
          {
            updateMode ?(
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="edit title" value= {name} 
              onChange={(e)=>setName(e.target.value)}/>
              <input type="number" placeholder="edit price" value={price}
              onChange={(e)=>setPrice(e.target.value)}/>
              <input type="text" placeholder="edit description" value={desc}
              onChange={(e)=>setDesc(e.target.value)}/>
              <button>update</button>
            </form>

            ): (
          <>
              <button className="editButton" onClick={handleEdit}>edit menu</button>
        <h3>{menu.name}</h3>
        <p>{menu.desc}</p>
        <p><strong>Prize:</strong>&#8358;{menu.price}</p>
        <p><strong>Date Posted:</strong>{new Date(menu.createdAt).toDateString()}</p>
        <p><strong>Status:</strong>
        {ordered ? <>
        <span style={{color: 'green'}}>Ordered</span>
       
        </>
        : <span style={{color: 'red'}}>Not Ordered</span>}
        </p>

        <button onClick={handleClick} className="deletebutton">Delete Menu</button>
        </>
            )
          }
      
    </div>
      )
    
    
  
}

export default AdminMenu