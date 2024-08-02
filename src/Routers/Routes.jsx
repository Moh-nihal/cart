import React from 'react'
import{BrowserRouter,Route,Routes} from 'react-router-dom'
import ApiCalling from '../Components/ApiCalling'
import Cart from '../Components/Cart'

export default function Router() {
  return (  
    <BrowserRouter>
    <Routes>
        <Route path='/' Component={ApiCalling}/>
        <Route path='/cart' Component={Cart}/>
    </Routes>
    </BrowserRouter>
    
  )
}
