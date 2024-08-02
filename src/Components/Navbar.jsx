import React from 'react'
import { Link } from 'react-router-dom'
import Cart from './Cart'

export default function Navbar( {cart} ) {
  return (
    <div>
        <nav className="w-full flex justify-between bg-white fixed h-14 items-center p-6 font-bold">
           <div>
            <img src="https://img.freepik.com/free-vector/circular-fashion-logo-template_23-2150205300.jpg?ga=GA1.1.185074254.1716797952&semt=ais_hybrid" alt=""  className='h-14 w-14'/>
           </div>
           <div>
            {
                cart ?<Link to={"/"}>HOME</Link>:<Link to={"/cart"}>CART    </Link>
            }
           </div>
        </nav>
    </div>
  )
}
