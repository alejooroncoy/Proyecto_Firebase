import React,{useLayoutEffect} from 'react';
import IsOffline from './IsOffline';
import {withRouter,Link} from 'react-router-dom';
import firebase from 'firebase/app';
import icon from '../../public/icon.png';
import 'firebase/auth';
import 'firebase/messaging';
import 'firebase/firestore';
import '../assets/styles/Header.scss';
const Header = withRouter( props => {
    function isMobile(){
        return (
            (navigator.userAgent.match(/Android/i)) ||
            (navigator.userAgent.match(/webOS/i)) ||
            (navigator.userAgent.match(/iPhone|iPad|iPod/i)) ||
            (navigator.userAgent.match(/iPod/i)) ||
            (navigator.userAgent.match(/iPad/i)) ||
            (navigator.userAgent.match(/iBlackBerry/i)) ||
            (navigator.userAgent.match(/Opera Mini/i))
        );
    };
    function navegador(){
        const agente = window.navigator.userAgent;
        var navegadores = ["Chrome", "Firefox", "Safari", "Opera", "Trident", "MSIE", "Edge"];
        for(var i in navegadores){
            if(agente.indexOf( navegadores[i]) != -1 ){
                return navegadores[i];
            }
        }
    }
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
    const preguntar = () => {
        firebase.messaging().requestPermission()
        .then(()=> {
            console.log('permiso otorgado');
            return firebase.messaging().getToken()
            .then(token => {
                firebase.firestore()
                .collection('tokens')
                .doc(token)
                .set({
                    token: token
                })
            })
            .catch(error => {
                console.log(`Error BD => ${error}`);
            })
        })
        .catch(() => {
            console.log('nou:(');
        });
        firebase.messaging().onTokenRefresh(() => {
            firebase.messaging().getToken()
            .then(token => {
                firebase.firestore()
                .collection('tokens')
                .doc(token)
                .set({
                    token: token
                })
            })
            .catch(error => {
                console.log(`Error bd refresh => ${error}`);
            })
        });
    };
    const cerrar = () => {
        let bloque = document.getElementById("bloque");
        let h1 = document.getElementById("h1");
        let i = document.getElementById("i");
        h1.animate([
            {
                color: 'white'
            },
            {
                color: 'transparent'
            }
        ],{
            duration: 200,
            iterations: 1,
            fill: "forwards",
        })
        bloque.animate([ 
            {
                height: '30px'
            } ,
            {
                height: '0px'
            },
            ],{
                duration: 1200,
                iterations: 1,
                fill: "forwards",
            })
        i.animate([
            {
                color: '#f3c614'
            },
            {
                color: 'transparent'
            }
        ],{
            duration: 200,
            iterations: 1,
            fill: "forwards",
        })
        // bloque.classList.add("hidden");
    }
    return(
        <header className="">
        <div className="w-full h-20 fixed z-10 bg-black flex justify-center justify-between items-center shadow-2xl cursor_new mb-4">
        <h1 className="hidden w-32 md:block md:text-white ml-3 cursor" onClick={() => {preguntar()}}>Click para interarte de nuestras futuros productos</h1>
        <Link to="/" className="cursor">
        <h1 className="text-white font-bold text-2xl md:text-4xl mx-6 md:m-0 xl:m-0">Cervecería Wilmer <IsOffline>Offline</IsOffline></h1>
        </Link>
        <button className="btn black text-amber darken-1 waves-effect waves-light center-align font-extrabold cursor" onClick={verification} id="bTn" style={{
            outline: 'none'
        }}></button>
        </div>
        {
            isMobile() !== null && navegador() !== 'Safari' ?
            <div id="bloque" className="px-2 bg-black w-full fixed z-10 mt-16 flex">
            <h1 id="h1" onClick={() => {preguntar()}} className="text-white font-extrabold text-left">Si quieres estar atento de nuestros proximos productos,presione aquí!</h1>
            <i id="i" className="material-icons bg-black rounded-full text-primary" onClick={cerrar}>clear</i>
            </div>
            :
            <></>
        }
        </header>
    )
})
export default Header;