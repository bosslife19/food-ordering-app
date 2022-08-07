import React, {useContext, useState, useEffect} from 'react'
import './PaystackForm.css'
import {PaystackButton} from 'react-paystack'
import { useHistory } from 'react-router-dom'
import {AppContext} from '../../context/context'

import axios from 'axios'
// import { axiosInstance } from '../../config'





function PaystackForm() {
    const {name, price, email, phone, dish, address, payment, dispatch} = useContext(AppContext)
      
    const history = useHistory()
    const [publicKey, setPublicKey] = useState('');
    
    useEffect(() => {
        getKey();
        
    }, [publicKey])
    const getKey = async () => {
       const resp =  await axios.get('/api/key')
       
       setPublicKey(resp.data)
      
    }
    
    const componentProps = {
        email,
        amount: price * 100,
        metadata: {
          name,
          phone,
        },
        publicKey,
        text: "Pay With Paystack",
        onSuccess:async () =>{
            const response = await axios.post('/api/order', {
                name, price, email, phone, dish, address, payment, 
            })
            if(response.data){
                dispatch({type: 'CREATE_NEW_ORDER', payload: response.data})
                
                
                dispatch({type: 'SET_PAID'})
                history.push('/success')
                 await axios.post('/api/mail', {email, name})
            
            }
            
        },
        onClose: () => alert("Wait! Don't leave :("),
      }

      
  return (
    <div className="paystackWrapper">
        <form>
            <label htmlFor="name">
                Name:
            </label>
            <input type="text" value={name}/>

            <label htmlFor="email">
                Email:
            </label>
            <input type="text"  value={email}/>

            <label htmlFor="Phone no">
                Phone No :
            </label>
            <input type="text" value={phone}/>

            <label htmlFor="dish">
                Dish Ordered:
            </label>
            <input type="text" value={dish} />

            <label htmlFor="price">
                Price:
            </label>
            <input type="number" value={price}/>

        </form>
        <PaystackButton className="paystackButton" {...componentProps}/>
    </div>
  )
}

export default PaystackForm