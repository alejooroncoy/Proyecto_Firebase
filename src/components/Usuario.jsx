import React,{useEffect,useState}from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore';
const Usuario = props => {
    const [state,setState] = useState({
        error: null,
        item: [],
        url: '',
        menu: {},
        uid: ''
    });
    const user = firebase.auth().currentUser;
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user =>{
            if(user)
            {       
            firebase.firestore()
            .collection(user.uid)
            .orderBy('position', 'asc')
            .onSnapshot(objeto => {
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
                        url: user.photoURL,
                        uid: user.uid
                    })
                   }
                })
            }
            else{
                setState({
                    ...state,
                    item: [],
                    error: null,
                });
            }
        });
    },[])
    const menuV = e => {
        setState({
            ...state,
            menu: {
                display: 'block', width: '100px', left: '-24.0208px', top: '0px', height: '149px', transformOrigin: '100% 0px', opacity: 1, transform: 'scaleX(1) scaleY(1)',
            }
        })
    };
    const Close1 = e =>{
        e.preventDefault();
        setState({
            ...state,
            menu: {}
        })
    }
    return(
        <>
        <div className="relative w-full ">
            {
                user ? 
                <a
                className="mr-6 float-right btn-floating pulse btn-large waves-effect waves-light black notification-button cursor especial1 dropdown-trigger" style={{
                    width: '5rem',
                    height: '5rem'
                }} data-target='dropdown1' onClick={menuV}>
                <small className="notification-badge" style={{
                    right: '33px',
                }}>{state.item.length > 0 ? state.item.length: 0}</small>
                <img className="circle bottom-4" src={user.photoURL}>
                </img></a>
                :
                 <a
                 className="mr-6 float-right btn-floating pulse btn-large waves-effect waves-light black notification-button cursor especial1">
                <i className="material-icons large especial" style={{fontSize: '3.5rem',lineHeight:'52px'}}>
                account_circle
                <small className="notification-badge" style={{
                    top: '-40px',
                    right: '51px'
                }}>0</small>
                </i> 
                </a>
            }
         <ul id='dropdown1' style={state.menu} className='dropdown-content'>
            <li><Link to={`/user/${state.uid}`}><i className="material-icons">account_box</i>Usuario</Link></li>
            <li className="divider" tabIndex="-1"></li>
            <li><a href="#!"><i className="material-icons">shopping_basket</i>Carrito</a></li>
            <li><a href="#!" onClick={Close1}>Cerrar</a></li>
        </ul>
        </div>
        </>
    )
};

export default Usuario;