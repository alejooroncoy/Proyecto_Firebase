import React,{useState,useLayoutEffect,useEffect} from 'react';
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
import Usuario from '../components/Usuario';
const Home = props => {
    const isMobile = () => {
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
        error: false,
        item: []
    });
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
    useEffect(() => {
        setState({
            ...state,
            item: []
        })
    },[props.match.path])
    return(
        <main className="pt-20 bg-image">
            <section className="mt-8 ml-8 md:ml-24 grid alejoGrid">
               <Search/>
               {
                   isMobile() === null ? 
                   <NavBar/>: <Usuario />
               }
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