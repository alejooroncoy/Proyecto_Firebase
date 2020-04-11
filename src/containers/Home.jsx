import React,{useState,useLayoutEffect,useEffect} from 'react';
import 'materialize-css/sass/materialize.scss'
import '../assets/styles/style.scss';
import swal from '@sweetalert/with-react';
import Search from '../components/search';
import Catalogo from '../components/Catalogo';
import Contenedor from '../components/Contenedor';
import IconC from '../assets/static/cervecitas.png';
import IconCw from '../assets/static/cervecitas.webp'
import firebase from 'firebase/app';
import 'firebase/firestore';
import Products from '../components/products';
import PageLoading from '../components/PageLoading';
import NavBar from '../components/navBar';
import Usuario from '../components/Usuario';
import {connect} from 'react-redux';
const Home = props => {
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
    function navegador(){
        const agente = window.navigator.userAgent;
        var navegadores = ["Chrome", "Firefox", "Safari", "Opera", "Trident", "MSIE", "Edge"];
        for(var i in navegadores){
            if(agente.indexOf( navegadores[i]) != -1 ){
                return navegadores[i];
            }
        }
    }
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
    if(props.enviar)
    {
        return(
            <main className="pt-20 bg-image cursor_new ">
            <section className="mt-8 md:ml-24 grid alejoGrid">
               <Search home={state.item}/>
               {
                   isMobile() === null ? 
                    <NavBar/>  : <Usuario />
               }
            </section>  
            {
            <Catalogo text="Resultados:">
            <Contenedor>
                {
                    state.error ?
                    <h1>Ups:( Hubo un error:(</h1> :
                    props.results.length > 0 ?
                   props.results.map(item => 
                    <Products key={item.id} {...item}/>) :
                    <div className="flex flex-col justify-center items-center">
                        {
                            isMobile() === null ? <h1 className="font-extrabold text-3xl">No se tiene coincidencias:(</h1>
                             :
                             <>
                            <h1 className="font-extrabold text-3xl">No se tiene coincidencias:(</h1>
                            {
                                navegador() === "Safari" || navegador() === 'MSIE' ? <img src={IconC} alt="cervecitas" className="responsive-img"/>: <img src={IconCw} alt="cervecitas" className="responsive-img"/>
                            }
                            </>
                        }
                    </div>
                }
            </Contenedor>
        </Catalogo> 
            }

        </main>
        )
    }
    return(
        <main className="pt-20 bg-image cursor_new ">
            <section className="mt-8 md:ml-24 grid alejoGrid">
               <Search home={state.item}/>
               {
                   isMobile() === null ? 
                    <NavBar/>  : <Usuario />
               }
            </section>  
            {
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
            }
        </main>
    )
};
const mapStateToProps = state => {
    return{
        results: state.results,
        enviar: state.enviar
    };
};
export default connect(mapStateToProps,null)(Home);