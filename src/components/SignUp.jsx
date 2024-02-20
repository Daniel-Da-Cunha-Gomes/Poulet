import React, { useState } from "react";
import Header from "./Header";
import { auth, db } from '../config/Config';
import '../css/SignUp.css';
import  Footer  from './Footer';
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
    //pour se balader dans les page
    const navigate = useNavigate(); 

    //pour stocker les données
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signup = (e) => {
        //empeche le rechargement de la page
        e.preventDefault();
        // Créa d'un nv user avec une adresse e-mail et un mdp
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            db.collection('ListUser').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password
            }).then(() => {
                setName('');
                setEmail('');
                setPassword('');
                setError('');
                navigate('/login'); 
                console.log('ça passe')
            }).catch(err => setError(err.message));
        }).catch(err => setError(err.message));
    }

    return (
        <div className="tous">
            <Header />
            <div className="container">
                <br />
                <h2>Crée son compte</h2>
                <br />
                <form autoComplete="off" className="Form-group" onSubmit={signup}>
                    <label htmlFor="Name">Nom</label>
                    <br />
                    <input type="text" className="form-control" required onChange={(e) => setName(e.target.value)} value={name} />
                    <br />
                    <label htmlFor="Email">Email</label>
                    <br />
                    <input type="Email" className="form-control" required onChange={(e) => setEmail(e.target.value)} value={email} />
                    <br />
                    <label htmlFor="password">Mots de passe</label>
                    <br />
                    <input type="password" className="form-control" required onChange={(e) => setPassword(e.target.value)} value={password} />
                    <br />
                    <button type="submit" className="btn btn-success btn-md "> Se connecter</button>
                    <br />
                </form>
                {error && <div className="error-message">{error}</div>}
                <br />
                <span>
                    T'a déjà un compte? Login&nbsp;
                    <Link to="login">ici</Link>
                </span>
            </div>
            <Footer/>
        </div>
    )
}

export default SignUp;
