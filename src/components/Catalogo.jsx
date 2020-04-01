import React from 'react';

const Catalogo = ({ children, text }) => (
  <div className='categories'>
    <h2 className='categories__title'>{text}</h2>
    {children}
  </div>
);

export default Catalogo;