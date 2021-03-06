import React,{ useLayoutEffect,useState } from 'react';
import Icon from '../assets/static/user-icon.png';
import Materialbox from 'materialize-css/js/materialbox';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import '../assets/styles/user.scss';
const User = props => {
    function isMobile(){
        return (
            (navigator.userAgent.match(/Android/i)) ||
            (navigator.userAgent.match(/webOS/i)) ||
            (navigator.userAgent.match(/iPhone/i)) ||
            (navigator.userAgent.match(/iPod/i)) ||
            (navigator.userAgent.match(/iPad/i)) ||
            (navigator.userAgent.match(/iBlackBerry/i))
        );
    };
    const [state,setState] = useState({
        name: '',
        email: '',
        porcentaje: 0,
    })
    const [name1,setName] = useState({
        nameUser:'',
        photoURL: '',
        porcentaje: 0,
        color: '',
    });
    const user = firebase.auth().currentUser;
    useLayoutEffect(() => {
        const elems = document.querySelectorAll('.materialboxed');
        const instances = M.Materialbox.init(elems);
        firebase.auth().onAuthStateChanged(user => {
            if(user)
            {
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
                const porcentaje1 = snapshot.bytesTransferred / snapshot.totalBytes * 100
                setState({
                    ...state,
                    porcentaje: porcentaje1,
                })
                setName({
                    ...state,
                    porcentaje: porcentaje1
                })
            },
            err => {
                alert(`Error subiendo archivo = > ${err.message}`, 4000)
            },
            () => {
                task.snapshot.ref
                  .getDownloadURL()
                  .then(url => {
                      if(isMobile() === null)
                      {
                        sessionStorage.setItem('newAvatar', url)
                        firebase.auth().currentUser.updateProfile({
                            photoURL: url
                        })
                        location.reload();
                      }else {
                        sessionStorage.setItem('newAvatar', url)
                        firebase.auth().currentUser.updateProfile({
                            photoURL: url
                        })
                        const divP = document.querySelector("#divP");
                        const h1 = document.createElement("h1");
                        const button = document.createElement("button");
                        button.classList = "btn black text-primary"
                        button.innerHTML = "Recargar"
                        h1.innerHTML = "Necesita actualizar para ver los cambios";
                        h1.classList = "font-semibold mx-5 my-5 text-center"
                        h1.style = {borderRadius: '20px'}
                        divP.appendChild(h1);
                        divP.appendChild(button);
                      }
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
        location.reload();
    }
    const imagen = e => {
        e.preventDefault();
    }
    return(
        <main className="pt-20 bg-image cursor_new">
            <div className="flex w-full flex-col-reverse sm:justify-around items-center h-auto">
                <div className="flex flex-col items-center py-8">
                    <img className="bg-primary rounded-lg w-32 h-32 materialboxed cursor" onClick={imagen} id="img" src={user ? user.photoURL ? user.photoURL : Icon : Icon}/>
                    <form action="#" className="cursor">
                        <div className="file-field input-field cursor">
                            <div className="btn bg-black text-primary font-extrabold hover:text-black hover:bg-primary cursor">
                                <span className="p-0 cursor">Sube tu imagen de perfil <i className="material-icons right large font-extrabold cursor">unarchive</i></span>
                                <input type="file" className="cursor" onChange={updateAvatar}/>
                            </div>
                            <div className="file-path-wrapper cursor">
                            <input className="file-path validate cursor" type="text"/>
                            </div>
                        </div>
                        <div>
                            <div className="progress pt-4 mt-10 flex items-center justify-center">
                            <span className="font-bold z-10" style={{marginBottom: 13}}> 
                                    {`${name1.porcentaje}%`}
                                    </span>
                                    <div className="determinate flex justify-center" style={{
                                    width: `${state.porcentaje}%`
                                    }}> 
                                    </div>
                            </div>
                            <div id="divP" className="flex flex-col items-center">

                            </div>
                        </div>
                    </form>
                </div>
                <h1 className="md:mx-64 text-4xl sm:text-5xl font-bold py-4">{`User: ${name1.nameUser || state.name}`}</h1>
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
                        <button className="btn right black font-semibold text-primary waves-effect waves-light center-align cursor" onClick={update}>
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