import React,{useEffect,useState} from 'react';
import swal from '@sweetalert/with-react';
import {withRouter} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import '../assets/styles/footer.scss';
const Footer = withRouter(props =>  {
    const [state,setState] = useState({
        name: '',
        existe: false,
    })
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user)
            {
                setState({
                    ...state,
                    name: user.displayName,
                    existe: true
                })
            }
            else{
                setState({
                    ...state,
                    existe: false
                })
            }
        })
    }, [])
    function getlink() {
        var aux = document.createElement("input");
        aux.setAttribute("value", window.location.href.split("?")[0].split("#")[0]);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
            swal({
                icon: "success",
                title:"Url Copiada!",
            });
    };
    const hola = e => {
        getlink()
    }
    const compartir = e => {
        e.preventDefault();
        if( !navigator.share)
        {
            swal({
                content: (
                    <div>
                        <h1 className="text-3xl font-semibold">Comparte con tus amigos!</h1>
                        <h3 className="my-8 font-semibold">{state.existe ? `Hola ${state.name}`: 'Hola! Registrate!'}</h3>
                        <h2 className="font-semibold mb-12">Siempre los mejores! Comparte con el enlace de abajo!</h2>
                        <a onClick={hola} className="text-primary font-semibold animacion text-5xl hover:cursor">Cervecería wilmer</a>
                    </div>
                )
            })
            return;
        }
    const title = "Wilmer Cervezas"
        navigator.share({
            title: `${title}`,
            text:  `${state.name} te invita a Cervecería wilmer!`,
            url: document.location.href,
        })
        .then(() => {
            alert("enviado!")
        })
        .catch(() => {
            alert("ups:(")
        })
    }
    return(
    <footer className="page-footer black cursor_new">
        <div className="row">
            <div className="col l6 s12">
                <h5 className="letter">
                    Gracias por visitarnos! 
                </h5>
                <p className="letter">
                    Si nuestro trabajo fue de su agrado! No dude en enviarnos un mensaje en nuestras principales fan-pages!
                </p>
                <button className="my-4 btn colorBtn cursor" onClick={compartir}>
                    Compartir:3
                </button>
            </div>
            <div className="col l4 offset-l2 s12">
                <h5 className="letter">
                    Nuestras Fan-Pages
                </h5>
                <ul className="cer letter">
                    <li><a className="letter" href="https://facebook.com">Facebook</a></li>
                    <li><a className="letter" href="https://instagram.com">Instagram</a></li>
                    <li><a href="https://github.com/alejooroncoy"></a>GitHub</li>
                </ul>
            </div>
        </div>
            <div className="footer-copyright">
                <span className="letter left-footer" href="#">© 2020 Cervecería wilmer</span>
                <a className="letter right-footer" href="#">Actualizandonos a esta nueva era!</a>
          </div>
    </footer>
)});

export default Footer;