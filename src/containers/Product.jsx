import React,{useEffect,useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import ProductC from '../components/ProductContainer';
const Product = props => {
    const[state,setState] = useState({
        item: {},
        dataC: props.location.state,
        existe: false,
    });
    const id = props.match.params.id;
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user)
            {
                if(state.dataC)
                {
                    const existe = state.dataC.data.find(item => item.id == id);
                    if(existe)
                    {
                        firebase.firestore()
                    .collection(user.uid)
                    .doc(id)
                    .onSnapshot(info => {
                        if(info.empty)
                        {
                            setState({
                                ...state,
                                item: {},
                                existe: true,
                        })
                        }  else {
                            setState({
                                ...state,
                                item: info.data(),
                                existe: true,
                            })
                        }
                     })
                    } else {
                        firebase.firestore().collection('products')
                        .doc(id)
                        .onSnapshot(info => {
                            if(info.empty)
                            {
                                setState({
                                    ...state,
                                    item: {},
                            })
                            }else {
                                setState({
                                    ...state,
                                    item: info.data(),
                                })
                            }
                        })
                    }
                }
                else{
                    firebase.firestore().collection('products')
                    .doc(id)
                    .onSnapshot(info => {
                        if(info.empty)
                        {
                            setState({
                                ...state,
                                item: {},
                        })
                        }else {
                            setState({
                                ...state,
                                item: info.data(),
                            })
                        }
                    })
                }
            } 
            else{
                firebase.firestore().collection('products')
                .doc(id)
                .onSnapshot(info => {
                    if(info.empty)
                    {
                        setState({
                            ...state,
                            item: {},
                    })
                    }else {
                        setState({
                            ...state,
                            item: info.data(),
                        })
                    }
                })
            }
        })
    },[]);  
    return(
        <main className="pt-24 bg-image cursor_new">
            <ProductC item={state.item} existe={state.existe} id={id}/>
        </main>
    )
};

export default Product;