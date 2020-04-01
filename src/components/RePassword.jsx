import React,{useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
const RePassword = props => {
    const [state,setState] = useState({
        email: ''
    });
    const onSubmit = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    const restablecer = e => {
        e.preventDefault();
        const configuracion = {
            url: "http://localhost:8282"
        }
        firebase.auth().sendPasswordResetEmail(state.email,configuracion)
        .then(result => {
            console.log(result);
            alert("Se ha enviado un correo para reestablecer la contraseña")
        })
        .catch(error => {
            console.log(error);
            alert(`ha pasado el error: ${error}`);
        })
        .finally(() => console.log('tarea finalizada!')
        ) 
    } 
    return(
        <main className="pt-20">
        <section className="container">
        <div className="row registro-titulo">
            <div className="col s12">
                <h1 className="center-align text-secondary text-6xl font-bold mt-4">Estas por reestablecer tu contraseña</h1>
            </div>
        </div>
    </section>
<div className="container">
    <div className="row">
        <div className="col s12">
            <div className="card-panel">
                <form>
                    <div className="row section">
                    </div>
                    <div className="row">
                        <div className="input-field col push-s2 pull-s2 s8">
                            <input id="email" name="email" type="email" className="validate" required onChange={onSubmit}/>
                            <label htmlFor="email">Correo</label>
                        </div>
                    </div>
                    <div className="section">
                        <div className="row">
                            <div className="col s12">
                                <button className="btn right black text-primary font-semibold waves-effect waves-light center-align" id="button" onClick={restablecer}>Reestablecer
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

export default RePassword;