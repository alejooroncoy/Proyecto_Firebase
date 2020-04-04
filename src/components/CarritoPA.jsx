import React from 'react';
import ProductsC from './productsC';

const CarritoPA = props => {
    const total = props.item.reduce((users, userspe) => users + Number(userspe.data.cost * userspe.data.cantidad),0); 
    return(
        <main className="pt-20 bg-image cursor_new">
            <div className="w-full h-20 flex justify-center items-center">
            <h1 className="text-2xl font-extrabold text-white">{`Carrito de compras de ${props.name}`}</h1>
            </div>
            <div className="w-full">
            {
            props.item.map(item => 
            <ProductsC key={item.id} {...item}/>)
            }
            </div>
            {
                            props.item.length > 0 ?
                                <h1 className="text-4xl font-bold">
                                    Costo total: {total} soles 
                                </h1>
                                    :
                            <><h1 className="text-4xl font-bold">No tienes ningun producto</h1>
                            </>
            } 
            <h1>Necesitas ayuda?</h1>
            <h1>Escribenos</h1>
        </main>
    )
}
export default CarritoPA;