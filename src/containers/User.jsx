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
    const [name1,setName] = useState({
        nameUser:'',
        photoURL: ''
    });
    const user = firebase.auth().currentUser;
    useLayoutEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user)
            {
                console.log(user);
                setState({
                    name: user.displayName,
                    email: user.email
                })
                setName({
                    ...name1,
                    nameUser: user.displayName
                })
                if(user.photoURL)
                {
                    setName({
                        ...name1,
                        nameUser: user.displayName,
                        photoURL: user.photoURL
                    });
                    setState({
                        name: user.displayName,
                        email: user.email
                    })
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
    const update = e => {
        e.preventDefault();
        firebase.auth().currentUser.updateProfile({
            displayName: state.name
        })
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
                <h1 className="md:mx-64 text-4xl sm:text-5xl font-bold py-4">{`User: ${name1.nameUser}`}</h1>
            </div>
        <div className="container">
        <div className="row mb-0">
            <div className="col s12">
                <div className="card-panel">
                    <form>
                        <div className="row section">
                            <div className="input-field col push-s2 pull-s2 s8">
                                <input id="first-name" name="name" type="email" placeholder="nombre" defaultValue={state.name} onChange={onSubmit} className=" font-semibold"/>
                                <label htmlFor="first-name">Nombre</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col push-s2 pull-s2 s8 ">
                                <input id="email" name="email" type="email" placeholder="email" defaultValue={state.email} onChange={onSubmit}  className=" font-semibold"/>
                                <label htmlFor="email">Correo</label>
                            </div>
                        </div>
                        <button className="btn right black font-semibold text-primary waves-effect waves-light center-align hover:cursor" onClick={update}>
                            Actualizar <i className="material-icons right font-semibold">sync</i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
        </main>
    );
};

export default User;