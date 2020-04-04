import React,{useEffect,useState} from 'react';
import CarritoPA from '../components/CarritoPA';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const Carrito = props => {
    const [state,setState] = useState({
        item: [],
        name: ''
    })
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user)
            {
                firebase.firestore()
                .collection(`${user.uid}`)
                .onSnapshot(objeto => {
                    if(objeto.empty)
                    {
                        setState({
                            ...state,
                            item: [],
                            name: user.displayName
                        })
                    }else {
                        setState({
                            ...state,
                            item: objeto.docs.map(doc =>{
                                return{id: doc.id,data: doc.data()}
                            }),
                            name: user.displayName,
                        })
                    }
                })
            }
        })
    },[])
    useEffect(() => {
        setState({
            ...state,
            item: [],
        });
    },[props.match.path])
    return(
        <CarritoPA item={state.item} name={state.name}/>
    );
};

export default Carrito;