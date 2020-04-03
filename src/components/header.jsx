import React,{useLayoutEffect} from 'react';
import IsOffline from './IsOffline';
import {withRouter,Link} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import '../assets/styles/Header.scss';
const Header = withRouter( props => {
    const verification = e =>{
        const user = firebase.auth().currentUser;
        if(user)
        {
            firebase.auth().signOut()
                .then(() => {
                    alert("Has salido satisfactoriamente");
                })
                .catch(error => {
                    console.log(error);
                    alert("algo paso:(")
                })
                .finally(() => {
                    console.log('tarea finalizada');
                });
        }
        else {
            props.history.push('/login');
        }
    }
    useLayoutEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user)
            {
                if(user.emailVerified)
                {
                    const bTn = document.querySelector("#bTn");
                    bTn.innerHTML = 'Sign Out';
                }
            } else{
                const bTn = document.querySelector("#bTn");
                bTn.innerHTML = 'Sign In';
            }
        })
    },[]);
    return(
        <>
        <header className="w-full h-20 fixed z-10 bg-black flex justify-center justify-between items-center shadow-2xl">
        <h1 className="hidden w-32 md:block md:text-white ml-3">La mejor cerveza, para ti y tu familia</h1>
        <Link to="/" className="hover:cursor">
        <h1 className="text-white font-bold text-2xl md:text-4xl mx-6 md:m-0 xl:m-0">Cervecería Wilmer <IsOffline>Offline</IsOffline></h1>
        </Link>
        <button className="btn black text-amber darken-1 waves-effect waves-light center-align font-extrabold hover:cursor" onClick={verification} id="bTn" style={{
            outline: 'none'
        }}></button>
        </header>
    </>
    )
})
export default Header;