import React,{useState,useEffect} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const Products_comprados = props => {
    const {id,data} = props;
    const numero_p = data.cost * data.cantidad;
    const remove = e => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        firebase.firestore()
        .collection(user.uid)
        .doc(id)
        .delete()
    };
    const add = e => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        firebase.firestore()
        .collection(user.uid)
        .doc(id)
        .update({
            cantidad: data.cantidad + 1
        })
    };
    const quitar = e =>{
        e.preventDefault();
        const user = firebase.auth().currentUser;
        firebase.firestore()
        .collection(user.uid)
        .doc(id)
        .update({
            cantidad: data.cantidad - 1
        })
    }
    return(
        <>
                <table className="responsive-table">
                <tbody>
                    <tr>
                        <td>
                            <img className="responsive-img" src={data.cover} alt={data.title}/>
                            <p className="p">{data.title}</p>
                            <p className="p">{`Costo: ${numero_p} soles`}</p>
                            <p className="p">{`Estás pidiendo ${data.cantidad} ${data.cantidad > 1 ? 'veces' : 'vez'} este mismo producto`}</p>
                            {
                                data.cantidad > 1 ?
                                <a className="btn waves-effect waves-light black text-primary font-extrabold hover:cursor" onClick={remove}>
                                Eliminar Productos<i className="material-icons right">remove_shopping_cart</i>
                                </a>:
                                <a className="btn waves-effect waves-light black text-primary font-extrabold hover:cursor" onClick={remove}>
                                Eliminar Producto<i className="material-icons right">remove_shopping_cart</i>
                            </a>
                            }
                            {' '}
                            <a className="btn-floating waves-effect waves-light black">
                            <i className="material-icons" onClick={add}>add_circle</i>
                                </a>
                            <a className="btn-floating waves-effect waves-light black">
                            <i className="material-icons" onClick={quitar}>remove_circle</i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};
export default Products_comprados;