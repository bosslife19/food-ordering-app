 const appReducer = (state, action) => {
switch(action.type){
    case "GET_ALL_MENUS": 
      return {
        ...state,
        menu: action.payload
      }
      case "CREATE_MENU":
        
        return{
          ...state,
          menu: [action.payload, ...state.menu]
          
        }
      case "DELETE_MENU":
        return{
          ...state,
          menu: state.menu.filter((m)=> m._id !== action.payload._id)
        }
      case 'UPDATE_MENU':
       let found = state.menu;
       
       const index = found.findIndex(i=>i._id ===action.payload._id)
       found[index] = action.payload;
       
      return{
        ...state,
       menu: [...found]
      }
      case 'GET_ALL_ORDERS':
        return{
          ...state,
          order: [...action.payload]
        }
      case 'CREATE_NEW_ORDER':
        
        return{
          ...state,
        
          order: [...state.order, action.payload],
          
          
        }
      case  'SEND_TO_FORM':
        return{
          ...state,
          dish: action.payload.dish,
          price: action.payload.price
        }
      case 'SEND_USER_DETAILS': 
     
      return{
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        address: action.payload.address,
        payment: action.payload.payment
      }
      
      case 'DELETE_ORDER':
        return{
          ...state,
          order: state.order.filter(o=> o._id !== action.payload._id),
            
        }
        case 'CREATE_USER':
        
        return{
          ...state,
          user: action.payload
        }
      
        case 'LOGOUT':
        return{
          ...state,
          user: null
        }
        
        case 'SET_PAID':
          return{
            ...state,
            paid: true
          }

      default: return state;
}
}

export default appReducer