import React,{useEffect,useState} from 'react';
import Icon2 from '../assets/static/fW.png';
import Icon from '../assets/static/user-icon.png';
import {Link} from 'react-router-dom';
import firebase from 'firebase/app';
import {withRouter} from 'react-router-dom';
import 'firebase/auth';
import 'firebase/firestore';
import Products_comprados from './products_C';
const NavBar = withRouter( props => {
    const [state,setState] = useState({
        error: null,
        item: []
    })
    const user = firebase.auth().currentUser;
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user =>{
            if(user)
            {
            const span = document.getElementById("span")
            span.innerHTML = `Hola  ${user.displayName}`
            var elems = document.querySelector('.sidenav');
            var instances = M.Sidenav.init(elems,{
                edge: "right",
            });
            instances.open();
            firebase.firestore()
            .collection(user.uid)
            .orderBy('position', 'asc')
            .onSnapshot(objeto => {
                if(!objeto)
                {
                    setState({
                        ...state,
                        error: true
                    })
                }
                if(objeto.empty)
                {
                    return setState({
                        ...state,
                        error: null,
                    });
                }
                else {
                    setState({
                        ...state,
                        item: objeto.docs.map(doc =>{
                            return{id: doc.id,data: doc.data()}
                        }),
                        error: null,
                    })
                }
            })
            if(user.photoURL)
                {
                    const img = document.querySelector("#img");
                    img.src = user.photoURL
                }
            }
            else{
                var elems = document.querySelector('.sidenav');
                var instances = M.Sidenav.init(elems,{
                    edge: "right",
                });
                instances.close();
                instances.destroy();
                setState({
                    ...state,
                    item: [],
                    error: null,
                });
            }
        });
    },[])
    const mV = () => {
        if(!user) {
            alert("Tienes que estar logueado para acceder");
        }
    };
    const userPage = e =>{
        var elems = document.querySelector('.sidenav');
        var instances = M.Sidenav.init(elems,{
            edge: "right",
        });
        instances.close();
        instances.destroy();
        props.history.push(`/user/${user.uid}`);
    }
    const total = state.item.reduce((users, userspe) => users + Number(userspe.data.cost * userspe.data.cantidad),0); 
    return(
        <div className="relative w-full ">
        <a
        className="mr-6 float-right btn-floating pulse btn-large waves-effect waves-light black sidenav-trigger notification-button hover:cursor" 
        data-target="slide-out" onClick={mV}>
            <i className="material-icons">
                    shopping_cart
            <small className="notification-badge">{state.item.length > 0 ? state.item.length: 0}</small>
            </i>
        </a>
        <ul id="slide-out" className="sidenav">
                    <li><div className="user-view">
                        <div className="background">
                            <img src={Icon2} alt="image"/>
                        </div>
                        <a href="#user"><img className="circle" id="img" src={user ? user.photoURL ? user.photoURL : Icon : Icon}/></a>
                        <a><span className="black-text name font-bold" id="span">Hola</span></a>
                        <a><p className="email"></p></a>
                        </div></li>
                        <li><a href="#user" onClick={userPage} className="hover:cursor">MI CUENTA</a></li>
                        <li><div className="divider"></div></li>
                        <li><a className="subheader">Mis productos</a></li>
                        <li>
                        {
                            state.error ?
                            <h1>Ups:( Hubo un error:(</h1> :
                           state.item.map(item => 
                            <Products_comprados key={item.id} {...item}/>)
                        }
                        </li>
                        <li><div className="divider"></div></li>
                        <li className="flex justify-center">
                        {
                            state.item.length > 0 ?
                                <a href="#" className="text-xl">
                                    Costo total: {total} soles 
                                </a>
                                    :
                            <a href="#" className="text-xl">No tienes ningun producto</a>
                        } 
                        </li>
                        <li><a className="sidenav-close font-extrabold" href="#!">Cerrar carrito!</a></li>
                </ul>
        </div>
    )
});
export default NavBar;