import React, { Fragment, useEffect, useState } from 'react';
import { useCart } from '../Hooks/Hooks';
import Navbar from './Navbar';

const Cart = () => {

    const { cartList, setCartList } = useCart()
    const [superTotal, setSuperTotal] = useState(0)

    useEffect(() => {
        const sum = cartList.reduce((prevTotal, currentElement) => prevTotal + currentElement.total_price, 0)
        setSuperTotal(sum)
    }, [cartList])

    const handleRemove = (id) => {
        const response = confirm("Are you sure?")
        if (response) {
            const res = cartList.filter(item => item.id != id)
            setCartList(res)
        }
    }

    const handleQtyUpdate = (operator, id) => {
        const product = cartList.find(item => item.id === id)
        if (operator == "-" && product.qty == 1) {
            return handleRemove(id)
        }
        const res = cartList.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    qty: operator == "+" ? item.qty + 1 : item.qty - 1,
                    total_price: operator == "+" ? item.price * ( item.qty + 1 ) : item.price * ( item.qty - 1 )
                }
            }
            return item
        })
        setCartList(res)
    }

    return (
        <Fragment>
            <Navbar cart={true}/>
        <div className='flex gap-3 px-5 flex-col justify-center flex-wrap '>
            <h1 className='text-center text-white mt-20'>Cart Products</h1>
            <div className='flex gap-3 flex-wrap justify-center'>
                {
                    cartList.map(item => {
                        const rating = item.rating?.rate
                            return (
                                <div key={item.id} className="w-48 p-3 bg-white">
                                    <div className='w-full'>
                                        <img src={item.image} alt={item.title} className='aspect-square'/>
                                    </div>
                                    <div className='text-center w-full'>
                                        <p>{item.title.slice(0, 15)}...</p>
                                        <div className='flex justify-between mt-3'>
                                            <p className={`flex items-center ${rating<2 ? "text-red-600" : rating >= 2 && rating < 4 ? "text-yellow-600" : "text-green-600"}`}>{ rating } <i className='fa fa-star'/></p>
                                            <p>${ item.price }</p>
                                        </div>
                                        <div className='flex justify-between mt-4 items-center'>
                                            <button onClick={() => handleQtyUpdate("-", item.id)} className='text-white bg-green-600 w-10 h-10 '>-</button>
                                            <p>{item.qty}</p>
                                            <button onClick={() => handleQtyUpdate("+", item.id)} className='text-white bg-green-600 w-10 h-10 '>+</button>
                                        </div>
                                        <p className='text-center'>${ item.total_price.toFixed(2) }</p>
                                        <button onClick={() => handleRemove(item.id)} className='bg-red-600 p-1 mt-3 w-full text-white'><i className='fa fa-trash'/> Remove</button>
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
            <div className='mt-5 text-white flex justify-center mb-10'>
                <div className=''>
                    <p>${superTotal.toFixed(2)}</p>
                </div>
            </div>
            </div>
            </Fragment>
    );
}

export default Cart;