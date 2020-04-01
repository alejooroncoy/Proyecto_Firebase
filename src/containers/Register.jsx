import React,{useState} from 'react';
import IsOffline from '../components/IsOffline';
import firebase from 'firebase/app';
import 'firebase/auth';
import {Link} from 'react-router-dom';
import '../assets/styles/Register.scss';
const Register = props => {
    const [state,setState] = useState({
        name: '',
        email: '',
        password: '',
        lastName: '',
    })
    const onSubmit = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    const registrarse = e => {
        if(!state.password || !state.email || !state.name || !state.lastName)
        {
            e.preventDefault();
            alert("completa todos los espacios")
        } else{ 
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(state.email,state.password)
        .then(result => {
            result.user.updateProfile({
                displayName : `${state.name} ${state.lastName}`
              })
            const configuracion = {
                url: 'https://cervewilmer.web.app/',
            };
            result.user.sendEmailVerification(configuracion)
            .catch(error => {
                console.log(error);
                alert(`Error => ${error.message}`);
            })
            .finally(() => console.log('Tarea mensaje terminado')
            )
            firebase.auth().signOut();
            alert(`Hola ${state.name} ${state.lastName} has sido registrado de manera exitosa! Ahora verifica para poder activar tu cuenta!`)
            props.history.push('/login');
        })
        .catch(error => {
            alert(`Error => ${error.message}`)
            console.log(error);
        })
        .finally(() => {
            console.log('tarea culminada');
        })}
    }
    return(
    <main className="pt-20">
         <section className="container">
            <div className="row registro-titulo">
                <div className="col s12">
                    <h1 className="center-align text-secondary text-6xl font-bold mt-4">Regístrate en Wilmer Cervezas <IsOffline>Offline</IsOffline></h1>
                </div>
            </div>
        </section>
    <div className="container">
        <div className="row">
            <div className="col s12">
                <div className="card-panel">
                    <form>
                        <div className="row section">
                            <div className="input-field col s12 m6">
                                <input id="first-name" name="name" type="email" onChange={onSubmit} className="font-semibold" required/>
                                <label htmlFor="first-name">Nombre</label>
                            </div>
                            <div className="input-field col s12 m6">
                                <input id="last-name" name="lastName" type="email" onChange={onSubmit}  className="font-semibold" required/>
                                <label htmlFor="last-name">Apellido</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m6">
                                <input id="email" name="email" type="email" onChange={onSubmit}  className="validate font-semibold" required/>
                                <label htmlFor="email">Correo</label>
                            </div>
                            <div className="input-field col s12 m6">
                                <input id="password" name="password" type="password" onChange={onSubmit}  className="validate font-semibold" required/>
                                <label htmlFor="password">Contraseña</label>
                            </div>
                        </div>
                        <div className="section">
                            <div className="row">
                                <div className="col s12">
                                    <Link to="/login" className="left font-semibold text-1xl hover:cursor">
                                        Ya tengo una cuenta, Quiero Loguearme!
                                    </Link>
                                    <button className="btn right black font-semibold text-primary waves-effect waves-light center-align" id="button" onClick={registrarse} >registrarse
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

export default Register;
