import React, { Fragment, useEffect, useState, useCallback, memo } from 'react';
import { api } from '../axios';
import { useCart } from '../Hooks/Hooks';
import toast from 'react-hot-toast';
import Cart from './Cart';
import Navbar from './Navbar';
import PropTypes from 'prop-types';

// Utility function to truncate text
const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

const ProductCard = memo(({ item, addToCart }) => {
    const rating = item.rating?.rate;
    const truncatedTitle = truncateText(item.title, 30); // Adjust the length as needed

    return (
        <div key={item.id} className="w-full p-4 bg-white shadow-md rounded-lg">
            <div className='w-full h-48 overflow-hidden rounded-t-lg'>
                <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
            </div>
            <div className='text-center w-full mt-4'>
                <p className="text-lg font-semibold text-gray-700">{truncatedTitle}</p>
                <div className='flex flex-col items-center mt-2'>
                    <p className={`flex items-center ${rating < 2 ? "text-red-600" : rating >= 2 && rating < 4 ? "text-yellow-500" : "text-green-500"}`}>
                        {rating} <i className='fa fa-star ml-1' />
                    </p>
                    <p className="text-xl font-bold text-gray-800 mt-2">${item.price}</p>
                </div>
                <button onClick={() => addToCart(item)} className='mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-2 rounded-md transition duration-200'>
                    <i className='fa fa-cart-shopping mr-2' /> Add to Cart
                </button>
            </div>
        </div>
    );
});

ProductCard.propTypes = {
    item: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
};

const ApiCalling = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cartList, setCartList } = useCart();

    const getProducts = async () => {
        try {
            const { data: response } = await api.get("/products");
            setProducts(response);
        } catch (error) {
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const addToCart = useCallback((product) => {
        const index = cartList.findIndex((item) => item.id === product.id);
        if (index > -1) {
            const res = cartList.map(item => {
                if (item.id === product.id) {
                    return {
                        ...item,
                        qty: item.qty + 1,
                        total_price: item.price * (item.qty + 1)
                    };
                }
                return item;
            });
            setCartList(res);
            toast.success("Product quantity updated");
        } else {
            product.qty = 1;
            product.total_price = product.price;
            setCartList([product, ...cartList]);
            toast.success("Product added to cart");
        }
    }, [cartList, setCartList]);

    if (loading) {
        return <p className="text-center text-lg text-gray-500">Loading products...</p>;
    }

    return (
        <Fragment>
            <Navbar />
            <div className="container mx-auto py-10">
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20'>
                    {products.map(item => (
                        <ProductCard key={item.id} item={item} addToCart={addToCart} />
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export default ApiCalling;
