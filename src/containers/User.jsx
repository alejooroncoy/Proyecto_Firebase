import React,{ useLayoutEffect } from 'react';
import Icon from '../assets/static/user-icon.png';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import '../assets/styles/user.scss';
const User = props => {
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
            <div className="flex w-full justify-evenly between items-center h-64">
                <div className="flex flex-col items-center">
                    <img className="bg-primary rounded-lg w-32 h-32" id="img" src={user ? user.photoURL ? user.photoURL : Icon : Icon}/>
                    <form action="#" className="hover:cursor">
                        <div className="file-field input-field hover:cursor">
                            <div className="btn bg-black text-primary font-extrabold hover:text-black hover:bg-primary hover:cursor">
                                <span className="p-0 hover:cursor">Sube tu imagen de perfil</span>
                                <input type="file" className="hover:cursor" onChange={updateAvatar}/>
                            </div>
                            <div className="file-path-wrapper hover:cursor">
                            <input className="file-path validate hover:cursor" type="text"/>
                            </div>
                        </div>
                    </form>
                </div>
                <h1 className="mx-64 text-5xl font-bold" id="titulo">{`User: ${user}`}</h1>
            </div>
        </main>
    );
};

export default User;