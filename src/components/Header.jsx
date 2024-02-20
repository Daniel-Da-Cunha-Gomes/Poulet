import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../img/LogoPoulet.png"
import '../css/Header.css'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import {auth} from '../config/Config'

export const Header = ({user}) =>{
  const navigate = useNavigate(); 

  const logout = () =>{
    auth.signOut().then(()=>{
      navigate('/login'); 
    })
  }
    return (
      <div className="NavBox">
        <div className="gauche">
            <img src= {logo} alt=""/>
        </div>
        {!user &&<div className="droite">
            <Link to='/signup' className='navlinks'>SIGN UP</Link>
            <Link to='/login' className='navlinks'>Login</Link>
        </div>}
        {user && <div className="rightside">
          <span><Link to = '/' className="navlinks">{user}</Link></span>
          <span><Link to = '/cart'><Icon icon = {cart}/></Link></span>
          <span><button className="logout-btn" onClick={logout}> Déconnexion</button></span>
          </div>}
      </div>
    )
}

export default Header