import React, { createContext, useReducer } from 'react'
import { CartReducer } from './CartReducer'

export const CartContext = createContext();
// createContext permet de partager des données de plusieur composant du meme arbre

export const CartContextProvider = (props) => {
    //Le CartReducer spécifie comment les actions affectent l'état du panier.
    const [cart, dispatch] = useReducer(CartReducer, { shoppingCart: [], totalPrice: 0, totalQty: 0 })

    return (
        <CartContext.Provider value={{ ...cart, dispatch }}>
            {props.children}
        </CartContext.Provider>
    )
}