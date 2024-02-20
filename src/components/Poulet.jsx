import React, {useContext} from "react";
import { Produitcontext } from "../global/Produitcontext";
import '../css/Poulet.css'
import { CartContext } from "../global/CartContext";

export const Poulet = () =>{
  //context produit
  const {products} = useContext(Produitcontext);
  // console.log(products);
  
  // const data = useContext(CartContext);
  // console.log(data);
  //acceder au context du panier
  const {dispatch} = useContext(CartContext);

    return (
       <>
            {products.length !== 0 && <h1>Nos Produits</h1>}
            <div className='products-container'>
                {products.length === 0 && <div>Veuillez patienter, les poulets sont en train de se faire charcuter.</div>}
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.productImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.productName}
                        </div>
                        <div className='product-price'>
                            $ {product.productPrice}.00
                    </div>
                        <button className='addcart-btn' onClick={()=>( dispatch ({type: 'ADD_TO_CART', id: product.ProductID, product}))} >Ajouter au panier</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Poulet