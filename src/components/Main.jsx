import React , { useEffect } from "react";
import Header from "./Header";
import Poulet from "./Poulet";
import  Footer  from './Footer';
import { auth } from '../config/Config';
import { useNavigate  } from 'react-router-dom'

const Main = ({user}) => {
  const navigate = useNavigate(); 

  useEffect(() => {
    // forcing user to signup
    auth.onAuthStateChanged(user => {
        if (!user) {
            navigate('/login');
        }
    })
})

    return (
      <>
        <div className="Wrapper">
            <Header user={user}/>
            <Poulet/>
            <Footer/>
        </div>
      </>
    )
}

export default Main;
