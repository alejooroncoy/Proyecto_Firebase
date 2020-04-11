import React,{useState,useEffect} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { withRouter } from 'react-router';
const ProductC = withRouter( props => {
const {title,cost,description,cover,cantidad} = props.item;
const {id} = props;
const [state,setState] = useState({
    nuevaCantidad: ''
})
const user = firebase.auth().currentUser;
useEffect(() => {
    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems);
},[]);
const nuevaCantidadFunction = e => {
    setState({
        ...state,
        [e.target.name]: e.target.value
    });
};
const enviar = e => {
    e.preventDefault()
    if(props.existe)
    {
        const user = firebase.auth().currentUser;
        firebase.firestore()
        .collection(user.uid)
        .doc(id)
        .update({
            cantidad: Number(state.nuevaCantidad)
        })
        .then(() => {
            M.toast({
                html: 'Se actualizo la cantidad elegida del producto!',
                classes: 'rounded text-primary bg-secondary',
                displayLength: 1500
               });
        })
    }else {
        const user = firebase.auth().currentUser;
        firebase.firestore().collection(user.uid).doc(id).set({
            cantidad: cantidad,
            cost: cost,
            cover: cover,
            description: description,
            title: title,
            tiempo: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() =>{
            M.toast({
                html: 'Agregado al carrito!',
                classes: 'rounded text-primary bg-secondary',
                displayLength: 1500
               });
        })
    }
}
const eliminar = e => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    firebase.firestore()
        .collection(user.uid)
        .doc(id)
        .delete();
    props.history.replace("/")
}
   return(
    <>
        <h1 className="text-center text-4xl font-bold md:text-6xl">{title}</h1>
        <div className=" flex flex-col md:flex-row">
            <div className="flex flex-col p-16 w-full h-auto md:w-1/2 md:p-20 md:justify-center md:items-center md:w-1/2">
                <img className="materialboxed rounded-lg cursor" src={cover} alt={title}/>
                <h2 className="font-semibold text-justify text-2xl md:text-center md:text-3xl">{description}</h2>
            </div>
            <section className="md:flex md:flex-col md:w-1/2 md:items-center md:justify-center md:self-center">
            <div className="row p-4 md:flex md:flex-row md:justify-center md:items-center" style={{marginBottom: 0}}>
                <div className="flex items-center col s6 h-16 justify-center">
                <h1 className="text-center font-semibold text-xl md:text-4xl">
                {`Cuesta ${cost} soles`}
                </h1>
                </div>
                <div className="col s6 bg-primary rounded-md">
                    <h1>Cantidad:</h1>
                    <input type="number" title="cantidad" name="nuevaCantidad" onChange={nuevaCantidadFunction} defaultValue={cantidad}/>
                </div>
            </div>
            <div className={`w-full my-4 flex ${props.existe ? 'justify-around' : 'justify-center'} items-center div5`}>
                    {
                        user ? <button onClick={enviar} className="btn bg-black text-primary button5 cursor hover:bg-primary focus:bg-primary focus:text-black  hover:text-black">Agregar al carrito<i className="material-icons right">add_shopping_cart</i></button>
                        :
                        <>
                        <h1 className="font-semibold text-4xl">Necesitas una cuenta para agregar:(</h1>
                        </>
                    }
                    {
                        props.existe ? 
                        <button className="cursor btn bg-black text-primary hover:bg-primary focus:bg-primary focus:text-black  hover:text-black" onClick={eliminar}>Eliminar del carrito<i className="material-icons right">remove_shopping_cart</i></button>
                        :
                        <></>
                    }
            </div>
            </section>
        </div>
    </>
   )
});
export default ProductC;