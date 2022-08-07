import React, {useState, useContext, useEffect} from 'react'
import './Admin.css'
import profilepic from '../../images/pexels-djordje-cvetkovic-6389804.jpg'
import Order from '../../components/Order/Order'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import axios from 'axios'
import {AppContext} from '../../context/context'
import {Link} from 'react-router-dom'
// import { axiosInstance } from '../../config'
 


function Admin() {
    const [name, setName] = useState('')
    const [file, setFile] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')
    const [success, setSuccess] = useState(false)

    

    const {menu, dispatch, order, fetchOrders,fetchMenus} = useContext(AppContext)
    
    useEffect(()=>{
        fetchMenus();
        fetchOrders();

    }, [])
    
    
const handleSubmit = async (e)=>{
    e.preventDefault();
   const newUpload = {
    name,
    price,
    desc,
    
    
   }
   if(file){
    // const newImage = new FormData()
    // const filename =  Date.now() + file.name;
    // newUpload.photo = filename;
    // newImage.append('name', filename);
    // newImage.append('file', file)
    // try{
    //     const res = await axios.post('/upload', newImage)
    //     console.log(res)
     
    // }
    // catch(err){
    //     console.log(err)
    // }
    const newImage = new FormData()
   
    
  
    newImage.append('file', file)
    newImage.append('upload_preset', 'food-ordering-app');
    newImage.append('cloud_name', 'wokodavid')
    try{
        // newUpload.photo = newImage
        const res = await axios.post('https://api.cloudinary.com/v1_1/wokodavid/image/upload'
        , newImage)
        console.log(res)
        newUpload.photo = res.data.url;
        console.log(res.data.url, newUpload.photo)
    }
   catch(err){
    console.log(err)
   }
    
   }
   else{
    alert('Please include an image')
   }
   try{
    const res = await axios.post('/api/menu', newUpload)
    if(res.data){
        setName('');
        setDesc('')
        setFile(null)
        setPrice('')
     }
    dispatch({type: 'CREATE_MENU', payload: res.data})
    setSuccess(true);
    setTimeout(() =>{
        setSuccess(false)
        

    },4000);
   }
   catch(err){
    console.log(err)
   }
    

}

const handleLogout = ()=>{
    dispatch({type: 'LOGOUT'})
}

 return (
    <div className="adminWrapper">
        
        <div className="adminControl">
            <Link to ="/">Go back home</Link>
            <button onClick = {handleLogout} id="logout">logout</button>
            <div className="adminProfile">
                <img src={profilepic} alt="" />
            </div>
            <div className="addMenu">
                <h4>Add menu</h4>
                <form onSubmit={handleSubmit}>
                <label htmlFor="fileInput" style = {{fontSize: '10px', color: 'teal'}} className = 'label imgLabel'>
                    <i class="fa-solid fa-image"></i>Add image</label>
                <input type="file" id="fileInput" style = {{display: "none"}} className="writeTitle"
                onChange={(e)=>setFile(e.target.files[0])}
                />


                    <input type="text" placeholder="input menu name" onChange={(e)=>setName(e.target.value)}
                    value={name}/>

                    <input type="number" placeholder="input menu price" 
                    onChange={(e)=>setPrice(e.target.value)} value={price}/>

                    <input type="text"  placeholder="brief description" 
                    onChange={(e)=>setDesc(e.target.value)} value={desc}/>

                    <button>Add to menu</button>

                    {success && <p style={{color: 'green', marginLeft: 100, marginTop:10}}>Successfully Added</p>}
                </form>
            </div>
            <h1 id="h1">Orders</h1>
            <div className="orders">
                
                {order && order.map(o=>(
                    <Order order={o} key={o._id} />
                ))}
                
            </div>
                
            
        </div>
        <div className="adminEffect">
            <h3 className="h3">Available Menu</h3>
            {menu.map((m)=>(
                <AdminMenu menu={m} key={m._id} />
            ))}
            
        </div>
    </div>
  )
}

export default Admin