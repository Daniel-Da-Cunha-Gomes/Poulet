import React, {createContext} from "react";
import {db} from '../config/Config';

//contecte react pour stocker les produits
export const Produitcontext = createContext();

//classe de fournisseur de contexte de produit
export class ProduitcontextProvider extends React.Component {
    //initialisation etat local
    state={
        products:[]
    }

    componentDidMount(){
        // Copie des produits précédents
        const prevProducts = this.state.products;
        // Surveille les changements dans la collection Menu
        db.collection('Menu').onSnapshot(snapshot=>{
            // Récupération des changements
            let changes = snapshot.docChanges();
            changes.forEach(change=>{
                if(change.type==='added'){
                    // Ajout du nouveau produit à la liste
                    prevProducts.push({
                        productID: change.doc.id,
                        productName: change.doc.data().productName,
                        productPrice: change.doc.data().productPrice,
                        productImg: change.doc.data().productImg
                    })
                }
                // Maj de l'etat avec les nv produits
                this.setState({
                    products: prevProducts
                })
            })
        })
    }
    render(){
        return (
            <Produitcontext.Provider value={{products:[...this.state.products]}}>
                {this.props.children}
            </Produitcontext.Provider>
        )
    }
    
}

export default Produitcontext;
