import React,{useState} from 'react';
import '../assets/styles/products.scss';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
const Products = props => {
    const {id,data} = props;
    // const [state,setState] = useState(1)
    let cd = 0;
    const enviar = e =>{
        e.preventDefault();
        const user = firebase.auth().currentUser;
        if(user)
        {
        cd += 1;
         firebase.firestore().collection(user.uid).doc(id).set({
            cantidad: data.cantidad,
            cost: data.cost,
            cover: data.cover,
            description: data.description,
            title: data.title,
            position: cd++
        });
        }else {
            alert("Necesitas tener una cuenta para añadir:(")
        }
    };
    return(
        <>
             <div className="card col s12 m6 l3 xl3">
           <div className="card-image">
               <img className="responsive-img" 
               src={data.cover} 
               alt={data.title}
               /> 
                 <a href="#" id="set_add" className="btn-floating pulse halfway-fab waveseffect waves-light black hover:cursor" onClick={enviar}>
                <i className="material-icons" 
                id = {id}
                >
                    add_shopping_cart
                </i>
                </a>
           </div>
           <div className="card-content white-text">
           <span className="card-title font-extrabold">{data.title}</span>
            <p className="font-medium">{data.description}</p>
            <p className="font-medium" >A un costo de {data.cost} soles</p>
           </div>
        </div>
        </>
    )
};

export default Products;