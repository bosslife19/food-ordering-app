import React, {useState, useContext} from 'react'
import './OrderForm.css'

import { AppContext } from '../../context/context';
import {useHistory} from 'react-router-dom'
// import { axiosInstance } from '../../config';
import axios from 'axios'
function OrderForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  
  const [payment, setPayment] = useState('Paystack');
  const history = useHistory();
  const {dispatch, dish, price} = useContext(AppContext)

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: 'SEND_USER_DETAILS', payload: {name, email, phone, address, payment}})
    const newOrder = {
      name, email, address, phone, dish, price, payment
    }
    
    if(payment==='Paystack'){
      
      history.push('/paystackForm')
    }
    else{
      const res = await axios.post('/api/order', newOrder)
      if(res.data){
       dispatch({type: 'CREATE_NEW_ORDER', payload: res.data})
       const response = await axios.post('/api/mail', {email, name})
       if(response.data){
        dispatch({type: 'SET_PAID'})
         history.push('/success')
       }
       
      }
    }
   
  }
  return (
    <div className="orderFormWrapper">
        <h1>Order Details</h1>
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" placeholder="enter your name" onChange={(e) =>setName(e.target.value) }/>
            <label>Email:</label>
            <input type="email" placeholder="enter your email" 
            onChange={(e) =>setEmail(e.target.value) }/>
            <label>Home Address:</label>
            <input type="text" placeholder="enter your Address" 
            onChange={(e) =>setAddress(e.target.value) }/>
            <label>Phone number:</label>
            <input type="number" placeholder="enter your Phone number" 
            onChange={(e) =>setPhone(e.target.value) }/>
            <label>Dish Ordered:</label>
            <input type="text" value ={dish} readOnly = {true}
            />
            <label>Price:</label>
            <b><input type="text" value={`${price} Naira`} readOnly ={true}/></b>
            <label>Mode of Payment:</label>
            <select onChange={(e) =>setPayment(e.target.value) } value ={payment}>
              
              
              <option value="Paystack">PayStack</option>
              <option value="cash">Cash on Delivery</option>
            </select>
            <button>Place Order</button>
        </form>
    </div>
  )
}

export default OrderForm