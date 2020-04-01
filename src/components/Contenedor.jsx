import React from 'react';

const Contenedor = ({ children }) => {
    const ancho = window.screen.width;
    const s_c = 'section container';
    const s = 'section';
    return(
    <section className={ancho < 1320 ? s: s_c}>
      <div className="row">
        {children}
      </div>
    </section>
)};

export default Contenedor;