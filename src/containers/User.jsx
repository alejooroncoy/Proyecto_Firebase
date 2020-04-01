import React,{ useLayoutEffect,useState } from 'react';
import Icon from '../assets/static/user-icon.png';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import '../assets/styles/user.scss';
const User = props => {
    const [state,setState] = useState({
        name: '',
        email: '',
    })
    const user = firebase.auth().currentUser;
    useLayoutEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user)
            {
                const titulo = document.getElementById("titulo");
                titulo.innerHTML = `User: ${user.displayName}`;
                if(user.photoURL)
                {
                    const img = document.querySelector("#img");
                    img.src = user.photoURL
                }
            }else {
                props.history.push("/")
            }
        })
    },[]);
    const onSubmit = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    const updateAvatar = e => {
        const user = firebase.auth().currentUser;
        const file = e.target.files[0]
        const refStorage = firebase.storage().ref(`avatars/${user.uid}/${file.name}`);
        const task = refStorage.put(file);
        task.on(
            'state_changed',
            snapshot => {
                const porcentaje = snapshot.bytesTransferred / snapshot.totalBytes * 100
                console.log(porcentaje);
            },
            err => {
                alert(`Error subiendo archivo = > ${err.message}`, 4000)
            },
            () => {
                task.snapshot.ref
                  .getDownloadURL()
                  .then(url => {
                    console.log(url)
                    sessionStorage.setItem('newAvatar', url)
                    firebase.auth().currentUser.updateProfile({
                        photoURL: url
                    })
                  })
                  .catch(err => {
                    alert(`Error obteniendo downloadURL => ${err}`, 4000)
                })
            }
        )
    }
    return(
        <main className="pt-20 bg-image">
            <div className="flex w-full flex-col-reverse sm:justify-around items-center h-auto">
                <div className="flex flex-col items-center py-8">
                    <img className="bg-primary rounded-lg w-32 h-32" id="img" src={user ? user.photoURL ? user.photoURL : Icon : Icon}/>
                    <form action="#" className="hover:cursor">
                        <div className="file-field input-field hover:cursor">
                            <div className="btn bg-black text-primary font-extrabold hover:text-black hover:bg-primary hover:cursor">
                                <span className="p-0 hover:cursor">Sube tu imagen de perfil <i className="material-icons right large font-extrabold">unarchive</i></span>
                                <input type="file" className="hover:cursor" onChange={updateAvatar}/>
                            </div>
                            <div className="file-path-wrapper hover:cursor">
                            <input className="file-path validate hover:cursor" type="text"/>
                            </div>
                        </div>
                    </form>
                </div>
                <h1 className="mx-64 text-5xl font-bold py-4" id="titulo">{`User: ${user}`}</h1>
            </div>
        <div className="container">
        <div className="row">
            <div className="col s12">
                <div className="card-panel">
                    <form>
                        <div className="row section">
                            <div className="input-field col s12 m6">
                                <input id="first-name" name="name" type="email" onChange={onSubmit} className=" font-semibold"/>
                                <label htmlFor="first-name">Nombre</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m6">
                                <input id="email" name="email" type="email" onChange={onSubmit}  className=" font-semibold"/>
                                <label htmlFor="email">Correo</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
        </main>
    );
};

export default User;