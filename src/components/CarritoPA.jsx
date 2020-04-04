import React from 'react';
import ProductsC from './ProductsC';
import IconC from '../assets/static/cervecitas.png';
import IconCw from '../assets/static/cervecitas.webp'
const CarritoPA = props => {
    function navegador(){
        const agente = window.navigator.userAgent;
        var navegadores = ["Chrome", "Firefox", "Safari", "Opera", "Trident", "MSIE", "Edge"];
        for(var i in navegadores){
            if(agente.indexOf( navegadores[i]) != -1 ){
                return navegadores[i];
            }
        }
    }
    const total = props.item.reduce((users, userspe) => users + Number(userspe.data.cost * userspe.data.cantidad),0); 
    return(
        <main className="pt-20 bg-image cursor_new">
            <div className={props.item.length > 0 ? "w-full h-20 flex justify-center items-center" : 'w-full flex justify-center h-20 items-center'}>
            <h1 className="text-2xl font-extrabold text-secondary">{`Carrito de compras de ${props.name}`}</h1>
            </div>
            <div className={props.item.length > 0 ? "w-full" : "w-full flex justify-center items-center"}>
            {
                props.item.map(item => 
                    <ProductsC key={item.id} {...item}/>)
            }
            </div>
            <div className="w-full h-12 flex items-center justify-center">
            {
                            props.item.length > 0 ?
                                <h1 className="text-4xl font-bold ml-4">
                                    Costo total: {total} soles 
                                </h1>
                                    :
                            <><h1 className="text-4xl font-bold" style={{marginLeft: '1.5rem'}}>No tienes ningun producto</h1>
                            </>
            } 
            </div>
            {
                props.item.length === 0 &&
                <div className="flex items-center flex-col mt-10">
                <h1 className="text-3xl font-extrabold text-secondary">Haz tu primera compra!</h1>
            {
                navegador() === "Safari" || navegador() === 'MSIE' ? <img src={IconC} alt="cervecitas" className="responsive-img"/>: <img src={IconCw} alt="cervecitas" className="responsive-img"/>
            }
            </div>
            }
        </main>
    )
}
export default CarritoPA;