import React, { useState } from "react";
import Header from "./Header";
import QRCode from 'qrcode.react';
import '../css/Ajout.css'
import { stock, db } from "../config/Config"
import '../index.css'

export const Ajout = () =>{

    const [productName, setProductName] = useState(''); //stock Nom
    const [productPrice, setProductPrice] = useState(0); //stock Prix
    const [productImg, setProductImg] = useState(null); //stock img
    const [error, setError] = useState(''); // stock les error
    const [qrData, setQrData] = useState(''); // stock les données du code QR
    const [orderNumber, setOrderNumber] = useState(''); // stock le numéro de commande

    const types = ['image/png', 'image/jpeg']
    //prend que les png et jpeg

    const productImgHandler = (e) =>{
        let selectedFile = e.target.files[0];
        if(selectedFile && types.includes(selectedFile.type)){
            setProductImg(selectedFile);
            setError('');
        }
        else{
            setProductImg(null)
            setError('Ajouter une Img SVP (png ou jpeg)')
        }
    }

    const generateRandomNumber = () => {
        return Math.floor(100000000 + Math.random() * 900000000);
    }

    const Ajout = (e) =>{
        e.preventDefault();

        const uploadTask = stock.ref(`Produit-img/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            console.log(progress);
        },err =>{
            setError(err.message)
        },()=>{
            stock.ref('Produit-img').child(productImg.name).getDownloadURL().then(url => {
                db.collection('Menu').add({
                    productName: productName,
                    productPrice: Number(productPrice),
                    productImg: url
                }).then((docRef) => {
                    
                    const randomNumber = generateRandomNumber();
                    // Mettre à jour l'état qrData avec le numéro aléatoire
                    setQrData(randomNumber.toString());
                    // Mettre à jour l'état de numéro de commande avec le numéro aléatoire
                    setOrderNumber(randomNumber.toString());
                    
                    // Réinitialiser les champs et les erreurs
                    setProductName('');
                    setProductPrice(0);
                    setProductImg('');
                    setError('');
                    document.getElementById('file').value = '';
                    
                }).catch(err => setError(err.message));
            })
        })
    }
    
    return (
        <div className="tous">
            <Header/>
            <div className="container">
                <div className="AddProduit">
                    <br/>
                    <h2>Ajout de Produits</h2>
                    <br/>
                    
                    <form autoComplete="off" className="from-group" onSubmit={Ajout}>
                        <label htmlFor="Produit-name">Nom du produit</label>
                        <br />
                        <input type="text" className="from-control" required
                        onChange={(e)=>setProductName(e.target.value)} value={productName}/>

                        <br />
                        <label htmlFor="Produit-prix">Prix du produit</label>
                        <br />
                        <input type="number" className="from-control" required
                        onChange={(e)=>setProductPrice(e.target.value)} value={productPrice}/>
                        <br />
                        <label htmlFor="Produit-img">Image du produit</label>
                        <br />
                        <input type="file" className="from-control" onChange={productImgHandler} id="file"/>
                        <br />
                        <button className="btn btn-success btn-md">Valider</button>
                    </form>
                    {error&&<span>{error}</span>}
                </div>

                {/* affiche le code QR et le numéro de commande */}
                {qrData && (
                    <div className="qrCodeContainer">
                        <h3>Code QR:</h3>
                        <QRCode value={qrData} />
                        <p>Numéro de produit : {orderNumber}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Ajout;
