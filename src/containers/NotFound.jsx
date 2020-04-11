import React from 'react';

const NotFound = props => {
    const goBack = e => {
        e.preventDefault();
        props.history.goBack();
    }
const goHome = e => {
    e.preventDefault();
    props.history.replace('/')
}
const cerrar = e => {   
    props.history.replace(`/product/${Math.floor(Math.random() * (5 - 2)) + 2}`)
}
    return(
        <main className="pt-20 flex flex-col justify-around items-center bg-image text-center w-full" style={styles.main}>
            <h1 className="font-semibold text-6xl ">Error 404</h1>
            <h1 className="font-bold text-3xl text-secondary">Hola! Te has confundido!, Tienes 3 opciones:</h1>
            <div className="flex flex-col md:flex-row justify-around md:w-pepe">
                <button className="btn black text-primary font-extrabold mt-8 md:mt-0" onClick={goBack}>Regresar</button>
                <button className="btn black text-primary font-extrabold mt-8 md:mt-0" onClick={goHome}>Ir al Home</button>
                <button className="btn black text-primary font-extrabold mt-8 md:mt-0" onClick={cerrar}>Random</button>
            </div>
        </main>
    );  
};
const styles = {
    main:{
        height: '-webkit-fill-available'
    }
}
export default NotFound;