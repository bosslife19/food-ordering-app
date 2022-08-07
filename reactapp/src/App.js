import './App.css';
import Navbar from './components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Admin from './Pages/Admin/Admin'
import Login from './Pages/Login/Login'

import React, {useContext} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import OrderForm from './Pages/OrderForm/OrderForm';
import {AppContext} from './context/context'
import PaystackForm from './Pages/PaystackForm/PaystackForm';
import Success from './Pages/Success/Success';






function App() {
  const {user, paid} = useContext(AppContext)
  return (
    <div>
      <Router>
      
 
    <Switch>
    
      <Route exact path="/">
      <Navbar/>
        <Home/>
      </Route>
      <Route exact path="/login">
      
        <Login/>
      </Route>
      
       <Route path="/admin">
        {user? <Admin/>: <Login/>}
      </Route>
      <Route path="/order">
      <Navbar/>
        <OrderForm/>
      </Route>
      <Route path ='/paystackForm'>
        <Navbar/>
        <PaystackForm/>
      </Route>
      <Route path="/success">
        {paid? <Success/> : <PaystackForm/>}
      </Route>
    </Switch>
    </Router>

    </div>
  )
}

export default App




