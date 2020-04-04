import React from 'react';
import '../assets/styles/PageLoading.scss';
import Icon3 from '../../public/icon.png';
const PageLoading = () => {
  return(
        <main id="main" className="w-full flex justify-center items-center">
            {
                <img src={Icon3} alt="tiempo de carga"/>
            }
        </main>
    )
}

export default PageLoading 