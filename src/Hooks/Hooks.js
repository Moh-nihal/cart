import { useContext } from "react"
import { CartContext } from "../Provider/CartProvider"

export const useCart = () => {
    return useContext(CartContext)
}