import React,{useLayoutEffect,useState,useEffect} from 'react';
import '../assets/styles/products.scss';
import firebase from 'firebase/app';
import {withRouter,Link} from 'react-router-dom';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';
const Products =withRouter( props => {
    const [state,setState] = useState({ 
        item: []
    });
    useLayoutEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user)
            {
                firebase.firestore()
                .collection(`${user.uid}`)
                .orderBy('tiempo','asc')
                .onSnapshot(objeto => {
                    if(objeto.empty)
                    {
                        setState({
                            ...state,
                            item: [],
                    })
                    }else {
                        setState({
                            ...state,
                            item: objeto.docs.map(doc =>{
                                return{id: doc.id,data: doc.data()}
                            }),
                        })
                    }
                })
            } 
    })},[]);
    const {id,data,position} = props;
    const enviar = e =>{
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const existe = state.item.find(item => item.id == id);
        if(user)
        {
         firebase.firestore().collection(user.uid).doc(id).set({
            cantidad: data.cantidad,
            cost: data.cost,
            cover: data.cover,
            description: data.description,
            title: data.title,
            tiempo: firebase.firestore.FieldValue.serverTimestamp()
        });
        if(existe)
        {
            M.toast({
                html: 'Ya agregaste este producto!, Si quieres modificar: Vaya a su carrito!',
                classes: 'rounded text-primary bg-secondary',
                displayLength: 2000
               });
        }else {
            M.toast({
                html: 'Agregado al carrito!',
                classes: 'rounded text-primary bg-secondary',
                displayLength: 1500
               });
        }
        }else {
            alert("Necesitas tener una cuenta para añadir:(")
        }
    };
    useEffect(() => {
        setState({
            ...state,
            item: []
        })
    },[props.match.path])
    return(
        <>
             <div className="card col s12 m6 l3 xl3">
           <div className="card-image">
               <Link to={{
                   pathname: `product/${id}`,
                   state: {
                       data: state.item,
                       id: id
                   }
               }}>
               <img className="responsive-img" 
               src={data.cover} 
               alt={data.title}
               /> 
               </Link>
                 <a href="#" id="set_add" className="btn-floating pulse halfway-fab waveseffect waves-light black cursor" onClick={enviar}>
                <i className="material-icons" 
                id = {id}
                >
                    add_shopping_cart
                </i>
                </a>
           </div>
           <div className="card-content white-text">
           <span className="card-title font-extrabold">{data.title}</span>
            <p className="font-medium">{data.description}</p>
            <p className="font-medium" >A un costo de {data.cost} soles</p>
           </div>
        </div>
        </>
    )
});

export default Products;