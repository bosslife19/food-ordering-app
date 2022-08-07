import  {useReducer, createContext, useEffect} from 'react'
import React from 'react';
import axios from 'axios'
import  appReducer  from "./reducer"

 export const AppContext = createContext();
 const initialState = {
    menu: [],
    order: [],
    dish: '',
    price: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    payment: '',
    paid: false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    
    
}

 export function AppProvider({children}){
   
    const [state, dispatch] = useReducer(appReducer, initialState)

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user])

    const fetchMenus = async () => {
        const res = await axios.get('/api/menu')
        
        dispatch({type: 'GET_ALL_MENUS', payload: res.data})
        
    }

    const fetchOrders = async ()=>{
        const res = await axios.get('/api/order')
        
        dispatch({type: 'GET_ALL_ORDERS', payload: res.data})
    }
    
    
    
    return(
        <AppContext.Provider value ={{...state, fetchMenus, dispatch, fetchOrders}}>
            {children}
        </AppContext.Provider>
    )
}

