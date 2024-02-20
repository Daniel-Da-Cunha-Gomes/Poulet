import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../global/CartContext';
import { Header } from './Header';
import  Footer  from './Footer';
import '../css/Cart.css';
import { Icon } from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';
import QRCode from 'qrcode.react'; // Importez la bibliothèque pour générer le QR code
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/Config';

const Cart = ({ user }) => {
    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
    //etat du popup
    const [showPopup, setShowPopup] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);
    const navigate = useNavigate();
//user co?
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                navigate('/login');
            }
        });
    }, [navigate]);

    //génére le num aléatoire pour la commande
    const generateOrderNumber = () => {
        const number = Math.floor(1000000 + Math.random() * 9000000); // Génère un numéro aléatoire à 7 chiffres
        setOrderNumber(number);
        setShowPopup(true);
    };

    return (
        <>
            <Header user={user} />
            
            <>
                {shoppingCart.length !== 0 && <h1>Cart</h1>}
                <div className='cart-container'>
                    {shoppingCart.length === 0 && (
                        <>
                            <div>Vas prendre des trucs la tu force</div>
                            <div>
                                <Link to="/">Page d'acceuille</Link>
                            </div>
                        </>
                    )}
                    {shoppingCart &&
                        shoppingCart.map(cart => (
                            <div className='cart-card' key={cart.productID}>
                                <div className='cart-img'>
                                    <img src={cart.productImg} alt="not found" />
                                </div>
                                <div className='cart-name'>{cart.productName}</div>
                                <div className='cart-price-orignal'>$ {cart.productPrice}.00</div>
                                <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.productID, cart })}>
                                    <Icon icon={ic_add} size={24} />
                                </div>
                                <div className='quantity'>{cart.qty}</div>
                                <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.productID, cart })}>
                                    <Icon icon={ic_remove} size={24} />
                                </div>
                                <div className='cart-price'>$ {cart.TotalProductPrice}.00</div>
                                <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.productID, cart })}>
                                    <Icon icon={iosTrashOutline} size={24} />
                                </button>
                            </div>
                        ))}
                    {shoppingCart.length > 0 && (
                        <div className='cart-summary'>
                            <div className='cart-summary-heading'>Ticket de caisse</div>
                            <div className='cart-summary-price'>
                                <span>Prix Total</span>
                                <span>{totalPrice}</span>
                            </div>
                            <div className='cart-summary-price'>
                                <span>Nombre de plat</span>
                                <span>{totalQty}</span>
                            </div>
                            <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }} onClick={generateOrderNumber}>
                                Générer le Numéro de Commande
                            </button>
                        </div>
                    )}
                </div>
            </>
            {showPopup && (
                <div className='popup'>
                    <div className='popup-inner'>
                        <h2>Numéro de commande</h2>
                        <p>Ton numéro:</p>
                        <p>{orderNumber}</p>
                        <QRCode value={orderNumber.toString()} />
                        <div>
                        <Link to = '/' className="navlinks"><button onClick={() => setShowPopup(false)}>fermer</button></Link>
                        </div>
                        
                    </div>
                </div>
            )}
            <Footer/>
        </>
    );
};

export default Cart;
