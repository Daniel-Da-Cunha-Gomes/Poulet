import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Ajout from "./components/Ajout";
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Cart from "./components/Cart";
import './index.css'
import { ProduitcontextProvider } from "./global/Produitcontext";
import {auth, db} from './config/Config'
import { CartContextProvider } from "./global/CartContext";

export class App extends Component {

  state={
    user: null
  }
  componentDidMount(){
    auth.onAuthStateChanged(user =>{
      if(user){
        db.collection('ListUser').doc(user.uid).get().then(snapshot=>{
          this.setState({
            user : snapshot.data().Name
          })
        })
      }
      else{
        this.setState({
          user : null
        })
      }
    })
  }
  render() {
    return (
      <ProduitcontextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Routes> 
              <Route exact path='/' element={<Main user={this.state.user} />} />

              <Route exact path='/ajout' element={<Ajout />} /> 
              <Route exact path='/login' element={<Login />} /> 
              <Route exact path='/signup' element={<SignUp />} /> 
              <Route exact path='/cart' element={<Cart user={this.state.user} />} />

            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </ProduitcontextProvider>
    );
  }
}

export default App;
