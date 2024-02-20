import React, { useState } from 'react'
import { auth } from '../config/Config'
import { Link, useNavigate  } from 'react-router-dom'
import Header from "./Header";
import  Footer  from './Footer';

export const Login = () =>{
    const navigate = useNavigate(); 
    //Déclare les etat pour mail mdp et msg d'erreur
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = (e) => {
        //empeche le rechargement de la page
        e.preventDefault();
        //auth de l'user (mail mdp)
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setEmail('');
            setPassword('');
            setError('');
            navigate('/'); 
           console.log('tes co')
        }).catch(err => setError(err.message));//msg d'erreur lors de la connexion
    }
    return (
        <div className='tous'>
            <Header/>
        
            <div className='container'>
                <br />
                <h2>Login</h2>
                <br />
                <form autoComplete="off" className='form-group' onSubmit={login}>
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required
                        onChange={(e) => setEmail(e.target.value)} value={email} />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control' required
                        onChange={(e) => setPassword(e.target.value)} value={password} />
                    <br />
                    <button type="submit" className='btn btn-success btn-md mybtn'>LOGIN</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
                <br/>
                <span>Tu n'as pas de compte. Clique &nbsp;
                    <Link to="signup">Ici</Link>
                </span>
            </div>
            <Footer/>
        </div>
      
    )
}

export default Login