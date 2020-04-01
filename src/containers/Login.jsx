import React,{useState} from 'react';
import IsOffline from '../components/IsOffline';
import {Link} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
const Login = props => {    
    const [state,setState] = useState({
        email: '',
        password: '',
    });
    const onSubmit = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };
    const login = e => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(state.email, state.password)
        .then(result => {
            if(result.user.emailVerified)
            {
                props.history.push('/');
            }
            else {
                firebase.auth().signOut();
                alert(`Hola ${result.user.displayName}, por favor realiza la verificación de la cuenta `, 5000)
            }
        })
        .catch(error => {
            console.log(error.message);
            alert(`Error => ${error.message}`);
          })
        .finally(() => {
            console.log('tarea terminada');
        })
    }
    const oC = () => {
        window.open('/repassword','','width=600, height=400,left=100, top=100, right=100, bottom=100',void 0);
    }
    return(
        <main className="pt-20">
            <section className="container">
            <div className="row registro-titulo">
                <div className="col s12">
                    <h1 className="center-align text-secondary text-6xl font-bold mt-4">Inicia Sesión en Wilmer Cervezas <IsOffline>Offline</IsOffline></h1>
                </div>
            </div>
        </section>
    <div className="container">
        <div className="row mb-0">
            <div className="col s12">
                <div className="card-panel">
                    <form>
                        <div className="row section">
                        </div>
                        <div className="row">
                            <div className="input-field col push-s2 pull-s2 s8">
                                <input id="email" name="email" type="email" onChange={onSubmit}  className="validate font-semibold" required/>
                                <label htmlFor="email">Correo</label>
                            </div>
                            <div className="input-field col push-s2 pull-s2 s8">
                                <input id="password" name="password" type="password" onChange={onSubmit}  className="validate font-semibold" required/>
                                <label htmlFor="password">Contraseña</label>
                            </div>
                        </div>
                        <div className="section">
                            <div className="row">
                                <div className="col s12 flex justify-evenly items-center">
                                <a href="#" className="text-secondary font-semibold hover:cursor" onClick={oC}>
                                    Olvidaste tu contraseña
                                </a>
                                <Link className="text-secondary font-semibold hover:cursor" to="/register">
                                    No tengo cuenta, quiero Registrarme!
                                </Link>
                                    <button className="btn font-semibold right black text-primary waves-effect waves-light center-align" id="button" onClick={login}>Login
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
        </main>
    )
};

export default Login;