import React,{useState,useLayoutEffect} from 'react';
import 'materialize-css/sass/materialize.scss'
import '../assets/styles/style.scss';
import Search from '../components/search';
import Catalogo from '../components/Catalogo';
import Contenedor from '../components/Contenedor';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Products from '../components/products';
import PageLoading from '../components/PageLoading';
import NavBar from '../components/navBar';
const Home = props => {
    const [state,setState] = useState({
        error: false,
        item: []
    })
    useLayoutEffect(() => {
        firebase.firestore().collection('products')
        .orderBy('title', 'asc')
        .onSnapshot(objeto => {
            if(!objeto)
            {
                setState({
                    ...state,
                    error: true
                })
            }
            if(objeto.empty)
            {
                return setState({
                    ...state,
                    error: false
                });
            }
            else {
                setState({
                            ...state,
                            item: objeto.docs.map(doc =>{
                                return{id: doc.id,data: doc.data()}
                            }),
                            error: false,
                        })
            }
        })
    },[]);   
    return(
        <main className="pt-20 bg-image">
            <section className="mt-8 ml-8 md:ml-24 grid alejoGrid">
               <Search/>
               <NavBar/>
            </section>  
            <Catalogo text="Nuestros productos">
                <Contenedor>
                    {
                        state.error ?
                        <h1>Ups:( Hubo un error:(</h1> :
                        state.item.length > 0 ?
                       state.item.map(item => 
                        <Products key={item.id} {...item}/>) :
                        <PageLoading/>
                    }
                </Contenedor>
            </Catalogo>
        </main>
    )
};
export default Home;