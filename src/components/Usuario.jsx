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
        uid: 0,
    });
    const user = firebase.auth().currentUser;
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user =>{
            if(user)
            {       
            firebase.firestore()
            .collection(user.uid)
            .orderBy('tiempo','asc')
            .onSnapshot(objeto => {
                if(objeto.empty)
                {
                    return setState({
                        ...state,
                        error: null,
                        url: user.photoURL,
                        uid: user.uid
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
                className="mr-6 float-right btn-large waves-effect waves-light black rounded-lg notification-button cursor especial1 dropdown-trigger" style={{padding: 0,lineHeight: 0}} data-target='dropdown1' onClick={menuV}>
                <img className="" src={user.photoURL}>
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
            <li><Link to={`/user/${state.uid}`}><i className="material-icons text-primary">account_box</i><span className="text-secondary font-semibold">Usuario</span></Link></li>
            <li className="divider" tabIndex="-1"></li>
            <li><Link to={`/carrito/${state.uid}`}><i className="material-icons text-primary">shopping_basket</i><span className="text-secondary  font-semibold">carrito</span><small className="notification-badge" style={{
                right: '-18px'
            }}>{state.item.length > 0 ? state.item.length: 0}</small></Link></li>
            <li><a onClick={Close1} className="  font-semibold" style={{color: 'black'}}>Cerrar</a></li>
        </ul>
        </div>
        </>
    )
};

export default Usuario;